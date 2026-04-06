<script setup lang="ts">
import { computed } from 'vue';
import { useCreatorApp } from '../../app/context';
import ExtensionSettings from '../settings/ExtensionSettings.vue';
import type { Messages } from '../../i18n';

const { registry, shell, i18n } = useCreatorApp();
const t = i18n.t.bind(i18n);

const categoryLabelKeys: Record<string, keyof Messages> = {
    'character-tools': 'settings.area.characterTools',
    'extension-dev': 'settings.area.extensionDev',
    'memory-dev': 'settings.area.memoryDev',
};

const categories = ['character-tools', 'extension-dev', 'memory-dev'];

const activeTab = computed(() => shell.state.activeTab);
const activeFeature = computed(() => (
    registry.getActiveFeatures().find((feature) => feature.id === activeTab.value) ?? null
));
const mobileTabs = computed(() => [
    { id: 'settings', label: t('panel.globalSettings') },
    ...registry.getActiveFeatures().map((feature) => ({
        id: feature.id,
        label: t(feature.titleKey),
    })),
]);

const getFeatures = (categoryId: string) => {
    return registry.getFeaturesByArea(categoryId as 'character-tools' | 'extension-dev' | 'memory-dev');
};

const setTab = (id: string) => {
    shell.setActiveTab(id);
};
</script>

<template>
  <div class="main-panel-backdrop" @click="shell.closePanel()">
    <div class="main-panel-window" @click.stop>
      <!-- Sidebar -->
      <div class="panel-sidebar">
        <div class="sidebar-header">
            <h3>{{ t('panel.sidebarTitle') }}</h3>
        </div>
        
        <div class="sidebar-nav desktop-nav">
          <div class="nav-item" :class="{ active: activeTab === 'settings' }" @click="setTab('settings')">
             {{ t('panel.globalSettings') }}
          </div>
          <div v-for="cat in categories" :key="cat" class="nav-category">
             <div class="category-title" v-if="getFeatures(cat).length > 0">{{ t(categoryLabelKeys[cat]) }}</div>
             <div 
               v-for="feature in getFeatures(cat)" 
               :key="feature.id" 
               class="nav-item sub-item"
               :class="{ active: activeTab === feature.id }"
               @click="setTab(feature.id)"
             >
               {{ t(feature.titleKey) }}
             </div>
          </div>
        </div>

        <div class="mobile-nav">
          <button
            v-for="tab in mobileTabs"
            :key="tab.id"
            class="mobile-tab"
            :class="{ active: activeTab === tab.id }"
            @click="setTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="panel-content">
         <div class="content-header">
           <button class="close-btn" @click="shell.closePanel()">✕</button>
         </div>
         <div class="content-body">
            <div v-if="activeTab === 'settings'" class="feature-host settings-host">
              <ExtensionSettings />
            </div>
            <div v-else-if="activeFeature" class="feature-host">
              <component
                :is="activeFeature.component"
                :controller="activeFeature.controller"
              />
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-panel-backdrop {
    position: fixed;
    top: var(--ttce-viewport-top, 0px);
    left: var(--ttce-viewport-left, 0px);
    width: var(--ttce-viewport-width, 100vw);
    height: var(--ttce-viewport-height, 100vh);
    z-index: 99998; /* Just below bubble */
    background: var(--ttce-backdrop);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: var(--ttce-safe-inset-top, 0px);
    padding-right: var(--ttce-safe-inset-right, 0px);
    padding-bottom: var(--ttce-safe-inset-bottom, 0px);
    padding-left: var(--ttce-safe-inset-left, 0px);
    backdrop-filter: blur(2px);
}

.main-panel-window {
    width: min(96%, 1360px);
    height: min(94%, 1040px);
    background: var(--ttce-bg-1);
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    display: flex;
    overflow: hidden;
    min-height: 0;
    min-width: 0;
    box-shadow: var(--ttce-shadow-panel);
    color: var(--ttce-text);
    font-family: var(--ttce-font-sans);
}

.panel-sidebar {
    width: 220px;
    background: var(--ttce-bg-sidebar);
    border-right: 1px solid var(--ttce-border);
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
}

.sidebar-header {
    padding: 16px;
    border-bottom: 1px solid var(--ttce-border);
}

.sidebar-header h3 {
    margin: 0;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--ttce-text);
}

.sidebar-nav {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding: 12px 8px;
}

.mobile-nav {
    display: none;
}

.nav-item {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 4px;
    transition: background 0.15s, color 0.15s;
    color: var(--ttce-text-muted);
}

.nav-item:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.nav-item.active {
    background: var(--ttce-surface-active);
    color: var(--ttce-text);
    font-weight: 500;
}

.nav-category {
    margin-top: 16px;
}

.category-title {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--ttce-text-soft);
    padding: 0 12px 8px;
    letter-spacing: 0.5px;
}

.sub-item {
    padding-left: 20px;
}

.panel-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--ttce-bg-1);
    min-height: 0;
    min-width: 0;
}

.content-header {
    height: 36px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
    border-bottom: 1px solid var(--ttce-border);
}

.close-btn {
    background: transparent;
    border: none;
    color: var(--ttce-text-muted);
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
}

.close-btn:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.content-body {
    flex: 1;
    min-height: 0;
    min-width: 0;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.feature-host {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: flex;
    overflow: hidden;
}

.settings-host {
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    min-width: 0;
}

@media (max-width: 768px) {
    .main-panel-window {
        width: 100%;
        height: 100%;
        max-width: none;
        border-radius: 0;
        flex-direction: column;
    }

    .panel-sidebar {
        width: 100%;
        height: auto;
        border-right: none;
        border-bottom: 1px solid var(--ttce-border);
    }

    .sidebar-header,
    .desktop-nav {
        display: none;
    }

    .mobile-nav {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 10px 12px;
        scrollbar-width: thin;
    }

    .mobile-tab {
        padding: 8px 12px;
        border: 1px solid var(--ttce-border);
        border-radius: 999px;
        background: var(--ttce-bg-0);
        color: var(--ttce-text-muted);
        font-size: 13px;
        white-space: nowrap;
        cursor: pointer;
    }

    .mobile-tab.active {
        border-color: var(--ttce-border-strong);
        background: var(--ttce-surface-active);
        color: var(--ttce-text);
    }

    .content-header {
        padding: 0 10px;
    }

    .content-body {
        padding: 16px;
    }

    .feature-host {
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
    }
}
</style>
