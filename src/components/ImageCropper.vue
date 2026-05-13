<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { I18nContext } from '../i18n';
import type { CreatorAppearanceMode } from '../app/appearance';

const props = defineProps<{
    imageUrl: string;
    i18n: I18nContext;
    appearanceMode: CreatorAppearanceMode;
}>();

const emit = defineEmits<{
    'crop': [base64: string];
    'cancel': [];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const image = new Image();
const scale = ref(1);
const position = ref({ x: 0, y: 0 });
let isDragging = false;
let lastPointer = { x: 0, y: 0 };
let imgWidth = 0;
let imgHeight = 0;

// Fixed constants — never dynamically calculated
const CANVAS_SIZE = 300;
const CROP_SIZE = 240;

const draw = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = CANVAS_SIZE;
    const H = CANVAS_SIZE;

    ctx.clearRect(0, 0, W, H);

    // Draw checkerboard transparency pattern
    const tileSize = 10;
    for (let y = 0; y < H; y += tileSize) {
        for (let x = 0; x < W; x += tileSize) {
            ctx.fillStyle = ((x / tileSize + y / tileSize) % 2 === 0) ? '#cccccc' : '#ffffff';
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.translate(position.value.x, position.value.y);
    ctx.scale(scale.value, scale.value);
    ctx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();

    // Draw mask — semi-transparent outside the circle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.arc(W / 2, H / 2, CROP_SIZE / 2, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw circle border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, CROP_SIZE / 2, 0, Math.PI * 2);
    ctx.stroke();
};

const initImage = () => {
    image.src = props.imageUrl;
    image.onload = () => {
        imgWidth = image.width;
        imgHeight = image.height;

        // Scale to cover the crop circle
        const scaleX = CROP_SIZE / imgWidth;
        const scaleY = CROP_SIZE / imgHeight;
        scale.value = Math.max(scaleX, scaleY);
        position.value = { x: 0, y: 0 };
        draw();
    };
};

const clampPositionAndScale = () => {
    const minScaleX = CROP_SIZE / imgWidth;
    const minScaleY = CROP_SIZE / imgHeight;
    const minScale = Math.max(minScaleX, minScaleY);

    if (scale.value < minScale) {
        scale.value = minScale;
    }

    const maxDx = (imgWidth * scale.value - CROP_SIZE) / 2;
    const maxDy = (imgHeight * scale.value - CROP_SIZE) / 2;

    if (position.value.x > maxDx) position.value.x = maxDx;
    if (position.value.x < -maxDx) position.value.x = -maxDx;

    if (position.value.y > maxDy) position.value.y = maxDy;
    if (position.value.y < -maxDy) position.value.y = -maxDy;
};

watch(() => props.imageUrl, initImage);
watch(scale, () => {
    clampPositionAndScale();
    draw();
});

onMounted(() => {
    initImage();
});

const activePointers = new Map<number, {x: number, y: number}>();
let initialPinchDistance = 0;
let initialPinchScale = 1;

const getPinchDistance = () => {
    const pts = Array.from(activePointers.values());
    if (pts.length < 2) return 0;
    const dx = pts[0].x - pts[1].x;
    const dy = pts[0].y - pts[1].y;
    return Math.sqrt(dx * dx + dy * dy);
};

const onPointerDown = (e: PointerEvent) => {
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (activePointers.size === 1) {
        isDragging = true;
        lastPointer = { x: e.clientX, y: e.clientY };
    } else if (activePointers.size === 2) {
        isDragging = false;
        initialPinchDistance = getPinchDistance();
        initialPinchScale = scale.value;
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
    if (!activePointers.has(e.pointerId)) return;
    activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.size === 1 && isDragging) {
        const dx = e.clientX - lastPointer.x;
        const dy = e.clientY - lastPointer.y;
        position.value.x += dx / scale.value;
        position.value.y += dy / scale.value;
        lastPointer = { x: e.clientX, y: e.clientY };
        clampPositionAndScale();
        draw();
    } else if (activePointers.size === 2) {
        const currentDistance = getPinchDistance();
        if (initialPinchDistance > 0) {
            scale.value = initialPinchScale * (currentDistance / initialPinchDistance);
            if (scale.value < 0.1) scale.value = 0.1;
            if (scale.value > 10) scale.value = 10;
            clampPositionAndScale();
        }
    }
};

const onPointerUp = (e: PointerEvent) => {
    activePointers.delete(e.pointerId);
    if (activePointers.size < 2) {
        initialPinchDistance = 0;
    }
    if (activePointers.size === 1) {
        isDragging = true;
        const remaining = Array.from(activePointers.values())[0];
        lastPointer = { x: remaining.x, y: remaining.y };
    } else if (activePointers.size === 0) {
        isDragging = false;
    }
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
};

const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 0.05;
    if (e.deltaY < 0) {
        scale.value *= (1 + zoomIntensity);
    } else {
        scale.value /= (1 + zoomIntensity);
    }
    clampPositionAndScale();
};

const confirmCrop = () => {
    const outCanvas = document.createElement('canvas');
    outCanvas.width = 128;
    outCanvas.height = 128;
    const ctx = outCanvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(outCanvas.width / 2, outCanvas.height / 2);
    const scaleFactor = outCanvas.width / CROP_SIZE;
    ctx.translate(position.value.x * scaleFactor, position.value.y * scaleFactor);
    ctx.scale(scale.value * scaleFactor, scale.value * scaleFactor);
    ctx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    ctx.restore();

    emit('crop', outCanvas.toDataURL('image/png'));
};
</script>

<template>
  <Teleport to="body">
    <div class="cropper-root">
      <div class="cropper-overlay" @click="emit('cancel')"></div>
      <div
        class="cropper-modal ttce-theme-root"
        :data-ttce-appearance="props.appearanceMode"
      >
        <header class="cropper-header">
          <h3>{{ props.i18n.t('settings.uploadIcon') }}</h3>
          <button class="btn-close" @click="emit('cancel')">×</button>
        </header>
        <div class="canvas-container">
          <canvas
            ref="canvasRef"
            :width="CANVAS_SIZE"
            :height="CANVAS_SIZE"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
            @wheel.prevent="onWheel"
          ></canvas>
        </div>
        <div class="controls">
          <span class="icon">🔍-</span>
          <input type="range" min="0.1" max="5" step="0.01" v-model.number="scale" class="scale-slider" />
          <span class="icon">🔍+</span>
        </div>
        <footer class="cropper-footer">
          <button class="btn-cancel" @click="emit('cancel')">{{ props.i18n.t('common.close') }}</button>
          <button class="btn-confirm" @click="confirmCrop">{{ props.i18n.t('llmApi.apply') }}</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.cropper-root {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    pointer-events: none;
}

.cropper-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
}

.cropper-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    background-color: var(--ttce-bg-1);
    opacity: 1 !important;
    border: 1px solid var(--ttce-border);
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 90vw;
    max-width: 320px;
    max-height: 90vh;
    color: var(--ttce-text);
}

.cropper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--ttce-border);
    flex-shrink: 0;
}

.cropper-header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
}

.btn-close {
    background: transparent;
    border: none;
    color: var(--ttce-text-muted);
    font-size: 20px;
    cursor: pointer;
    line-height: 1;
}

.canvas-container {
    background: var(--ttce-bg-0);
    display: flex;
    justify-content: center;
    align-items: center;
    touch-action: none;
    flex-shrink: 0;
}

canvas {
    cursor: grab;
    display: block;
    max-width: 100%;
    height: auto;
}
canvas:active {
    cursor: grabbing;
}

.controls {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.scale-slider {
    flex: 1;
    cursor: pointer;
}

.icon {
    font-size: 14px;
    color: var(--ttce-text-muted);
    user-select: none;
}

.cropper-footer {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    background: var(--ttce-bg-0);
    border-top: 1px solid var(--ttce-border);
    flex-shrink: 0;
}

.cropper-footer button {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
}

.cropper-footer button:hover {
    opacity: 0.9;
}

.btn-cancel {
    background: transparent;
    color: var(--ttce-text);
    border: 1px solid var(--ttce-border);
}

.btn-confirm {
    background: var(--ttce-accent-blue);
    color: white;
}
</style>
