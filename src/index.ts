import { createApp, type App as VueApp } from 'vue';
import App from './App.vue';
import './style.css';
import { createCreatorApp } from './app/create-creator-app';
import { CREATOR_APP_KEY, type CreatorAppContext } from './app/context';
import { createSettingsStore, type CreatorSettingsStore } from './app/settings-store';
import { getSupportedFeatureModules } from './features/catalog';
import type { CreatorFeatureModule } from './features/types';
import { getHostApi, waitForHostReady } from './host/api';
import { createHostClient, type HostClient } from './host/client';
import { createI18n, I18N_KEY, type I18nContext } from './i18n';
import ExtensionsPagePanel from './settings-page/ExtensionsPagePanel.vue';

const FLOATING_ROOT_ID = 'tauritavern-creator-extension-root';
const SETTINGS_ROOT_ID = 'tauritavern-creator-extension-settings-root';
const THEME_ROOT_CLASS = 'ttce-theme-root';

let floatingApp: VueApp<Element> | null = null;
let floatingMountPoint: HTMLDivElement | null = null;
let settingsApp: VueApp<Element> | null = null;
let settingsMountPoint: HTMLDivElement | null = null;
let creatorApp: CreatorAppContext | null = null;
let host: HostClient | null = null;
let settings: CreatorSettingsStore | null = null;
let i18n: I18nContext | null = null;
let supportedFeatureModules: CreatorFeatureModule[] = [];
let unsubscribeSettings: (() => void) | null = null;
let lifecycleQueue: Promise<void> = Promise.resolve();

function waitForDocumentReady(): Promise<void> {
    if (document.readyState !== 'loading') {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    });
}

function createMountPoint(id: string, parent: HTMLElement, className: string) {
    document.getElementById(id)?.remove();

    const mountPoint = document.createElement('div');
    mountPoint.id = id;
    mountPoint.className = className;
    parent.appendChild(mountPoint);
    return mountPoint;
}

function getExtensionsSettingsHost() {
    return document.getElementById('extensions_settings2')
        ?? document.getElementById('extensions_settings');
}

function syncFloatingAppearance() {
    if (!floatingMountPoint || !settings) {
        return;
    }

    floatingMountPoint.dataset.ttceAppearance = settings.state.appearanceMode;
}

async function mountFloatingApp() {
    if (floatingApp || !host || !settings || !settings.state.enabled) {
        return;
    }

    const runtime = await createCreatorApp(host, { settings, i18n: i18n! });
    if (!settings.state.enabled) {
        try {
            await runtime.registry.deactivateAllFeatures();
        } finally {
            runtime.layout.dispose();
        }
        return;
    }

    creatorApp = runtime;
    floatingMountPoint = createMountPoint(FLOATING_ROOT_ID, document.body, THEME_ROOT_CLASS);
    syncFloatingAppearance();

    floatingApp = createApp(App);
    floatingApp.provide(CREATOR_APP_KEY, runtime);
    floatingApp.provide(I18N_KEY, runtime.i18n);
    floatingApp.mount(floatingMountPoint);
}

async function unmountFloatingApp() {
    const runtime = creatorApp;
    creatorApp = null;

    if (runtime) {
        try {
            await runtime.registry.deactivateAllFeatures();
        } finally {
            runtime.layout.dispose();
        }
    }

    floatingApp?.unmount();
    floatingApp = null;

    floatingMountPoint?.remove();
    floatingMountPoint = null;
}

async function syncFloatingApp() {
    if (!settings) {
        return;
    }

    if (settings.state.enabled) {
        await mountFloatingApp();
        syncFloatingAppearance();
        return;
    }

    await unmountFloatingApp();
}

function queueLifecycleSync() {
    lifecycleQueue = lifecycleQueue
        .catch((error) => {
            console.error('[TauriTavern Creator Extension] Runtime lifecycle sync failed.', error);
        })
        .then(() => syncFloatingApp());

    return lifecycleQueue;
}

function mountSettingsPanel() {
    if (settingsApp || !settings) {
        return;
    }

    const hostElement = getExtensionsSettingsHost();
    if (!hostElement) {
        console.warn('[TauriTavern Creator Extension] Extensions settings container is unavailable.');
        return;
    }

    settingsMountPoint = createMountPoint(SETTINGS_ROOT_ID, hostElement, 'extension_container');
    const panelI18n = i18n ?? createI18n();
    settingsApp = createApp(ExtensionsPagePanel, {
        settings,
        features: supportedFeatureModules,
        setFeatureEnabled: async (featureId: string, enabled: boolean) => {
            if (creatorApp) {
                await creatorApp.registry.setFeatureEnabled(featureId, enabled);
                return;
            }

            settings?.setFeatureEnabled(featureId, enabled);
        },
    });
    settingsApp.provide(I18N_KEY, panelI18n);
    settingsApp.mount(settingsMountPoint);
}

function unmountSettingsPanel() {
    settingsApp?.unmount();
    settingsApp = null;

    settingsMountPoint?.remove();
    settingsMountPoint = null;
}

function dispose() {
    unsubscribeSettings?.();
    unsubscribeSettings = null;

    void lifecycleQueue.finally(() => {
        void unmountFloatingApp();
        unmountSettingsPanel();
    });
}

async function bootstrap() {
    await waitForDocumentReady();
    await waitForHostReady();

    const hostApi = getHostApi();
    if (!hostApi) {
        console.error('[TauriTavern Creator Extension] Host API is unavailable.');
        return;
    }

    host = createHostClient(hostApi);
    settings = createSettingsStore();
    i18n = createI18n();
    supportedFeatureModules = getSupportedFeatureModules(host);

    mountSettingsPanel();

    unsubscribeSettings = settings.subscribe(() => {
        void queueLifecycleSync();
    });

    await queueLifecycleSync();
    window.addEventListener('pagehide', dispose, { once: true });
}

void bootstrap();
