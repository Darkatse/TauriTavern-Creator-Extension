import { reactive } from 'vue';

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
    dispose(): void;
}

const COMPACT_BREAKPOINT = 768;

function createInsets(): CreatorLayoutInsets {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };
}

function createFrame(): CreatorLayoutFrame {
    return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
    };
}

function parsePixelValue(value: string) {
    const parsed = Number.parseFloat(String(value || '').trim());
    return Number.isFinite(parsed) ? parsed : 0;
}

function updateFrame(frame: CreatorLayoutFrame, left: number, top: number, width: number, height: number) {
    frame.left = Math.max(0, left);
    frame.top = Math.max(0, top);
    frame.width = Math.max(0, width);
    frame.height = Math.max(0, height);
    frame.right = frame.left + frame.width;
    frame.bottom = frame.top + frame.height;
}

function createInsetProbe() {
    const probe = document.createElement('div');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.position = 'fixed';
    probe.style.inset = '0';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.zIndex = '-1';
    probe.style.paddingTop = 'var(--tt-inset-top, env(safe-area-inset-top, 0px))';
    probe.style.paddingRight = 'var(--tt-inset-right, env(safe-area-inset-right, 0px))';
    probe.style.paddingBottom = 'var(--tt-inset-bottom, env(safe-area-inset-bottom, 0px))';
    probe.style.paddingLeft = 'var(--tt-inset-left, env(safe-area-inset-left, 0px))';
    return probe;
}

function measureInsets(probe: HTMLElement): CreatorLayoutInsets {
    const computedStyle = window.getComputedStyle(probe);
    return {
        top: Math.max(0, parsePixelValue(computedStyle.paddingTop)),
        right: Math.max(0, parsePixelValue(computedStyle.paddingRight)),
        bottom: Math.max(0, parsePixelValue(computedStyle.paddingBottom)),
        left: Math.max(0, parsePixelValue(computedStyle.paddingLeft)),
    };
}

function getViewportRect() {
    const visualViewport = window.visualViewport;
    const width = Number.isFinite(visualViewport?.width) && visualViewport
        ? visualViewport.width
        : window.innerWidth;
    const height = Number.isFinite(visualViewport?.height) && visualViewport
        ? visualViewport.height
        : window.innerHeight;
    const left = Number.isFinite(visualViewport?.offsetLeft) && visualViewport
        ? visualViewport.offsetLeft
        : 0;
    const top = Number.isFinite(visualViewport?.offsetTop) && visualViewport
        ? visualViewport.offsetTop
        : 0;

    return {
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.max(0, width),
        height: Math.max(0, height),
    };
}

export function createLayoutStore(): CreatorLayoutStore {
    const insetProbe = createInsetProbe();
    document.body.appendChild(insetProbe);

    const state = reactive({
        compact: false,
        safeInsets: createInsets(),
        viewportFrame: createFrame(),
        safeFrame: createFrame(),
    });

    let disposed = false;
    let refreshQueued = false;

    const refresh = () => {
        if (disposed) {
            return;
        }

        const viewportRect = getViewportRect();
        const safeInsets = measureInsets(insetProbe);

        state.safeInsets.top = safeInsets.top;
        state.safeInsets.right = safeInsets.right;
        state.safeInsets.bottom = safeInsets.bottom;
        state.safeInsets.left = safeInsets.left;

        updateFrame(
            state.viewportFrame,
            viewportRect.left,
            viewportRect.top,
            viewportRect.width,
            viewportRect.height,
        );

        updateFrame(
            state.safeFrame,
            viewportRect.left + safeInsets.left,
            viewportRect.top + safeInsets.top,
            viewportRect.width - safeInsets.left - safeInsets.right,
            viewportRect.height - safeInsets.top - safeInsets.bottom,
        );

        state.compact = state.safeFrame.width <= COMPACT_BREAKPOINT;
    };

    const queueRefresh = () => {
        if (refreshQueued || disposed) {
            return;
        }

        refreshQueued = true;
        requestAnimationFrame(() => {
            refreshQueued = false;
            refresh();
        });
    };

    const rootObserver = new MutationObserver(queueRefresh);
    rootObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
    });

    window.addEventListener('resize', queueRefresh, { passive: true });
    window.addEventListener('orientationchange', queueRefresh, { passive: true });
    window.visualViewport?.addEventListener('resize', queueRefresh, { passive: true });
    window.visualViewport?.addEventListener('scroll', queueRefresh, { passive: true });

    refresh();
    queueRefresh();

    return {
        state,
        refresh,
        dispose() {
            disposed = true;
            rootObserver.disconnect();
            window.removeEventListener('resize', queueRefresh);
            window.removeEventListener('orientationchange', queueRefresh);
            window.visualViewport?.removeEventListener('resize', queueRefresh);
            window.visualViewport?.removeEventListener('scroll', queueRefresh);
            insetProbe.remove();
        },
    };
}
