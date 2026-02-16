<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'
import { Toaster, toast } from 'vue-sonner'
import { openUrl } from '@tauri-apps/plugin-opener';
import { onMounted, onUnmounted } from 'vue';
import { popIntentQueueAndExtractText } from 'tauri-plugin-mobile-sharetarget-api'
import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { platform } from '@tauri-apps/plugin-os';
import { mainStore } from '~/states/Main';
import { browserStore } from './states/Browser';
import SharedImporter from '~/components/shared/SharedImporter.vue';
import CreateDialog from "~/components/browser/CreateShortcut.vue";
import Taskbar from '~/components/shared/Taskbar.vue';
import 'vue-sonner/style.css'
import "~/main.css";
import { searchGame } from './utils/SteamApi';

let focusUnlistener: UnlistenFn | undefined
const os = platform()
const store = mainStore()
const bStore = browserStore()

async function getIntentShortcut() {
  const potentialIntent = await popIntentQueueAndExtractText()
  if (!potentialIntent) return
  try {
    const decoded = decodeURIComponent(potentialIntent)
    console.log("user shared:", decoded)
    const url = new URL(decoded)
    if (url.hostname === "steamdb.info") {
      const match = url.pathname.match(/^\/app\/(\d+)/)
      if (match) {
        store.sharedAppId = match[1]
        store.sharedDialogOpen = true
      }
    } else if (url.hostname === "store.steampowered.com") {
      const match = url.pathname.match(/^\/app\/(\d+)/)
      if (match) {
        // we cant get the correct name from the URL, so we search it with the api lol
        const gameData = await searchGame(match[1])
        if (gameData) {
          bStore.selectedItemId = match[1]
          bStore.selectedItemName = gameData[0].name
          bStore.openDialog = true
        } else {
          store.sharedAppId = match[1]
          store.sharedDialogOpen = true
        }
      }
    } else {
      toast.error("This URL is not supported!")
    }
  } catch (e) {
    toast.error("An error ocurred trying to read the shared URL")
    console.log(e)
  }
}

onMounted(async () => {
  if (os === "android") {
    await getIntentShortcut()
    focusUnlistener = await listen(
      os === "android" ? "tauri://focus" : "new-intent",
      async () => {
        await getIntentShortcut()
      }
    )
  }
})

onUnmounted(() => {
  if (focusUnlistener) {
    focusUnlistener()
  }
})
</script>

<template>
<TooltipProvider>
  <main class="w-screen h-screen flex flex-col gap-2 items-center py-4 pt-8 px-2 overflow-hidden">
    <Transition name="slide-up" mode="out-in">
      <RouterView />
    </Transition>
    <Taskbar class="shrink-0" />
    <p class="text-xs text-base-content/30 truncate">
      Made by
      <a @click="openUrl('https://github.com/NaviVani-dev')" class="underline cursor-pointer text-accent">
        NaviVani
      </a>
      for the emulation community :D
    </p>
    <a class="text-xs text-accent  truncate underline cursor-pointer" @click="openUrl('https://ko-fi.com/navivani_dev')">
      Buy me a coffee!
    </a>
  </main>
  <Toaster position="top-center" richColors closeButtonPosition="top-right" />
  <SharedImporter />
  <CreateDialog />
</TooltipProvider>
</template>
