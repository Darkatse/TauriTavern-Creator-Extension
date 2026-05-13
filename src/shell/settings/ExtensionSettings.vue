<script setup lang="ts">
import { computed } from 'vue';
import type { CreatorAppearanceMode } from '../../app/appearance';
import { useCreatorApp } from '../../app/context';
import CreatorSettingsPane from '../../settings/CreatorSettingsPane.vue';
import type { CreatorSettingsFeatureItem } from '../../settings/types';

const { registry, settings, i18n } = useCreatorApp();
const t = i18n.t.bind(i18n);

const features = computed<CreatorSettingsFeatureItem[]>(() =>
    registry.features.map((feature) => ({
        id: feature.id,
        area: feature.area,
        titleKey: feature.titleKey,
        descriptionKey: feature.descriptionKey,
        enabled: feature.enabled,
    })),
);

const toggleExtension = (enabled: boolean) => {
    settings.setEnabled(enabled);
};

const setAppearance = (mode: CreatorAppearanceMode) => {
    settings.setAppearanceMode(mode);
};

const setCustomIcon = (icon: string | null) => {
    settings.setCustomBubbleIcon(icon);
};

const setCustomIconTransparent = (transparent: boolean) => {
    settings.setCustomBubbleBgTransparent(transparent);
};

const toggleFeature = async ({ id, enabled }: { id: string; enabled: boolean }) => {
    await registry.setFeatureEnabled(id, enabled);
};
</script>

<template>
  <CreatorSettingsPane
    :title="t('settings.title')"
    :description="t('settings.description')"
    :extension-enabled="settings.state.enabled"
    :appearance-mode="settings.state.appearanceMode"
    :custom-bubble-icon="settings.state.customBubbleIcon"
    :custom-bubble-bg-transparent="settings.state.customBubbleBgTransparent"
    :features="features"
    :i18n="i18n"
    @toggle-extension="toggleExtension"
    @set-appearance="setAppearance"
    @toggle-feature="(payload) => void toggleFeature(payload)"
    @set-custom-icon="setCustomIcon"
    @set-custom-icon-transparent="setCustomIconTransparent"
  />
</template>
