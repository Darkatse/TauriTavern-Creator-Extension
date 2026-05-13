import { reactive } from 'vue';
import {
    DEFAULT_APPEARANCE_MODE,
    type CreatorAppearanceMode,
} from './appearance';

const STORAGE_KEY = 'ttce:settings';

export interface BubblePosition {
    x: number;
    y: number;
}

interface CreatorSettingsSnapshot {
    enabled: boolean;
    enabledFeatures: Record<string, boolean>;
    bubblePosition: BubblePosition | null;
    activeTab: string;
    appearanceMode: CreatorAppearanceMode;
    customBubbleIcon: string | null;
    customBubbleBgTransparent: boolean;
}

export interface CreatorSettingsStore {
    state: CreatorSettingsSnapshot;
    subscribe(listener: () => void): () => void;
    setEnabled(enabled: boolean): void;
    setAppearanceMode(mode: CreatorAppearanceMode): void;
    isFeatureEnabled(featureId: string, fallback: boolean): boolean;
    setFeatureEnabled(featureId: string, enabled: boolean): void;
    setBubblePosition(position: BubblePosition): void;
    setActiveTab(tabId: string): void;
    setCustomBubbleIcon(icon: string | null): void;
    setCustomBubbleBgTransparent(transparent: boolean): void;
}

function createDefaultSnapshot(): CreatorSettingsSnapshot {
    return {
        enabled: true,
        enabledFeatures: {},
        bubblePosition: null,
        activeTab: 'settings',
        appearanceMode: DEFAULT_APPEARANCE_MODE,
        customBubbleIcon: null,
        customBubbleBgTransparent: false,
    };
}

function readSnapshot(): CreatorSettingsSnapshot {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return createDefaultSnapshot();
    }

    try {
        const snapshot = JSON.parse(raw) as Partial<CreatorSettingsSnapshot>;
        return {
            ...createDefaultSnapshot(),
            ...snapshot,
            appearanceMode: snapshot.appearanceMode === 'day' ? 'day' : DEFAULT_APPEARANCE_MODE,
            customBubbleIcon: snapshot.customBubbleIcon ?? null,
            customBubbleBgTransparent: Boolean(snapshot.customBubbleBgTransparent),
        };
    } catch {
        return createDefaultSnapshot();
    }
}

function toSnapshot(state: CreatorSettingsSnapshot): CreatorSettingsSnapshot {
    return {
        enabled: state.enabled,
        enabledFeatures: { ...state.enabledFeatures },
        bubblePosition: state.bubblePosition ? { ...state.bubblePosition } : null,
        activeTab: state.activeTab,
        appearanceMode: state.appearanceMode,
        customBubbleIcon: state.customBubbleIcon,
        customBubbleBgTransparent: state.customBubbleBgTransparent,
    };
}

export function createSettingsStore(): CreatorSettingsStore {
    const state = reactive(readSnapshot()) as CreatorSettingsSnapshot;
    const listeners = new Set<() => void>();

    const persist = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSnapshot(state)));
    };

    const notify = () => {
        persist();
        listeners.forEach((listener) => listener());
    };

    return {
        state,
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
        setEnabled(enabled) {
            if (state.enabled === enabled) {
                return;
            }

            state.enabled = enabled;
            notify();
        },
        setAppearanceMode(mode) {
            if (state.appearanceMode === mode) {
                return;
            }

            state.appearanceMode = mode;
            notify();
        },
        isFeatureEnabled(featureId, fallback) {
            return state.enabledFeatures[featureId] ?? fallback;
        },
        setFeatureEnabled(featureId, enabled) {
            if (state.enabledFeatures[featureId] === enabled) {
                return;
            }

            state.enabledFeatures[featureId] = enabled;
            notify();
        },
        setBubblePosition(position) {
            if (state.bubblePosition?.x === position.x && state.bubblePosition?.y === position.y) {
                return;
            }

            state.bubblePosition = { ...position };
            notify();
        },
        setActiveTab(tabId) {
            if (state.activeTab === tabId) {
                return;
            }

            state.activeTab = tabId;
            notify();
        },
        setCustomBubbleIcon(icon) {
            if (state.customBubbleIcon === icon) {
                return;
            }

            state.customBubbleIcon = icon;
            notify();
        },
        setCustomBubbleBgTransparent(transparent) {
            if (state.customBubbleBgTransparent === transparent) {
                return;
            }

            state.customBubbleBgTransparent = transparent;
            notify();
        },
    };
}
