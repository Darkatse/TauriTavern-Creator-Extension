import { createFeatureRegistry } from '../features/registry';
import type { HostClient } from '../host/client';
import { createShellStore } from './shell-store';
import { createSettingsStore, type CreatorSettingsStore } from './settings-store';
import { createBubbleFeedBus } from '../shell/bubble/bubble-feed-bus';
import { createI18n, type I18nContext } from '../i18n';
import type { CreatorAppContext } from './context';
import { createLayoutStore } from './layout-store';

interface CreatorAppOptions {
    settings?: CreatorSettingsStore;
    i18n?: I18nContext;
}

export async function createCreatorApp(
    host: HostClient,
    options: CreatorAppOptions = {},
): Promise<CreatorAppContext> {
    const settings = options.settings ?? createSettingsStore();
    const i18n = options.i18n ?? createI18n();
    if (!host.api.layout) {
        throw new Error('Host layout API is unavailable.');
    }
    const layout = await createLayoutStore(host.api.layout);
    const bubbleBus = createBubbleFeedBus();
    const shell = createShellStore(settings, bubbleBus);

    const runtime = {
        host,
        settings,
        shell,
        layout,
        bubbleBus,
        i18n,
    };

    const registry = createFeatureRegistry(runtime);

    await registry.activateEnabledFeatures();

    return {
        ...runtime,
        registry,
    };
}
