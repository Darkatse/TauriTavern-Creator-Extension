export type HostUnsubscribe = () => void | Promise<void>;

export interface FrontendLogEntry {
    id: number;
    timestampMs: number;
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    target?: string;
}

export interface BackendLogEntry {
    id: number;
    timestampMs: number;
    level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    target: string;
    message: string;
}

export interface LlmApiLogIndexEntry {
    id: number;
    timestampMs: number;
    level: 'INFO' | 'ERROR';
    ok: boolean;
    source: string;
    model?: string | null;
    endpoint: string;
    durationMs: number;
    stream: boolean;
}

export interface LlmApiLogPreview extends LlmApiLogIndexEntry {
    errorMessage: string | null;
    requestReadable: string;
    responseReadable: string;
    responseRawKind: 'json' | 'sse' | null;
}

export interface LlmApiLogRaw {
    id: number;
    requestRaw: string;
    responseRaw: string;
    responseRawKind: 'json' | 'sse' | null;
}

export interface WorldInfoActivationBatch {
    timestampMs: number;
    trigger: string;
    entries: WorldInfoActivationEntry[];
}

export interface WorldInfoActivationEntry {
    world: string;
    uid: string | number;
    displayName: string;
    constant: boolean;
    position?: string;
}

export type CharacterChatRef = {
    kind: 'character';
    characterId: string;
    fileName: string;
};

export type GroupChatRef = {
    kind: 'group';
    chatId: string;
};

export type ChatRef = CharacterChatRef | GroupChatRef;

export interface ChatWindowInfo {
    mode: 'windowed' | 'off';
    chatKind: ChatRef['kind'];
    chatRef: ChatRef;
    totalCount: number;
    windowStartIndex: number;
    windowLength: number;
}

export interface ChatLocateQuery {
    role?: 'user' | 'assistant' | 'system';
    hasTopLevelKeys?: string[];
    hasExtraKeys?: string[];
    scanLimit?: number;
}

export interface ChatLocateResult {
    index: number;
    message: Record<string, unknown>;
}

export interface ChatSearchHit {
    index: number;
    score: number;
    snippet: string;
    role: 'user' | 'assistant' | 'system';
    text: string;
}

export interface LayoutInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface LayoutFrame {
    left: number;
    top: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
}

export type LayoutImeKind = 'composer' | 'fixed-shell' | 'dialog';

export interface LayoutImeSnapshot {
    activeSurface: Element | null;
    kind: LayoutImeKind;
    bottom: number;
    viewportBottomInset: number;
    keyboardOffset: number;
}

export interface LayoutSnapshot {
    version: number;
    timestampMs: number;
    viewport: LayoutFrame;
    safeInsets: LayoutInsets;
    safeFrame: LayoutFrame;
    ime: LayoutImeSnapshot;
}

export interface TauriTavernLayoutApi {
    snapshot: () => LayoutSnapshot;
    subscribe: (handler: (snapshot: LayoutSnapshot) => void) => Promise<HostUnsubscribe>;
}

export interface TauriTavernChatHandle {
    locate: {
        findLastMessage: (query?: ChatLocateQuery) => Promise<ChatLocateResult | null>;
    };
    searchMessages: (options: {
        query: string;
        limit?: number;
        filters?: {
            role?: 'user' | 'assistant' | 'system';
            startIndex?: number;
            endIndex?: number;
            scanLimit?: number;
        };
    }) => Promise<ChatSearchHit[]>;
}

export interface TauriTavernHostApi {
    layout?: TauriTavernLayoutApi;
    dev?: {
        frontendLogs?: {
            list: (options?: { limit?: number }) => Promise<FrontendLogEntry[]>;
            subscribe: (handler: (entry: FrontendLogEntry) => void) => Promise<HostUnsubscribe>;
            getConsoleCaptureEnabled: () => Promise<boolean>;
            setConsoleCaptureEnabled: (enabled: boolean) => Promise<void>;
        };
        backendLogs?: {
            tail: (options?: { limit?: number }) => Promise<BackendLogEntry[]>;
            subscribe: (handler: (entry: BackendLogEntry) => void) => Promise<HostUnsubscribe>;
        };
        llmApiLogs?: {
            index: (options?: { limit?: number }) => Promise<LlmApiLogIndexEntry[]>;
            subscribeIndex: (handler: (entry: LlmApiLogIndexEntry) => void) => Promise<HostUnsubscribe>;
            getPreview: (id: number) => Promise<LlmApiLogPreview>;
            getRaw: (id: number) => Promise<LlmApiLogRaw>;
            getKeep: () => Promise<number>;
            setKeep: (value: number) => Promise<void>;
        };
    };
    worldInfo?: {
        getLastActivation: () => Promise<WorldInfoActivationBatch | null>;
        subscribeActivations: (handler: (batch: WorldInfoActivationBatch) => void) => Promise<HostUnsubscribe>;
        openEntry: (ref: { world: string; uid: string | number }) => Promise<{ opened: boolean }>;
    };
    chat?: {
        current: {
            ref: () => ChatRef;
            handle: () => TauriTavernChatHandle;
            windowInfo: () => Promise<ChatWindowInfo>;
        };
    };
}

// Ensure the window object typings exist
declare global {
    interface Window {
        __TAURITAVERN__?: {
            ready?: Promise<void> | null;
            api?: {
                dev?: TauriTavernHostApi['dev'];
                worldInfo?: TauriTavernHostApi['worldInfo'];
                chat?: TauriTavernHostApi['chat'];
                layout?: TauriTavernHostApi['layout'];
            }
        };
        __TAURITAVERN_MAIN_READY__?: Promise<void>;
    }
}

export function getHostApi(): TauriTavernHostApi | null {
    return window.__TAURITAVERN__?.api ?? null;
}

export async function waitForHostReady(): Promise<void> {
    const readyPromise = window.__TAURITAVERN__?.ready ?? window.__TAURITAVERN_MAIN_READY__;
    if (readyPromise) {
        await readyPromise;
    }
}
