import { inject, type InjectionKey } from 'vue';
import type { HostClient } from '../host/client';
import type { CreatorSettingsStore } from './settings-store';
import type { CreatorShellStore } from './shell-store';
import type { BubbleFeedBus } from '../shell/bubble/bubble-feed-bus';
import type { CreatorFeatureRegistry } from '../features/registry';
import type { I18nContext } from '../i18n';
import type { CreatorLayoutStore } from './layout-store';

export interface CreatorRuntimeContext {
    host: HostClient;
    settings: CreatorSettingsStore;
    shell: CreatorShellStore;
    layout: CreatorLayoutStore;
    bubbleBus: BubbleFeedBus;
    i18n: I18nContext;
}

export interface CreatorAppContext extends CreatorRuntimeContext {
    registry: CreatorFeatureRegistry;
}

export const CREATOR_APP_KEY: InjectionKey<CreatorAppContext> = Symbol('creator-app');

export function useCreatorApp(): CreatorAppContext {
    const context = inject(CREATOR_APP_KEY);
    if (!context) {
        throw new Error('Creator app context is unavailable.');
    }

    return context;
}
