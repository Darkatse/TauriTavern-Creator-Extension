<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useCreatorApp } from '../app/context';
import { useI18n } from '../i18n';

const props = defineProps<{
    title: string;
    text: string;
    raw?: boolean;
    fullscreenTitle?: string;
}>();

const isExpanded = ref(false);
const { t } = useI18n();
const { settings } = useCreatorApp();

const dialogTitle = computed(() => props.fullscreenTitle ?? props.title);
const appearanceMode = computed(() => settings.state.appearanceMode);

const closeViewer = () => {
    isExpanded.value = false;
};

const onWindowKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeViewer();
    }
};

watch(isExpanded, (expanded) => {
    if (expanded) {
        window.addEventListener('keydown', onWindowKeydown);
        return;
    }

    window.removeEventListener('keydown', onWindowKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onWindowKeydown);
});
</script>

<template>
  <section class="expandable-pane">
    <div class="section-header">
      <h4>{{ props.title }}</h4>
      <button
        type="button"
        class="expand-btn"
        :title="t('common.expandView')"
        :aria-label="t('common.expandView')"
        @click="isExpanded = true"
      >
        ⤢
      </button>
    </div>

    <pre class="text-viewer" :class="{ raw: props.raw }">{{ props.text }}</pre>

    <Teleport to="body">
      <div
        v-if="isExpanded"
        class="viewer-backdrop ttce-theme-root"
        :data-ttce-appearance="appearanceMode"
        @click.self="closeViewer"
      >
        <div class="viewer-dialog">
          <div class="viewer-header">
            <h3>{{ dialogTitle }}</h3>
            <button
              type="button"
              class="viewer-close"
              :title="t('common.close')"
              :aria-label="t('common.close')"
              @click="closeViewer"
            >
              ✕
            </button>
          </div>

          <pre class="viewer-content" :class="{ raw: props.raw }">{{ props.text }}</pre>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.expandable-pane {
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 10px;
    border-bottom: 1px solid var(--ttce-border);
    background: var(--ttce-bg-2);
}

.section-header h4 {
    margin: 0;
    font-size: 12px;
}

.expand-btn,
.viewer-close {
    border: 1px solid var(--ttce-border);
    border-radius: 8px;
    background: transparent;
    color: var(--ttce-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.expand-btn {
    flex-shrink: 0;
    width: 30px;
    height: 28px;
    padding: 0;
    font-size: 13px;
    line-height: 1;
}

.expand-btn:hover,
.viewer-close:hover {
    background: var(--ttce-surface-hover);
    color: var(--ttce-text);
}

.text-viewer,
.viewer-content {
    margin: 0;
    color: var(--ttce-text);
    font-size: 12px;
    line-height: 1.6;
    font-family: var(--ttce-font-mono);
}

.text-viewer {
    flex: 1;
    min-height: 0;
    padding: 10px 12px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    overflow: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}

.text-viewer.raw {
    white-space: pre;
}

.viewer-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100100;
    display: flex;
    padding-top: calc(env(safe-area-inset-top, 0px) + 16px);
    padding-right: calc(env(safe-area-inset-right, 0px) + 16px);
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
    padding-left: calc(env(safe-area-inset-left, 0px) + 16px);
    background: var(--ttce-backdrop);
    backdrop-filter: blur(4px);
}

.viewer-dialog {
    display: flex;
    flex: 1;
    min-height: 0;
    flex-direction: column;
    border: 1px solid var(--ttce-border-strong);
    border-radius: 12px;
    overflow: hidden;
    background: var(--ttce-bg-0);
    box-shadow: var(--ttce-shadow-dialog);
}

.viewer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--ttce-border-strong);
    background: var(--ttce-bg-2);
}

.viewer-header h3 {
    margin: 0;
    font-size: 14px;
    color: var(--ttce-text);
    overflow-wrap: anywhere;
}

.viewer-close {
    flex-shrink: 0;
    min-width: 36px;
    min-height: 32px;
    padding: 0 10px;
}

.viewer-content {
    flex: 1;
    min-height: 0;
    padding: 14px 16px 18px;
    overflow: auto;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}

@media (max-width: 900px) {
    .viewer-backdrop {
        padding-top: calc(env(safe-area-inset-top, 0px) + 10px);
        padding-right: calc(env(safe-area-inset-right, 0px) + 10px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 10px);
        padding-left: calc(env(safe-area-inset-left, 0px) + 10px);
    }

    .viewer-dialog {
        border-radius: 10px;
    }

    .viewer-header {
        padding: 10px 12px;
    }

    .viewer-content {
        padding: 12px 12px 14px;
    }
}
</style>
