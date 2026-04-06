import {
    getHostApi,
    type ChatWindowInfo,
    type HostUnsubscribe,
    type TauriTavernChatHandle,
    type TauriTavernHostApi,
} from './api';

export type HostCapability =
    | 'layout'
    | 'chat'
    | 'dev.frontendLogs'
    | 'dev.backendLogs'
    | 'dev.llmApiLogs'
    | 'worldInfo';

export interface HostClient {
    api: TauriTavernHostApi;
    capabilities: ReadonlySet<HostCapability>;
    supports(capability: HostCapability): boolean;
    supportsAll(capabilities: HostCapability[]): boolean;
    getChatHandle(): TauriTavernChatHandle;
    getChatWindowInfo(): Promise<ChatWindowInfo>;
}

function collectCapabilities(api: TauriTavernHostApi): Set<HostCapability> {
    const capabilities = new Set<HostCapability>();

    if (api.layout) {
        capabilities.add('layout');
    }
    if (api.chat) {
        capabilities.add('chat');
    }
    if (api.dev?.frontendLogs) {
        capabilities.add('dev.frontendLogs');
    }
    if (api.dev?.backendLogs) {
        capabilities.add('dev.backendLogs');
    }
    if (api.dev?.llmApiLogs) {
        capabilities.add('dev.llmApiLogs');
    }
    if (api.worldInfo) {
        capabilities.add('worldInfo');
    }

    return capabilities;
}

export function createHostClient(api = getHostApi()): HostClient {
    if (!api) {
        throw new Error('TauriTavern host API is unavailable.');
    }

    const capabilities = collectCapabilities(api);

    return {
        api,
        capabilities,
        supports(capability) {
            return capabilities.has(capability);
        },
        supportsAll(requiredCapabilities) {
            return requiredCapabilities.every((capability) => capabilities.has(capability));
        },
        getChatHandle() {
            if (!api.chat) {
                throw new Error('Chat API is unavailable.');
            }

            return api.chat.current.handle();
        },
        getChatWindowInfo() {
            if (!api.chat) {
                throw new Error('Chat API is unavailable.');
            }

            return api.chat.current.windowInfo();
        },
    };
}

export type { HostUnsubscribe };
