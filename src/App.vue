<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'
import { Toaster } from 'vue-sonner'
import { openUrl } from '@tauri-apps/plugin-opener';
import Taskbar from '~/components/shared/Taskbar.vue';
import 'vue-sonner/style.css'
import "~/main.css";
</script>

<template>
<TooltipProvider>
  <main class="w-screen h-screen flex flex-col gap-2 items-center py-4 pt-8 px-2 overflow-hidden">
    <Transition name="slide-up" mode="out-in">
      <RouterView />
    </Transition>
    <Taskbar />
    <p class="text-xs text-base-content/30 truncate">Made by <a @click="openUrl('https://github.com/NaviVani-dev')" class="underline">NaviVani</a> for the emulation community :D</p>
  </main>
  <Toaster position="top-center" richColors closeButtonPosition="top-right" />
</TooltipProvider>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.1s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
