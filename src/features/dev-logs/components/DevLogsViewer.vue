<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BackendLogEntry, FrontendLogEntry } from '../../../host/api';
import type { DevLogsFeatureController } from '../module';
import { useI18n } from '../../../i18n';

type LogTab = 'frontend' | 'backend';
type LogLevelFilter = 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

type NormalizedLogEntry = {
    id: number;
    timestampMs: number;
    level: Exclude<LogLevelFilter, 'ALL'>;
    message: string;
    target?: string;
};

const props = defineProps<{
    controller: DevLogsFeatureController;
}>();

const activeTab = ref<LogTab>('frontend');
const levelFilter = ref<LogLevelFilter>('ALL');
const searchQuery = ref('');
const copyFeedback = ref<'idle' | 'copied'>('idle');
const { t } = useI18n();

const formatTime = (ms: number) => new Date(ms).toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
});

const normalizeFrontendEntry = (entry: FrontendLogEntry): NormalizedLogEntry => ({
    id: entry.id,
    timestampMs: entry.timestampMs,
    level: entry.level.toUpperCase() as NormalizedLogEntry['level'],
    message: entry.message,
    target: entry.target,
});

const normalizeBackendEntry = (entry: BackendLogEntry): NormalizedLogEntry => ({
    id: entry.id,
    timestampMs: entry.timestampMs,
    level: entry.level,
    message: entry.message,
    target: entry.target,
});

const currentLogs = computed(() => (
    activeTab.value === 'frontend'
        ? props.controller.state.frontendLogs.map(normalizeFrontendEntry)
        : props.controller.state.backendLogs.map(normalizeBackendEntry)
));

const filteredLogs = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    return currentLogs.value.filter((entry) => {
        if (levelFilter.value !== 'ALL' && entry.level !== levelFilter.value) {
            return false;
        }

        if (!query) {
            return true;
        }

        return [
            entry.message,
            entry.target ?? '',
            entry.level,
        ].some((value) => value.toLowerCase().includes(query));
    });
});

const summaryLine = computed(() => {
    const logs = currentLogs.value;
    const warnings = logs.filter((entry) => entry.level === 'WARN').length;
    const errors = logs.filter((entry) => entry.level === 'ERROR').length;
    return t('devLogs.summaryLine', { total: logs.length, warnings, errors });
});

const copyVisibleLogs = async () => {
    const text = filteredLogs.value
        .map((entry) => {
            const target = entry.target ? ` [${entry.target}]` : '';
            return `[${formatTime(entry.timestampMs)}] [${entry.level}]${target} ${entry.message}`;
        })
        .join('\n');

    await navigator.clipboard.writeText(text);
    copyFeedback.value = 'copied';
    setTimeout(() => {
        copyFeedback.value = 'idle';
    }, 1500);
};

const clearCurrentLogs = () => {
    props.controller.clearLogs(activeTab.value);
};

const updateCapture = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    await props.controller.setFrontendConsoleCaptureEnabled(target.checked);
};
</script>

<template>
  <div class="devlogs-view">
    <div class="view-header">
      <div class="heading">
        <h2 class="view-title">{{ t('devLogs.title') }}</h2>
        <p class="view-desc">{{ t('devLogs.description') }}</p>
      </div>

      <div class="log-tabs">
        <button :class="{ active: activeTab === 'frontend' }" @click="activeTab = 'frontend'">{{ t('devLogs.tabFrontend') }}</button>
        <button :class="{ active: activeTab === 'backend' }" @click="activeTab = 'backend'">{{ t('devLogs.tabBackend') }}</button>
      </div>
    </div>

    <div class="toolbar">
      <span class="summary-line">{{ summaryLine }}</span>

      <input
        v-model="searchQuery"
        type="search"
        class="search-input ttce-control ttce-input-control"
        :placeholder="t('devLogs.filterPlaceholder')"
      />

      <label v-if="activeTab === 'frontend'" class="capture-toggle">
        <input
          :checked="props.controller.state.frontendConsoleCaptureEnabled"
          type="checkbox"
          @change="void updateCapture($event)"
        />
        <span>{{ t('devLogs.captureConsole') }}</span>
      </label>

      <button class="toolbar-btn" @click="void copyVisibleLogs()">
        {{ copyFeedback === 'copied' ? t('devLogs.copied') : t('devLogs.copyVisible') }}
      </button>
      <button class="toolbar-btn" @click="clearCurrentLogs()">{{ t('devLogs.clearView') }}</button>
    </div>

    <div class="filter-row">
      <button
        v-for="option in ['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR']"
        :key="option"
        class="filter-chip"
        :class="{ active: levelFilter === option }"
        @click="levelFilter = option as LogLevelFilter"
      >
        {{ option }}
      </button>
    </div>

    <div class="log-terminal">
      <div v-if="filteredLogs.length" class="log-stream">
        <div v-for="log in filteredLogs" :key="`${activeTab}-${log.id}`" class="log-row" :class="log.level.toLowerCase()">
          <div class="log-meta">
            <span class="log-time">{{ formatTime(log.timestampMs) }}</span>
            <span class="log-level">{{ log.level }}</span>
            <span v-if="log.target" class="log-target">{{ log.target }}</span>
          </div>
          <div class="log-message">{{ log.message }}</div>
        </div>
      </div>

      <div v-else class="empty-log">
        {{ currentLogs.length ? t('devLogs.emptyFiltered') : t('devLogs.emptyNone') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.devlogs-view {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    min-height: 0;
    color: var(--ttce-text);
}

.view-header,
.toolbar {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    flex-wrap: wrap;
}

.heading {
    min-width: 0;
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

.log-tabs,
.filter-row {
    display: flex;
    gap: 6px;
    align-items: center;
}

.log-tabs {
    padding: 3px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-0);
}

.filter-row {
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: thin;
}

.log-tabs button,
.filter-chip,
.toolbar-btn {
    border: 1px solid var(--ttce-border);
    border-radius: 7px;
    background: transparent;
    color: var(--ttce-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.log-tabs button,
.toolbar-btn {
    padding: 7px 11px;
}

.filter-chip {
    padding: 5px 9px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
}

.log-tabs button.active,
.filter-chip.active {
    background: var(--ttce-surface-active);
    border-color: var(--ttce-border-strong);
    color: var(--ttce-text);
}

.toolbar-btn:hover,
.log-tabs button:hover,
.filter-chip:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.summary-line {
    color: var(--ttce-text-muted);
    font-size: 11px;
    padding: 7px 0;
    white-space: nowrap;
}

.search-input {
    min-width: 240px;
    flex: 1;
    padding: 8px 11px;
    border-radius: 8px;
}

.capture-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 2px;
    color: var(--ttce-text-muted);
    font-size: 11px;
    white-space: nowrap;
}

.log-terminal {
    flex: 1;
    min-height: 0;
    padding: 6px;
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: var(--ttce-bg-code);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    font-family: var(--ttce-font-mono);
}

.log-stream {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.log-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 10px;
    border: 1px solid var(--ttce-border);
    border-left: 3px solid var(--ttce-border-strong);
    border-radius: 8px;
    background: var(--ttce-bg-0);
}

.log-row.info {
    border-left-color: var(--ttce-accent-green);
}

.log-row.warn {
    border-left-color: var(--ttce-accent-amber);
}

.log-row.error {
    border-left-color: var(--ttce-accent-red);
    background: var(--ttce-accent-red-soft-bg);
}

.log-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 7px;
    color: var(--ttce-text-soft);
    font-size: 11px;
}

.log-time {
    font-variant-numeric: tabular-nums;
}

.log-level {
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--ttce-chip-bg);
    font-weight: 700;
    letter-spacing: 0.04em;
}

.log-target {
    color: var(--ttce-text-muted);
}

.log-message {
    color: var(--ttce-text);
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.empty-log {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    color: var(--ttce-text-soft);
    font-size: 13px;
}

@media (max-width: 900px) {
    .view-header,
    .toolbar {
        flex-direction: column;
        align-items: stretch;
    }

    .summary-line {
        padding: 0;
        white-space: normal;
    }

    .search-input {
        min-width: 0;
    }
}
</style>
