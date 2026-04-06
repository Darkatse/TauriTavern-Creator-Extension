import { reactive } from 'vue';
import type { LayoutSnapshot, TauriTavernLayoutApi } from '../host/api';

export interface CreatorLayoutInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface CreatorLayoutFrame {
    left: number;
    top: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
}

export interface CreatorLayoutStore {
    state: {
        compact: boolean;
        safeInsets: CreatorLayoutInsets;
        viewportFrame: CreatorLayoutFrame;
        safeFrame: CreatorLayoutFrame;
    };
    refresh(): void;
    dispose(): Promise<void>;
}

const COMPACT_BREAKPOINT = 768;

/**
 * This extension intentionally does NOT re-implement viewport/safe-area/IME measurement.
 *
 * TauriTavern's host kernel already publishes a stable layout ABI that:
 * - normalizes safe-area across iOS/Android WebViews
 * - preserves Android IME as a surface-local contract (no viewport-resize double-meaning)
 * - avoids "observer soup" inside extensions
 *
 * We dogfood that ABI here: the Creator Extension reads `api.layout` snapshots and exposes a small
 * reactive store for Vue components.
 */

function createInsets(top = 0, right = 0, bottom = 0, left = 0): CreatorLayoutInsets {
    return {
        top: Math.max(0, top),
        right: Math.max(0, right),
        bottom: Math.max(0, bottom),
        left: Math.max(0, left),
    };
}

function createFrame(left = 0, top = 0, width = 0, height = 0): CreatorLayoutFrame {
    const safeLeft = Math.max(0, left);
    const safeTop = Math.max(0, top);
    const safeWidth = Math.max(0, width);
    const safeHeight = Math.max(0, height);
    return {
        left: safeLeft,
        top: safeTop,
        width: safeWidth,
        height: safeHeight,
        right: safeLeft + safeWidth,
        bottom: safeTop + safeHeight,
    };
}

function updateFrame(frame: CreatorLayoutFrame, left: number, top: number, width: number, height: number) {
    frame.left = Math.max(0, left);
    frame.top = Math.max(0, top);
    frame.width = Math.max(0, width);
    frame.height = Math.max(0, height);
    frame.right = frame.left + frame.width;
    frame.bottom = frame.top + frame.height;
}

function applySnapshot(state: CreatorLayoutStore['state'], snapshot: LayoutSnapshot) {
    const safeInsets = snapshot.safeInsets ?? createInsets();
    state.safeInsets.top = safeInsets.top;
    state.safeInsets.right = safeInsets.right;
    state.safeInsets.bottom = safeInsets.bottom;
    state.safeInsets.left = safeInsets.left;

    const viewport = snapshot.viewport ?? createFrame();
    updateFrame(state.viewportFrame, viewport.left, viewport.top, viewport.width, viewport.height);

    const safeFrame = snapshot.safeFrame ?? createFrame();
    updateFrame(state.safeFrame, safeFrame.left, safeFrame.top, safeFrame.width, safeFrame.height);

    state.compact = state.safeFrame.width <= COMPACT_BREAKPOINT;
}

export async function createLayoutStore(layoutApi: TauriTavernLayoutApi): Promise<CreatorLayoutStore> {
    const state = reactive({
        compact: false,
        safeInsets: createInsets(),
        viewportFrame: createFrame(),
        safeFrame: createFrame(),
    });

    let unsubscribe: (() => void | Promise<void>) | null = null;
    let disposed = false;

    const refresh = () => {
        if (disposed) {
            throw new Error('Layout store is disposed.');
        }

        applySnapshot(state, layoutApi.snapshot());
    };

    refresh();

    // Single subscription is enough: the host is responsible for normalizing the event sources
    // (safe-area changes, viewport changes, and Android IME routing).
    unsubscribe = await layoutApi.subscribe((snapshot) => {
        if (disposed) {
            return;
        }
        applySnapshot(state, snapshot);
    });

    return {
        state,
        refresh,
        async dispose() {
            disposed = true;
            await unsubscribe?.();
        },
    };
}
