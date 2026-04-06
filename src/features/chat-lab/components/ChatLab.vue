<script setup lang="ts">
import { computed, ref } from 'vue';
import FactStrip, { type FactStripItem } from '../../../components/FactStrip.vue';
import type { ChatLocateResult, ChatSearchHit, ChatRef } from '../../../host/api';
import type { ChatLabFeatureController, ChatRoleFilter } from '../module';
import { useI18n } from '../../../i18n';

const props = defineProps<{
    controller: ChatLabFeatureController;
}>();

const activeTool = ref<'find' | 'search'>('find');
const copyFeedback = ref<'idle' | 'copied'>('idle');
const hasWindowInfo = computed(() => Boolean(props.controller.state.windowInfo));
const { t } = useI18n();

const roleOptions: Array<{ label: string; value: ChatRoleFilter }> = [
    { label: t('chatLab.roleAny'), value: 'any' },
    { label: t('chatLab.roleUser'), value: 'user' },
    { label: t('chatLab.roleAssistant'), value: 'assistant' },
    { label: t('chatLab.roleSystem'), value: 'system' },
];

const chatRefLabel = computed(() => formatChatRef(props.controller.state.windowInfo?.chatRef));
const windowRangeLabel = computed(() => {
    const info = props.controller.state.windowInfo;
    if (!info || info.windowLength === 0) {
        return t('chatLab.windowEmpty');
    }

    const start = info.windowStartIndex;
    const end = info.windowStartIndex + info.windowLength - 1;
    return `${start} - ${end} / ${info.totalCount - 1}`;
});

const contextFacts = computed<FactStripItem[]>(() => [
    { label: t('chatLab.factMode'), value: props.controller.state.windowInfo?.mode ?? 'inactive' },
    { label: t('chatLab.factKind'), value: props.controller.state.windowInfo?.chatKind ?? 'inactive' },
    { label: t('chatLab.factChat'), value: chatRefLabel.value, monospace: true },
    { label: t('chatLab.factWindow'), value: windowRangeLabel.value, monospace: true },
]);

const locateResult = computed(() => {
    const result = props.controller.state.searchResult;
    if (!result || Array.isArray(result) || !('index' in result) || !('message' in result)) {
        return null;
    }

    return result as ChatLocateResult;
});

const searchHits = computed(() => (
    Array.isArray(props.controller.state.searchResult)
        ? props.controller.state.searchResult as ChatSearchHit[]
        : []
));

const resultJson = computed(() => JSON.stringify(props.controller.state.searchResult, null, 2));
const infoMessage = computed(() => {
    const result = props.controller.state.searchResult;
    if (result && !Array.isArray(result) && 'message' in result && typeof result.message === 'string') {
        return result.message;
    }

    return null;
});

function formatChatRef(chatRef: ChatRef | null | undefined) {
    if (!chatRef) {
        return t('chatLab.chatUnavailable');
    }

    if (chatRef.kind === 'character') {
        return `${chatRef.fileName} (${chatRef.characterId})`;
    }

    return chatRef.chatId;
}

function getLocateMessageText(result: ChatLocateResult) {
    const mes = result.message.mes;
    if (typeof mes === 'string') {
        return mes;
    }

    return JSON.stringify(result.message, null, 2);
}

function getLocateMessageKeys(result: ChatLocateResult) {
    return Object.keys(result.message);
}

async function copyCurrentResult() {
    await navigator.clipboard.writeText(resultJson.value);
    copyFeedback.value = 'copied';
    setTimeout(() => {
        copyFeedback.value = 'idle';
    }, 1500);
}
</script>

<template>
  <div class="chatlab-view">
    <div class="view-header">
      <div>
        <h2 class="view-title">{{ t('chatLab.title') }}</h2>
        <p class="view-desc">
          {{ t('chatLab.description') }}
        </p>
      </div>
      <button class="toolbar-btn" @click="void props.controller.refreshWindowInfo()">{{ t('chatLab.refreshContext') }}</button>
    </div>

    <FactStrip :items="contextFacts" />

    <div v-if="!hasWindowInfo" class="context-empty">
      {{ t('chatLab.contextEmpty') }}
    </div>

    <div class="sandbox-container">
      <div class="operations-panel">
        <div class="tool-tabs">
          <button :class="{ active: activeTool === 'find' }" @click="activeTool = 'find'">{{ t('chatLab.tabFindLast') }}</button>
          <button :class="{ active: activeTool === 'search' }" @click="activeTool = 'search'">{{ t('chatLab.tabSearch') }}</button>
        </div>

        <section v-if="activeTool === 'find'" class="tool-section">
          <div class="section-head">
            <h3>{{ t('chatLab.findLastTitle') }}</h3>
            <p>{{ t('chatLab.findLastDesc') }}</p>
          </div>

          <div class="tool-grid find-grid">
            <label class="field field-span-2">
              <span>{{ t('chatLab.fieldExtraKeys') }}</span>
              <input
                v-model="props.controller.state.extraKeysInput"
                type="text"
                class="ttce-control ttce-input-control mono-input"
                placeholder="e.g. TavernDB_ACU_IsolatedData, isUser"
                @keyup.enter="void props.controller.executeFindLast()"
              />
            </label>

            <label class="field">
              <span>{{ t('chatLab.fieldRole') }}</span>
              <select v-model="props.controller.state.locateRole" class="ttce-control ttce-select-control">
                <option v-for="option in roleOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>

            <button
              class="primary-btn action-btn"
              :disabled="props.controller.state.isLoading || !hasWindowInfo"
              @click="void props.controller.executeFindLast()"
            >
              {{ t('chatLab.btnLocate') }}
            </button>
          </div>
        </section>

        <section v-else class="tool-section">
          <div class="section-head">
            <h3>{{ t('chatLab.searchTitle') }}</h3>
            <p>{{ t('chatLab.searchDesc') }}</p>
          </div>

          <div class="tool-grid search-grid">
            <label class="field field-span-2">
              <span>{{ t('chatLab.fieldQuery') }}</span>
              <input
                v-model="props.controller.state.searchQuery"
                type="text"
                class="ttce-control ttce-input-control"
                :placeholder="t('chatLab.fieldQueryPlaceholder')"
                @keyup.enter="void props.controller.executeSearch()"
              />
            </label>

            <label class="field">
              <span>{{ t('chatLab.fieldRole') }}</span>
              <select v-model="props.controller.state.searchRole" class="ttce-control ttce-select-control">
                <option v-for="option in roleOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
            </label>

            <label class="field compact">
              <span>{{ t('chatLab.fieldLimit') }}</span>
              <input
                v-model.number="props.controller.state.searchLimit"
                type="number"
                min="1"
                step="1"
                class="ttce-control ttce-number-control"
              />
            </label>

            <button
              class="primary-btn action-btn field-span-2"
              :disabled="props.controller.state.isLoading || !hasWindowInfo || !props.controller.state.searchQuery.trim()"
              @click="void props.controller.executeSearch()"
            >
              {{ t('chatLab.btnSearch') }}
            </button>
          </div>
        </section>
      </div>

      <div class="results-panel">
        <div class="results-header">
          <div>
            <h3>{{ t('chatLab.resultsTitle') }}</h3>
            <p>{{ t('chatLab.resultsDesc') }}</p>
          </div>

          <div class="results-actions">
            <div v-if="props.controller.state.searchResult" class="toggle-group">
              <button :class="{ active: props.controller.state.viewMode === 'pretty' }" @click="props.controller.state.viewMode = 'pretty'">{{ t('chatLab.viewPretty') }}</button>
              <button :class="{ active: props.controller.state.viewMode === 'raw' }" @click="props.controller.state.viewMode = 'raw'">{{ t('chatLab.viewRaw') }}</button>
            </div>
            <button v-if="props.controller.state.searchResult" class="toolbar-btn" @click="void copyCurrentResult()">
              {{ copyFeedback === 'copied' ? t('chatLab.jsonCopied') : t('chatLab.copyJson') }}
            </button>
          </div>
        </div>

        <div class="results-body">
          <div v-if="props.controller.state.isLoading" class="state-msg">{{ t('chatLab.stateLoading') }}</div>
          <div v-else-if="props.controller.state.errorMessage" class="state-msg error">{{ props.controller.state.errorMessage }}</div>
          <div v-else-if="!props.controller.state.searchResult" class="state-msg empty">{{ t('chatLab.stateEmpty') }}</div>

          <template v-else>
            <pre v-if="props.controller.state.viewMode === 'raw'" class="json-renderer">{{ resultJson }}</pre>

            <div v-else class="pretty-output">
              <div v-if="searchHits.length" class="search-results">
                <article v-for="item in searchHits" :key="item.index" class="result-card">
                  <div class="result-meta">
                    <span class="result-badge">{{ item.role }}</span>
                    <span>Index {{ item.index }}</span>
                    <span>Score {{ item.score.toFixed(3) }}</span>
                  </div>
                  <p class="result-snippet">{{ item.snippet }}</p>
                  <pre class="result-text">{{ item.text }}</pre>
                </article>
              </div>

              <article v-else-if="locateResult" class="result-card">
                <div class="result-meta">
                  <span class="result-badge">Locate Result</span>
                  <span>Index {{ locateResult.index }}</span>
                </div>
                <div class="key-row">
                  <span v-for="key in getLocateMessageKeys(locateResult)" :key="key" class="key-chip">{{ key }}</span>
                </div>
                <pre class="result-text">{{ getLocateMessageText(locateResult) }}</pre>
              </article>

              <article v-else-if="infoMessage" class="result-card">
                <pre class="result-text">{{ infoMessage }}</pre>
              </article>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatlab-view {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-height: 0;
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
    max-width: 54ch;
    color: var(--ttce-text-muted);
    font-size: 12px;
    line-height: 1.45;
}

.toolbar-btn,
.primary-btn,
.tool-tabs button,
.toggle-group button {
    padding: 8px 11px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: transparent;
    color: var(--ttce-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.toolbar-btn:hover,
.tool-tabs button:hover,
.toggle-group button:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.primary-btn {
    background: var(--ttce-primary-bg);
    border-color: var(--ttce-primary-border);
    color: var(--ttce-primary-text);
}

.primary-btn:hover:not(:disabled) {
    background: var(--ttce-primary-bg-hover);
}

.primary-btn:disabled {
    cursor: not-allowed;
    opacity: 0.55;
}

.context-empty {
    padding: 12px 14px;
    border: 1px dashed var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-1);
    color: var(--ttce-text-muted);
    font-size: 13px;
}

.sandbox-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.operations-panel,
.results-panel {
    min-height: 0;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-1);
}

.operations-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    flex-shrink: 0;
}

.tool-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tool-tabs button.active {
    border-color: var(--ttce-accent-blue);
    background: var(--ttce-surface-active);
    color: var(--ttce-text);
}

.tool-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-2);
    min-width: 0;
}

.section-head h3,
.results-header h3 {
    margin: 0 0 4px;
    font-size: 15px;
}

.section-head p,
.results-header p {
    margin: 0;
    color: var(--ttce-text-muted);
    font-size: 12px;
    line-height: 1.45;
}

.tool-grid {
    display: grid;
    gap: 10px;
    min-width: 0;
}

.find-grid {
    grid-template-columns: minmax(0, 1fr) 180px;
}

.search-grid {
    grid-template-columns: minmax(0, 1fr) 120px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}

.field-span-2 {
    grid-column: 1 / -1;
}

.field.compact {
    max-width: none;
}

.field span {
    color: var(--ttce-text-muted);
    font-size: 12px;
}

.field input,
.field select {
    width: 100%;
    min-width: 0;
    padding: 9px 10px;
    border-radius: 8px;
}

.field select {
    padding-right: 34px;
}

.mono-input {
    font-family: var(--ttce-font-mono);
}

.action-btn {
    width: 100%;
    align-self: end;
}

.results-panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
}

.results-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--ttce-border);
    background: var(--ttce-bg-2);
}

.results-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.toggle-group {
    display: flex;
    gap: 6px;
}

.toggle-group button.active {
    border-color: var(--ttce-accent-blue);
    background: var(--ttce-surface-active);
    color: var(--ttce-text);
}

.results-body {
    flex: 1;
    min-height: 0;
    padding: 10px 12px 12px;
    overflow-y: auto;
}

.state-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
    color: var(--ttce-text-muted);
    font-size: 13px;
}

.state-msg.error {
    color: var(--ttce-accent-red);
}

.pretty-output,
.search-results {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.result-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-1);
}

.result-meta,
.key-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    color: var(--ttce-text-muted);
    font-size: 11px;
}

.result-badge,
.key-chip {
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--ttce-chip-strong-bg);
    color: var(--ttce-text);
}

.result-snippet {
    margin: 0;
    color: var(--ttce-text);
    font-size: 13px;
    line-height: 1.55;
}

.result-text,
.json-renderer {
    margin: 0;
    padding: 0;
    color: var(--ttce-text);
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: var(--ttce-font-mono);
}

@media (max-width: 960px) {
    .chatlab-view {
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        padding-right: 2px;
    }

    .sandbox-container {
        flex: 0 0 auto;
        overflow: visible;
    }

    .results-panel {
        flex: 0 0 auto;
        overflow: visible;
    }

    .results-body {
        overflow: visible;
    }

    .view-header,
    .results-header {
        flex-direction: column;
        align-items: stretch;
    }

    .find-grid,
    .search-grid {
        grid-template-columns: 1fr;
    }
}
</style>
