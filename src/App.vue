<script setup lang="ts">
import GamesLibrary from "~/components/library/Main.vue";
import SteamBrowser from "~/components/browser/Main.vue";
import LocalGameGenerator from "~/components/local/Main.vue";
import ManualEditor from "~/components/editor/Main.vue";
import Settings from "~/components/settings/Main.vue"
import SteamIcon from "~/components/shared/SteamIcon.vue";
import { mainStore } from "~/states/Main";
import { TooltipProvider } from 'reka-ui'
import { Toaster } from 'vue-sonner'
import { Library, Gamepad2, SquarePen, Bolt } from 'lucide-vue-next'
import { openUrl } from '@tauri-apps/plugin-opener';
import 'vue-sonner/style.css'
import "~/main.css";

const store = mainStore()
</script>

<template>
<TooltipProvider>
  <main class="w-screen h-screen flex flex-col gap-2 items-center py-4 pt-8 px-2 overflow-hidden">
    <Transition name="slide-up" mode="out-in">
      <GamesLibrary v-if="store.activeTab == 'library'" class="flex-1 min-h-0" />
      <SteamBrowser v-else-if="store.activeTab == 'steam'" class="flex-1 min-h-0"/>
      <LocalGameGenerator v-else-if="store.activeTab == 'local'" class="flex-1 min-h-0"/>
      <ManualEditor v-else-if="store.activeTab == 'editor'" class="flex-1 min-h-0"/>
      <Settings v-else-if="store.activeTab == 'settings'" class="flex-1 min-h-0"/>
    </Transition>

    <div class="flex flex-row shrink-0 w-full max-w-182 items-center justify-center overflow-hidden px-1 py-2 gap-2 h-12 bg-base-200 rounded-xl border border-base-content/20">
      <button
        @click="store.activeTab = 'library'"
        :class="store.activeTab == 'library' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
        class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
      >
        <Library :size="16" />
        <p class="anim-all" :class="store.activeTab == 'library' ? 'text-xs' : 'text-[0px] -m-0.5'">Library</p>
      </button>

      <button
        @click="store.activeTab = 'steam'"
        :class="store.activeTab == 'steam' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
        class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
      >
        <SteamIcon />
        <p class="anim-all" :class="store.activeTab == 'steam' ? 'text-xs' : 'text-[0px] -m-0.5'">Add Steam Games</p>
      </button>

      <button
        @click="store.activeTab = 'local'"
        :class="store.activeTab == 'local' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
        class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
      >
        <Gamepad2 :size="16" />
        <p class="anim-all" :class="store.activeTab == 'local' ? 'text-xs' : 'text-[0px] -m-0.5'">Add Local Games</p>
      </button>

      <button
        @click="store.activeTab = 'editor'"
        :class="store.activeTab == 'editor' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
        class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
      >
        <SquarePen :size="16" />
        <p class="anim-all" :class="store.activeTab == 'editor' ? 'text-xs' : 'text-[0px] -m-0.5'">Manual Editor</p>
      </button>

      <button
        @click="store.activeTab = 'settings'"
        :class="store.activeTab == 'settings' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
        class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
      >
        <Bolt :size="16" />
        <p class="anim-all" :class="store.activeTab == 'settings' ? 'text-xs' : 'text-[0px] -m-0.5'">Settings</p>
      </button>
    </div>
    <p class="text-xs text-base-content/30 truncate">Made by <a @click="openUrl('https://github.com/NaviVani-dev')" class="underline">NaviVani</a> for the emulation community :D</p>
  </main>
  <Toaster position="bottom-center" theme="dark" closeButtonPosition="top-right" />
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
