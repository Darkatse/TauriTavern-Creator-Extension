<script setup lang="ts">
import { computed } from 'vue';
import FloatingBubble from './shell/bubble/FloatingBubble.vue';
import MainPanel from './shell/panel/MainPanel.vue';
import { useCreatorApp } from './app/context';

const { layout, shell } = useCreatorApp();
const isPanelOpen = computed(() => shell.state.panelOpen);
const shellLayoutVars = computed(() => ({
    '--ttce-viewport-left': `${layout.state.viewportFrame.left}px`,
    '--ttce-viewport-top': `${layout.state.viewportFrame.top}px`,
    '--ttce-viewport-width': `${layout.state.viewportFrame.width}px`,
    '--ttce-viewport-height': `${layout.state.viewportFrame.height}px`,
    '--ttce-safe-inset-top': `${layout.state.safeInsets.top}px`,
    '--ttce-safe-inset-right': `${layout.state.safeInsets.right}px`,
    '--ttce-safe-inset-bottom': `${layout.state.safeInsets.bottom}px`,
    '--ttce-safe-inset-left': `${layout.state.safeInsets.left}px`,
}));
</script>

<template>
  <div class="ttce-shell-root" :style="shellLayoutVars">
    <FloatingBubble />
    <Transition name="fade">
        <MainPanel v-if="isPanelOpen" />
    </Transition>
  </div>
</template>

<style>
.ttce-shell-root {
  position: static;
}

/* Global CSS injected into the host via Vite */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
