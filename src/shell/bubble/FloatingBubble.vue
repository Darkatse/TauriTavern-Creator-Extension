<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useCreatorApp } from '../../app/context';

const { bubbleBus, layout, settings, shell } = useCreatorApp();

// 仅在触屏设备（手机/平板）上启用自动吸边，桌面端保持原版行为
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const BUBBLE_SIZE = isTouchDevice ? 40 : 48;
const BUBBLE_PADDING = 12;
const FEED_GAP = 12;
const FEED_MAX_WIDTH = 360;
const IDLE_TIMEOUT = 1000;
const DOCK_VISIBLE = 15;

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
const docked = ref(false);
const unreadCount = computed(() => bubbleBus.state.unreadCount);

// 吸边前的真实位置
let realX = x.value;
let realY = y.value;

let startX = 0;
let startY = 0;
let initialX = 0;
let initialY = 0;
let idleTimer: ReturnType<typeof setTimeout> | null = null;

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
        x: realX,
        y: realY,
    });
};

// === 吸边逻辑（仅触屏设备） ===
const resetIdleTimer = () => {
    if (!isTouchDevice) return;
    if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
    }
    if (dragging.value || shell.state.panelOpen) return;
    idleTimer = setTimeout(() => {
        if (!dragging.value && !shell.state.panelOpen) {
            dockBubble();
        }
    }, IDLE_TIMEOUT);
};

let dockedSide: 'left' | 'right' = 'right';

const dockBubble = () => {
    if (docked.value) return;
    const frame = layout.state.safeFrame;
    if (frame.width <= 0) return;

    realX = x.value;
    realY = y.value;

    const bubbleCenterX = realX + BUBBLE_SIZE / 2;
    const distToLeft = bubbleCenterX - frame.left;
    const distToRight = frame.right - bubbleCenterX;

    if (distToLeft <= distToRight) {
        x.value = frame.left - BUBBLE_SIZE + DOCK_VISIBLE;
        dockedSide = 'left';
    } else {
        x.value = frame.right - DOCK_VISIBLE;
        dockedSide = 'right';
    }
    docked.value = true;
};

const undockBubble = () => {
    if (!docked.value) return;
    const frame = layout.state.safeFrame;

    // 滑到同侧边缘刚好完整露出，不回到原位（避免跑到屏幕中间）
    if (dockedSide === 'left') {
        x.value = frame.left + BUBBLE_PADDING;
    } else {
        x.value = frame.right - BUBBLE_SIZE - BUBBLE_PADDING;
    }
    // y 保持不变（已经是正确的）
    docked.value = false;
    resetIdleTimer();
};
// === 吸边逻辑结束 ===

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
            realX = x.value;
            realY = y.value;
            return;
        }

        if (!docked.value) {
            clampPosition();
            realX = x.value;
            realY = y.value;
        }
    },
    { immediate: true },
);

watch(() => shell.state.panelOpen, (open) => {
    if (open) {
        if (docked.value) undockBubble();
        if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
    } else {
        resetIdleTimer();
    }
});

// 有新通知时，自动弹出悬浮球，让弹窗在正确位置显示
watch(() => bubbleBus.state.queue.length, (newLen, oldLen) => {
    if (newLen > (oldLen ?? 0) && docked.value) {
        undockBubble();
    }
});

onMounted(() => {
    resetIdleTimer();
});

onUnmounted(() => {
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
});

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
    if (docked.value) undockBubble();

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

    realX = x.value;
    realY = y.value;
    persistPosition();
    resetIdleTimer();

    if (Math.abs(event.clientX - startX) < 5 && Math.abs(event.clientY - startY) < 5) {
        shell.togglePanel();
    }
};

const onBubbleEnter = () => {
    if (docked.value) undockBubble();
    else resetIdleTimer();
};

const onBubbleLeave = () => {
    resetIdleTimer();
};

const customIconStyle = computed(() => {
    const icon = settings.state.customBubbleIcon;
    if (!icon) return {};
    return {
        backgroundImage: `url(${icon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
});
</script>

<template>
  <div class="floating-bubble-container" :class="{ 'is-docked': docked, 'is-dragging': dragging, 'is-mobile': isTouchDevice }" :style="{ left: `${x}px`, top: `${y}px` }">
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
      :class="{ 'is-transparent': settings.state.customBubbleBgTransparent && settings.state.customBubbleIcon }"
      :style="customIconStyle"
      @pointerdown.stop.prevent="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @mouseenter="onBubbleEnter"
      @mouseleave="onBubbleLeave"
    >
      <span class="bubble-code-icon" v-if="!settings.state.customBubbleIcon">&lt;/&gt;</span>
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
    transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.35s ease;
}

.floating-bubble-container.is-mobile {
    width: 40px;
    height: 40px;
}

.floating-bubble-container.is-dragging {
    transition: none;
}

.floating-bubble-container.is-docked {
    opacity: 0.35;
}

.floating-bubble-container.is-docked:hover {
    opacity: 1;
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
    width: 100%;
    height: 100%;
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

.bubble-btn.is-transparent {
    background-color: transparent !important;
    box-shadow: none !important;
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
