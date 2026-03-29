<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useCreatorApp } from '../../app/context';

const { bubbleBus, layout, settings, shell } = useCreatorApp();

const BUBBLE_SIZE = 48;
const BUBBLE_PADDING = 12;
const FEED_GAP = 12;
const FEED_MAX_WIDTH = 360;

const getDefaultPosition = () => {
    const frame = layout.state.safeFrame;
    return {
        x: Math.max(frame.left + BUBBLE_PADDING, frame.right - BUBBLE_SIZE - BUBBLE_PADDING),
        y: Math.max(frame.top + BUBBLE_PADDING, frame.bottom - BUBBLE_SIZE - BUBBLE_PADDING),
    };
};

const initialPosition = settings.state.bubblePosition ?? getDefaultPosition();

const x = ref(initialPosition.x);
const y = ref(initialPosition.y);
const dragging = ref(false);
const unreadCount = computed(() => bubbleBus.state.unreadCount);

let startX = 0;
let startY = 0;
let initialX = 0;
let initialY = 0;

const clampPosition = () => {
    const frame = layout.state.safeFrame;
    const minX = frame.left + BUBBLE_PADDING;
    const maxX = Math.max(minX, frame.right - BUBBLE_SIZE - BUBBLE_PADDING);
    const minY = frame.top + BUBBLE_PADDING;
    const maxY = Math.max(minY, frame.bottom - BUBBLE_SIZE - BUBBLE_PADDING);

    x.value = Math.max(minX, Math.min(x.value, maxX));
    y.value = Math.max(minY, Math.min(y.value, maxY));
};

const persistPosition = () => {
    settings.setBubblePosition({
        x: x.value,
        y: y.value,
    });
};

watch(
    () => [
        layout.state.safeFrame.left,
        layout.state.safeFrame.top,
        layout.state.safeFrame.right,
        layout.state.safeFrame.bottom,
    ],
    () => {
        if (!settings.state.bubblePosition) {
            const nextPosition = getDefaultPosition();
            x.value = nextPosition.x;
            y.value = nextPosition.y;
            return;
        }

        clampPosition();
    },
    { immediate: true },
);

const handleFeedClick = (tabId?: string) => {
    if (!tabId) {
        return;
    }

    shell.openPanel(tabId);
};

const feedLayout = computed(() => {
    const viewportFrame = layout.state.viewportFrame;
    const safeFrame = layout.state.safeFrame;
    const maxWidth = Math.min(
        FEED_MAX_WIDTH,
        Math.max(0, safeFrame.width - BUBBLE_PADDING * 2),
    );
    const minLeft = safeFrame.left + BUBBLE_PADDING;
    const maxLeft = Math.max(minLeft, safeFrame.right - maxWidth - BUBBLE_PADDING);
    const left = Math.min(
        Math.max(x.value - maxWidth + BUBBLE_SIZE - 6, minLeft),
        maxLeft,
    );
    const availableAbove = Math.max(
        y.value - FEED_GAP - (safeFrame.top + BUBBLE_PADDING),
        0,
    );
    const availableBelow = Math.max(
        safeFrame.bottom - (y.value + BUBBLE_SIZE + FEED_GAP + BUBBLE_PADDING),
        0,
    );
    const useAbove = availableAbove >= 140 || availableAbove >= availableBelow;

    if (maxWidth <= 0) {
        return {
            className: 'below',
            style: {
                display: 'none',
            },
        };
    }

    return {
        className: useAbove ? 'above' : 'below',
        style: useAbove
            ? {
                left: `${left}px`,
                bottom: `${Math.max(0, viewportFrame.bottom - y.value + FEED_GAP)}px`,
                maxWidth: `${maxWidth}px`,
                maxHeight: `${availableAbove}px`,
            }
            : {
                left: `${left}px`,
                top: `${y.value + BUBBLE_SIZE + FEED_GAP}px`,
                maxWidth: `${maxWidth}px`,
                maxHeight: `${availableBelow}px`,
            },
    };
});

const onPointerDown = (event: PointerEvent) => {
    dragging.value = true;
    startX = event.clientX;
    startY = event.clientY;
    initialX = x.value;
    initialY = y.value;

    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
};

const onPointerMove = (event: PointerEvent) => {
    if (!dragging.value) {
        return;
    }

    x.value = initialX + (event.clientX - startX);
    y.value = initialY + (event.clientY - startY);
    clampPosition();
};

const onPointerUp = (event: PointerEvent) => {
    if (!dragging.value) {
        return;
    }

    dragging.value = false;
    const target = event.currentTarget as HTMLElement;
    target.releasePointerCapture(event.pointerId);
    persistPosition();

    if (Math.abs(event.clientX - startX) < 5 && Math.abs(event.clientY - startY) < 5) {
        shell.togglePanel();
    }
};
</script>

<template>
  <div class="floating-bubble-container" :style="{ left: `${x}px`, top: `${y}px` }">
    <div class="feed-stream" :class="feedLayout.className" :style="feedLayout.style">
      <transition-group name="feed-slide">
        <div
          v-for="item in bubbleBus.state.queue"
          :key="item.id"
          class="feed-item"
          :class="[item.level, { clickable: Boolean(item.panelTabId), 'with-chips': Boolean(item.chips?.length) }]"
          @click="handleFeedClick(item.panelTabId)"
        >
          <div class="feed-indicator" :class="item.source"></div>
          <div class="feed-text">
            <div class="feed-title-row">
              <span class="feed-title">{{ item.title }}</span>
              <span v-if="item.repeatCount > 1" class="feed-repeat">x{{ item.repeatCount }}</span>
            </div>
            <span v-if="item.message" class="feed-message">{{ item.message }}</span>
            <div v-if="item.chips?.length" class="feed-chips">
              <span
                v-for="(chip, chipIndex) in item.chips"
                :key="`${item.id}-${chipIndex}-${chip.tone}-${chip.label}`"
                class="feed-chip"
              >
                <span class="feed-chip-dot" :class="chip.tone"></span>
                <span>{{ chip.label }}</span>
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div
      class="bubble-btn"
      @pointerdown.stop.prevent="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <span class="bubble-code-icon">&lt;/&gt;</span>
      <span v-if="unreadCount > 0" class="bubble-badge">{{ unreadCount }}</span>
    </div>
  </div>
</template>

<style scoped>
.floating-bubble-container {
    position: fixed;
    z-index: 99999;
    width: 48px;
    height: 48px;
    pointer-events: none;
}

.feed-stream {
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 8px;
    overflow-y: auto;
    pointer-events: none;
}

.feed-stream.below {
    flex-direction: column;
}

.feed-item {
    width: min(100%, 340px);
    background: var(--ttce-bg-2);
    border: 1px solid var(--ttce-border);
    padding: 8px 12px;
    border-radius: 14px;
    box-shadow: var(--ttce-shadow-floating);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: var(--ttce-text);
    font-size: 13px;
    pointer-events: auto;
}

.feed-item.clickable {
    cursor: pointer;
}

.feed-item.clickable:hover {
    border-color: var(--ttce-border-strong);
    background: var(--ttce-surface-hover);
}

.feed-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.feed-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.feed-title {
    font-weight: 600;
}

.feed-repeat {
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--ttce-chip-strong-bg);
    color: var(--ttce-text);
    font-size: 11px;
    font-weight: 700;
    line-height: 1.4;
}

.feed-message {
    color: var(--ttce-text-muted);
    font-size: 12px;
    line-height: 1.35;
}

.feed-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.feed-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--ttce-chip-bg);
    color: var(--ttce-text);
    font-size: 11px;
    line-height: 1.4;
}

.feed-chip-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ttce-dot-neutral);
    flex-shrink: 0;
}

.feed-chip-dot.world-info {
    background: var(--ttce-accent-green);
}

.feed-chip-dot.world-info-constant {
    background: var(--ttce-accent-blue);
}

.feed-chip-dot.neutral {
    background: var(--ttce-dot-neutral);
}

.feed-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ttce-indicator-neutral);
    margin-top: 5px;
    flex-shrink: 0;
}

.feed-indicator.world-info {
    background: var(--ttce-accent-green);
}

.feed-indicator.world-info-constant {
    background: var(--ttce-accent-blue);
}

.feed-item.warn {
    border-color: var(--ttce-accent-amber);
}

.feed-indicator.frontend-log,
.feed-item.error {
    border-color: var(--ttce-accent-red);
}

.feed-indicator.backend-log {
    background: var(--ttce-accent-amber);
}

.feed-slide-enter-active,
.feed-slide-leave-active {
    transition: all 0.3s ease;
}

.feed-slide-enter-from {
    opacity: 0;
    transform: translateY(15px) scale(0.9);
}

.feed-slide-leave-to {
    opacity: 0;
    transform: translateY(-15px) scale(0.9);
}

.bubble-btn {
    width: 48px;
    height: 48px;
    background: var(--ttce-bubble-button-bg);
    color: var(--ttce-bubble-button-text);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: var(--ttce-shadow-floating);
    pointer-events: auto;
    touch-action: none;
    transition: transform 0.1s ease, box-shadow 0.2s ease;
    position: relative;
}

.bubble-btn:hover {
    transform: scale(1.05);
    background: var(--ttce-bubble-button-hover);
    box-shadow: var(--ttce-shadow-floating);
}

.bubble-btn:active {
    transform: scale(0.95);
    background: var(--ttce-bubble-button-active);
}

.bubble-code-icon {
    font-family: var(--ttce-font-mono);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.08em;
    transform: translateY(-1px);
}

.bubble-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 999px;
    background: var(--ttce-accent-red);
    color: var(--ttce-on-accent);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}
</style>
