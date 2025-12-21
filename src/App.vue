<script setup lang="ts">
import SteamBrowser from "./components/SteamBrowser.vue";
import LocalGameGenerator from "./components/LocalGameGenerator.vue";
import {ref, Ref} from 'vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import "./main.css";

const selectedPage: Ref<"steam"|"local"> = ref("steam")
</script>

<template>
  <main class="w-screen h-screen flex flex-col gap-2 items-center py-4 pt-8 px-6 overflow-hidden">
    <SteamBrowser v-if="selectedPage === 'steam'" class="flex-1 min-h-0"/>
    <LocalGameGenerator v-if="selectedPage === 'local'" class="flex-1 min-h-0"/>
    <div class="flex flex-row shrink-0 w-full max-w-132 items-center justify-center h-12 bg-base-200 gap-4 rounded-xl border border-base-content/20">
      <button 
        @click="selectedPage = 'steam'"
        :class="selectedPage === 'steam' ? 'bg-accent' : 'bg-transparent text-base-content/50'"
        class="px-3 py-1 rounded-xl text-sm anim-all"
      >Steam Games</button>
      <button
        @click="selectedPage = 'local'"
        :class="selectedPage === 'local' ? 'bg-accent' : 'bg-transparent text-base-content/50'"
        class="px-3 py-1 rounded-xl text-sm anim-all"
      >Local Games</button>
    </div>
    <p class="text-xs text-base-content/30">Made by NaviVani for the emulation community :D</p>
  </main>
  <Toaster />
</template>
