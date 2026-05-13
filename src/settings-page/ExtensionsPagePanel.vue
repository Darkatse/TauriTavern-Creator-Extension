<script setup lang="ts">
import { computed } from 'vue';
import type { CreatorAppearanceMode } from '../app/appearance';
import type { CreatorSettingsStore } from '../app/settings-store';
import type { CreatorFeatureModule } from '../features/types';
import CreatorSettingsPane from '../settings/CreatorSettingsPane.vue';
import type { CreatorSettingsFeatureItem } from '../settings/types';
import { createI18n } from '../i18n';

const props = defineProps<{
    settings: CreatorSettingsStore;
    features: CreatorFeatureModule[];
    setFeatureEnabled(featureId: string, enabled: boolean): Promise<void> | void;
}>();

const i18n = createI18n();
const t = i18n.t.bind(i18n);

const featureItems = computed<CreatorSettingsFeatureItem[]>(() =>
    props.features.map((feature) => ({
        id: feature.id,
        area: feature.area,
        titleKey: feature.titleKey,
        descriptionKey: feature.descriptionKey,
        enabled: props.settings.isFeatureEnabled(feature.id, feature.defaultEnabled),
    })),
);

const toggleExtension = (enabled: boolean) => {
    props.settings.setEnabled(enabled);
};

const setAppearance = (mode: CreatorAppearanceMode) => {
    props.settings.setAppearanceMode(mode);
};

const setCustomIcon = (icon: string | null) => {
    props.settings.setCustomBubbleIcon(icon);
};

const setCustomIconTransparent = (transparent: boolean) => {
    props.settings.setCustomBubbleBgTransparent(transparent);
};

const toggleFeature = async ({ id, enabled }: { id: string; enabled: boolean }) => {
    await props.setFeatureEnabled(id, enabled);
};
</script>

<template>
  <div class="inline-drawer wide100p ttce-settings-drawer">
    <div class="inline-drawer-toggle inline-drawer-header">
      <div class="ttce-settings-header">
        <i class="fa-solid fa-code"></i>
        <b>TauriTavern Creator Extension</b>
      </div>
      <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
    </div>

    <div class="inline-drawer-content">
      <div
        class="ttce-theme-root ttce-settings-surface"
        :data-ttce-appearance="props.settings.state.appearanceMode"
      >
        <CreatorSettingsPane
          :title="t('settings.title')"
          :description="t('settings.description')"
          :extension-enabled="props.settings.state.enabled"
          :appearance-mode="props.settings.state.appearanceMode"
          :custom-bubble-icon="props.settings.state.customBubbleIcon"
          :custom-bubble-bg-transparent="props.settings.state.customBubbleBgTransparent"
          :features="featureItems"
          :i18n="i18n"
          @toggle-extension="toggleExtension"
          @set-appearance="setAppearance"
          @toggle-feature="(payload) => void toggleFeature(payload)"
          @set-custom-icon="setCustomIcon"
          @set-custom-icon-transparent="setCustomIconTransparent"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ttce-settings-drawer {
    margin-bottom: 10px;
}

.ttce-settings-header {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.ttce-settings-header i {
    color: var(--SmartThemeEmColor);
    font-size: 14px;
}

.ttce-settings-surface {
    padding: 6px 2px 2px;
}
</style>
