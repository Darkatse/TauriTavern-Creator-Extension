<script setup lang="ts">
import { computed, ref } from 'vue';
import ImageCropper from '../components/ImageCropper.vue';
import { creatorAppearanceModes, type CreatorAppearanceMode } from '../app/appearance';
import type { FeatureArea } from '../features/types';
import type { CreatorAppearanceOption, CreatorSettingsFeatureItem } from './types';
import type { I18nContext, Messages } from '../i18n';

const props = defineProps<{
    title: string;
    description: string;
    extensionEnabled: boolean;
    appearanceMode: CreatorAppearanceMode;
    customBubbleIcon: string | null;
    customBubbleBgTransparent: boolean;
    features: CreatorSettingsFeatureItem[];
    i18n: I18nContext;
}>();

const emit = defineEmits<{
    'toggle-extension': [enabled: boolean];
    'set-appearance': [mode: CreatorAppearanceMode];
    'toggle-feature': [payload: { id: string; enabled: boolean }];
    'set-custom-icon': [icon: string | null];
    'set-custom-icon-transparent': [transparent: boolean];
}>();

const t = computed(() => props.i18n.t.bind(props.i18n));

const areaOrder: FeatureArea[] = ['character-tools', 'extension-dev', 'memory-dev'];
const areaLabelKeys: Record<FeatureArea, keyof Messages> = {
    'character-tools': 'settings.area.characterTools',
    'extension-dev': 'settings.area.extensionDev',
    'memory-dev': 'settings.area.memoryDev',
};
const appearanceLabelKeys: Record<CreatorAppearanceMode, keyof Messages> = {
    'night': 'settings.appearanceNight',
    'day': 'settings.appearanceDay',
};

const groupedFeatures = computed(() =>
    areaOrder
        .map((area) => ({
            area,
            label: t.value(areaLabelKeys[area]),
            features: props.features.filter((feature) => feature.area === area),
        }))
        .filter((group) => group.features.length > 0),
);

const appearanceOptions = computed<CreatorAppearanceOption[]>(() =>
    creatorAppearanceModes.map((mode) => ({
        value: mode,
        labelKey: appearanceLabelKeys[mode],
    })),
);

const emitExtensionToggle = (event: Event) => {
    emit('toggle-extension', (event.target as HTMLInputElement).checked);
};

const emitAppearanceChange = (mode: CreatorAppearanceMode) => {
    emit('set-appearance', mode);
};

const emitFeatureToggle = (featureId: string, event: Event) => {
    emit('toggle-feature', {
        id: featureId,
        enabled: (event.target as HTMLInputElement).checked,
    });
};

const fileInputRef = ref<HTMLInputElement | null>(null);
const showCropper = ref(false);
const cropImageUrl = ref('');

const onFileSelected = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (file.type === 'image/gif') {
        const reader = new FileReader();
        reader.onload = (e) => {
            emit('set-custom-icon', e.target?.result as string);
        };
        reader.readAsDataURL(file);
    } else {
        const url = URL.createObjectURL(file);
        cropImageUrl.value = url;
        showCropper.value = true;
    }
    
    if (fileInputRef.value) fileInputRef.value.value = '';
};

const handleCrop = (base64: string) => {
    emit('set-custom-icon', base64);
    showCropper.value = false;
    URL.revokeObjectURL(cropImageUrl.value);
};

const handleCropCancel = () => {
    showCropper.value = false;
    URL.revokeObjectURL(cropImageUrl.value);
};

const emitTransparentToggle = (event: Event) => {
    emit('set-custom-icon-transparent', (event.target as HTMLInputElement).checked);
};

const triggerFileUpload = () => {
    fileInputRef.value?.click();
};

const removeCustomIcon = () => {
    emit('set-custom-icon', null);
};
</script>

<template>
  <div class="settings-pane">
    <div class="settings-header">
      <h2 class="settings-title">{{ props.title }}</h2>
      <p class="settings-description">{{ props.description }}</p>
    </div>

    <label class="settings-card settings-card-master">
      <div class="settings-card-copy">
        <strong>{{ t('settings.enableRuntime') }}</strong>
        <span>{{ t('settings.enableRuntimeDesc') }}</span>
      </div>
      <input
        type="checkbox"
        class="settings-toggle"
        :checked="props.extensionEnabled"
        @change="emitExtensionToggle"
      />
    </label>

    <section class="settings-group">
      <header class="settings-group-header">
        <h3>{{ t('settings.appearance') }}</h3>
      </header>

      <div class="settings-card appearance-card">
        <div class="settings-card-copy">
          <strong>{{ t('settings.appearance') }}</strong>
          <span>{{ t('settings.appearanceDesc') }}</span>
        </div>

        <div class="appearance-toggle" role="group" :aria-label="t('settings.appearance')">
          <button
            v-for="option in appearanceOptions"
            :key="option.value"
            type="button"
            class="appearance-option"
            :class="{ active: props.appearanceMode === option.value }"
            @click="emitAppearanceChange(option.value)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>
      </div>

      <div class="settings-card appearance-card">
        <div class="settings-card-copy">
          <strong>{{ t('settings.customIcon') }}</strong>
          <span>{{ t('settings.customIconDesc') }}</span>
        </div>

        <div class="custom-icon-actions appearance-toggle">
          <button type="button" class="appearance-option active" @click="triggerFileUpload">
            {{ t('settings.uploadIcon') }}
          </button>
          <button v-if="props.customBubbleIcon" type="button" class="appearance-option" @click="removeCustomIcon">
            {{ t('settings.removeIcon') }}
          </button>
          <input type="file" ref="fileInputRef" accept="image/*" style="display: none" @change="onFileSelected" />
        </div>
      </div>

      <label class="settings-card" v-if="props.customBubbleIcon">
        <div class="settings-card-copy">
          <strong>{{ t('settings.transparentBg') }}</strong>
          <span>{{ t('settings.transparentBgDesc') }}</span>
        </div>
        <input
          type="checkbox"
          class="settings-toggle"
          :checked="props.customBubbleBgTransparent"
          @change="emitTransparentToggle"
        />
      </label>
    </section>

    <div class="settings-groups">
      <section v-for="group in groupedFeatures" :key="group.area" class="settings-group">
        <header class="settings-group-header">
          <h3>{{ group.label }}</h3>
          <span>{{ t('settings.featureCount', { n: group.features.length }) }}</span>
        </header>

        <div class="settings-list">
          <label v-for="feature in group.features" :key="feature.id" class="settings-card">
            <div class="settings-card-copy">
              <strong>{{ t(feature.titleKey) }}</strong>
              <span>{{ t(feature.descriptionKey) }}</span>
            </div>
            <input
              type="checkbox"
              class="settings-toggle"
              :checked="feature.enabled"
              @change="(event) => emitFeatureToggle(feature.id, event)"
            />
          </label>
        </div>
      </section>
    </div>

    <ImageCropper 
      v-if="showCropper" 
      :image-url="cropImageUrl" 
      :i18n="props.i18n" 
      :appearance-mode="props.appearanceMode"
      @crop="handleCrop" 
      @cancel="handleCropCancel" 
    />
  </div>
</template>

<style scoped>
.settings-pane {
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: var(--ttce-text);
}

.settings-header {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.settings-title {
    margin: 0;
    font-size: 20px;
}

.settings-description {
    margin: 0;
    max-width: 64ch;
    color: var(--ttce-text-muted);
    font-size: 13px;
    line-height: 1.55;
}

.settings-groups {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.settings-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.settings-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.settings-group-header h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.settings-group-header span {
    color: var(--ttce-text-muted);
    font-size: 11px;
}

.settings-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.settings-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 14px 16px;
    border: 1px solid var(--ttce-border);
    border-radius: 10px;
    background: var(--ttce-bg-1);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
}

.settings-card:hover {
    background: var(--ttce-surface-hover);
    border-color: var(--ttce-border-strong);
}

.settings-card-master {
    background: var(--ttce-bg-0);
}

.appearance-card {
    align-items: center;
}

.appearance-toggle {
    display: inline-flex;
    gap: 6px;
    padding: 4px;
    border: 1px solid var(--ttce-border);
    border-radius: 999px;
    background: var(--ttce-bg-0);
    flex-shrink: 0;
}

.appearance-option {
    min-width: 78px;
    padding: 7px 12px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;
    color: var(--ttce-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.appearance-option:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.appearance-option.active {
    border-color: var(--ttce-border-strong);
    background: var(--ttce-surface-active);
    color: var(--ttce-text);
}

.settings-card-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.settings-card-copy strong {
    font-size: 14px;
    font-weight: 600;
}

.settings-card-copy span {
    color: var(--ttce-text-muted);
    font-size: 12px;
    line-height: 1.45;
}

.settings-toggle {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

@media (max-width: 760px) {
    .settings-card {
        align-items: flex-start;
    }

    .appearance-card {
        align-items: center;
    }

    .appearance-toggle {
        padding: 3px;
        gap: 4px;
        flex: 0 1 160px;
        min-width: 0;
    }

    .appearance-option {
        min-width: 0;
        padding: 6px 8px;
        font-size: 12px;
        flex: 1 1 0;
    }
}
</style>
