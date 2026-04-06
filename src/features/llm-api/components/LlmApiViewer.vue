<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ExpandableTextPane from '../../../components/ExpandableTextPane.vue';
import FactStrip, { type FactStripItem } from '../../../components/FactStrip.vue';
import type { LlmApiFeatureController } from '../module';
import { useI18n } from '../../../i18n';

const props = defineProps<{
    controller: LlmApiFeatureController;
}>();

const keepDraft = ref(String(props.controller.state.keepLimit));
const copyFeedback = ref<'idle' | 'request' | 'response'>('idle');
const { t } = useI18n();

watch(
    () => props.controller.state.keepLimit,
    (value) => {
        keepDraft.value = String(value);
    },
    { immediate: true },
);

const selectedIndex = computed(() => (
    props.controller.state.logs.findIndex((entry) => entry.id === props.controller.state.selectedId)
));

const selectedLog = computed(() => (
    props.controller.state.logs[selectedIndex.value] ?? null
));

const positionLabel = computed(() => {
    if (selectedIndex.value < 0) {
        return '0 / 0';
    }

    return `${selectedIndex.value + 1} / ${props.controller.state.logs.length}`;
});

const isRawView = computed(() => props.controller.state.viewMode === 'raw');

const requestTitle = computed(() => (
    isRawView.value ? t('llmApi.requestRaw') : t('llmApi.requestPreview')
));

const responseTitle = computed(() => (
    isRawView.value ? t('llmApi.responseRaw') : t('llmApi.responsePreview')
));

const requestText = computed(() => (
    isRawView.value
        ? (props.controller.state.loadingRaw ? t('llmApi.loading') : props.controller.state.selectedRaw?.requestRaw ?? '')
        : (props.controller.state.loadingPreview ? t('llmApi.loading') : props.controller.state.selectedPreview?.requestReadable ?? '')
));

const responseText = computed(() => (
    isRawView.value
        ? (props.controller.state.loadingRaw ? t('llmApi.loading') : props.controller.state.selectedRaw?.responseRaw ?? '')
        : (props.controller.state.loadingPreview ? t('llmApi.loading') : props.controller.state.selectedPreview?.responseReadable ?? '')
));

const requestFullscreenTitle = computed(() => (
    selectedLog.value ? `Entry #${selectedLog.value.id} - ${requestTitle.value}` : requestTitle.value
));

const responseFullscreenTitle = computed(() => (
    selectedLog.value ? `Entry #${selectedLog.value.id} - ${responseTitle.value}` : responseTitle.value
));

const detailFacts = computed<FactStripItem[]>(() => {
    const log = selectedLog.value;
    if (!log) {
        return [];
    }

    return [
        { label: t('llmApi.factStatus'), value: log.ok ? 'OK' : 'ERROR', tone: log.ok ? 'green' : 'red' },
        { label: t('llmApi.factSource'), value: log.source },
        { label: t('llmApi.factModel'), value: log.model ?? t('common.unknownModel') },
        { label: t('llmApi.factDuration'), value: `${log.durationMs}ms`, monospace: true },
        {
            label: t('llmApi.factResponse'),
            value: props.controller.state.selectedPreview?.responseRawKind ?? props.controller.state.selectedRaw?.responseRawKind ?? 'unknown',
        },
        { label: t('llmApi.factTimestamp'), value: formatTime(log.timestampMs), monospace: true },
    ];
});

const formatTime = (ms: number) => new Date(ms).toLocaleString([], {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

const applyKeepLimit = async () => {
    const nextKeep = Number.parseInt(keepDraft.value, 10);
    if (Number.isNaN(nextKeep) || nextKeep < 1) {
        keepDraft.value = String(props.controller.state.keepLimit);
        return;
    }

    await props.controller.setKeepLimit(nextKeep);
};

const selectRelative = async (offset: number) => {
    if (selectedIndex.value < 0) {
        return;
    }

    const nextIndex = selectedIndex.value + offset;
    const nextEntry = props.controller.state.logs[nextIndex];
    if (!nextEntry) {
        return;
    }

    await props.controller.selectLog(nextEntry.id);
};

const copyText = async (kind: 'request' | 'response') => {
    const text = props.controller.state.viewMode === 'preview'
        ? (kind === 'request'
            ? props.controller.state.selectedPreview?.requestReadable ?? ''
            : props.controller.state.selectedPreview?.responseReadable ?? '')
        : (kind === 'request'
            ? props.controller.state.selectedRaw?.requestRaw ?? ''
            : props.controller.state.selectedRaw?.responseRaw ?? '');

    await navigator.clipboard.writeText(text);
    copyFeedback.value = kind;
    setTimeout(() => {
        copyFeedback.value = 'idle';
    }, 1500);
};
</script>

<template>
  <div class="llmapi-view">
    <div class="view-header">
      <div>
        <h2 class="view-title">{{ t('llmApi.title') }}</h2>
        <p class="view-desc">{{ t('llmApi.description') }}</p>
      </div>

      <div class="keep-toolbar">
        <label class="keep-control">
          <span>{{ t('llmApi.keepLabel') }}</span>
          <input
            v-model="keepDraft"
            type="number"
            min="1"
            step="1"
            class="ttce-control ttce-number-control"
            @keyup.enter="void applyKeepLimit()"
          />
        </label>
        <button class="toolbar-btn" @click="void applyKeepLimit()">{{ t('llmApi.apply') }}</button>
      </div>
    </div>

    <div v-if="selectedLog" class="viewer-shell">
      <div class="viewer-toolbar">
        <div class="nav-group">
          <button class="toolbar-btn" :disabled="selectedIndex >= props.controller.state.logs.length - 1" @click="void selectRelative(1)">
            {{ t('llmApi.prev') }}
          </button>
          <button class="toolbar-btn" :disabled="selectedIndex <= 0" @click="void selectRelative(-1)">
            {{ t('llmApi.next') }}
          </button>
          <span class="position-label">{{ positionLabel }}</span>
        </div>

        <div class="action-group">
          <button class="toolbar-btn" @click="void props.controller.reloadSelection()">{{ t('llmApi.reload') }}</button>
          <div class="toggle-group">
            <button
              :class="{ active: props.controller.state.viewMode === 'preview' }"
              @click="void props.controller.setViewMode('preview')"
            >
              {{ t('llmApi.preview') }}
            </button>
            <button
              :class="{ active: props.controller.state.viewMode === 'raw' }"
              @click="void props.controller.setViewMode('raw')"
            >
              {{ t('llmApi.raw') }}
            </button>
          </div>
          <button class="toolbar-btn" @click="void copyText('request')">
            {{ copyFeedback === 'request' ? t('llmApi.requestCopied') : t('llmApi.copyRequest') }}
          </button>
          <button class="toolbar-btn" @click="void copyText('response')">
            {{ copyFeedback === 'response' ? t('llmApi.responseCopied') : t('llmApi.copyResponse') }}
          </button>
        </div>
      </div>

      <div class="detail-head">
        <div class="detail-title-row">
          <h3>Entry #{{ selectedLog.id }}</h3>
          <span class="detail-endpoint">{{ selectedLog.endpoint }}</span>
        </div>
        <FactStrip :items="detailFacts" />
      </div>

      <div
        v-if="props.controller.state.selectedPreview?.errorMessage && props.controller.state.viewMode === 'preview'"
        class="error-callout"
      >
        {{ props.controller.state.selectedPreview.errorMessage }}
      </div>

      <div class="body-stack">
        <ExpandableTextPane
          class="detail-section request"
          :title="requestTitle"
          :fullscreen-title="requestFullscreenTitle"
          :text="requestText"
          :raw="isRawView"
        />

        <ExpandableTextPane
          class="detail-section response"
          :title="responseTitle"
          :fullscreen-title="responseFullscreenTitle"
          :text="responseText"
          :raw="isRawView"
        />
      </div>
    </div>

    <div v-else class="empty-detail">
      {{ t('llmApi.empty') }}
    </div>
  </div>
</template>

<style scoped>
.llmapi-view {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-height: 0;
    min-width: 0;
    color: var(--ttce-text);
}

.view-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
}

.view-title {
    margin: 0 0 6px;
    font-size: 18px;
}

.view-desc {
    margin: 0;
    max-width: 52ch;
    color: var(--ttce-text-muted);
    font-size: 12px;
    line-height: 1.45;
}

.keep-toolbar,
.viewer-toolbar,
.nav-group,
.action-group,
.toggle-group {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
}

.keep-toolbar,
.viewer-toolbar {
    justify-content: space-between;
}

.keep-control {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--ttce-text-muted);
    font-size: 12px;
}

.keep-control input {
    width: 92px;
    padding: 7px 10px;
    border-radius: 8px;
}

.toolbar-btn,
.toggle-group button {
    padding: 7px 11px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: transparent;
    color: var(--ttce-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.toolbar-btn:hover,
.toggle-group button:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.toolbar-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.toggle-group button.active {
    border-color: var(--ttce-accent-blue);
    color: var(--ttce-text);
    background: var(--ttce-surface-active);
}

.position-label {
    color: var(--ttce-text-muted);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
}

.viewer-shell {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
}

.viewer-toolbar,
.detail-head {
    padding: 10px 12px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-1);
    min-width: 0;
}

.detail-head {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-title-row {
    display: flex;
    gap: 10px;
    align-items: baseline;
    min-width: 0;
}

.detail-title-row h3 {
    margin: 0;
    font-size: 15px;
    white-space: nowrap;
}

.detail-endpoint {
    color: var(--ttce-text-muted);
    font-size: 12px;
    overflow-wrap: anywhere;
    min-width: 0;
}

.error-callout {
    padding: 12px 14px;
    border: 1px solid var(--ttce-accent-red-soft-border);
    border-radius: 8px;
    background: var(--ttce-accent-red-soft-bg);
    color: var(--ttce-accent-red-soft-text);
    font-size: 13px;
}

.body-stack {
    flex: 1;
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.detail-section {
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-0);
    overflow: hidden;
}

.detail-section.request {
    flex: 0 0 156px;
}

.detail-section.response {
    flex: 1 1 auto;
    min-height: 260px;
}

.empty-detail {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    border: 1px dashed var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-1);
    color: var(--ttce-text-muted);
}

@media (max-width: 900px) {
    .viewer-shell {
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding-right: 2px;
    }

    .view-header,
    .viewer-toolbar,
    .detail-title-row {
        flex-direction: column;
        align-items: flex-start;
    }

    .detail-section.request {
        flex-basis: 128px;
    }

    .detail-section.response {
        min-height: 220px;
    }
}
</style>
