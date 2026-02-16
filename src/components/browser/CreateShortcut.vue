<template>
  <DialogRoot v-model:open="store.openDialog">
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" />
      </Transition>
      <Transition name="scale">
        <DialogContent class="dialog-card">
          <DialogClose class="p-1.5 border border-base-content/20 bg-base-200 hover:bg-base-300 active:bg-base-200 active:scale-95 rounded-lg fixed top-5 right-5 cursor-pointer" ><X :size="14"/></DialogClose>
          <DialogTitle>{{store.selectedItemName}}</DialogTitle>
          <DialogDescription v-if="gameData?.strDescription" class="text-xs text-base-content/50 pb-2">{{ gameData.strDescription }}</DialogDescription>
          <div v-if="gameData" class="flex fl ex-row gap-2 w-full rounded-md overflow-x-scroll px-4 pb-4">
              <img
                v-for="screenshot,index in gameData.rgScreenshots"
                :key="index"
                :src="imagesBaseUrl + store.selectedItemId + '/' + screenshot.filename"
                class="w-auto h-[60vh] max-h-44 object-cover rounded-xl border border-base-content/20"
              />
          </div>
          <div v-if="!gameData" class="animate-pulse bg-base-300 rounded-xl w-full h-3 mt-1" />
          <div v-if="!gameData" class="animate-pulse bg-base-300 rounded-xl w-full h-3 my-1" />
          <div v-if="!gameData" class="animate-pulse bg-base-300 rounded-xl w-full h-42 mb-2" />

          <div class="anim-all w-full rounded-full bg-accent hover:bg-accent/80 active:scale-95  text-accent-content flex flex-row mt-2">
            <button @click="generateSteamappidFile()" class="py-2 flex-1 cursor-pointer">Generate Shortcut</button>
            <!-- <div class="w-px bg-base-200" /> too tired to add this feature, maybe later
            <button class="py-2 w-14 flex items-center justify-center focus:outline-0"><FileCog :size="20" /></button> -->
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { browserStore } from '~/states/Browser';
import {ref, Ref, watch} from 'vue'
import { X } from 'lucide-vue-next'
import { generateShortcut } from '~/utils/GenerateShortcut'
import { getConfig } from '~/utils/SettingsManager';
import { SteamGameDetails } from '~/types/GameDetails';
import { fetchGameData } from '~/utils/SteamApi';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogRoot
} from 'reka-ui'


const store = browserStore()
const gameData: Ref<SteamGameDetails|undefined> = ref()
const imagesBaseUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/`

watch(() => store.openDialog, ()=> {
  if (store.openDialog && store.selectedItemId) {
    fetchData()
  }
})

const generateSteamappidFile = async (forceType?: "steamappid"|"steam") => {
  const config = await getConfig()
  const stidContent = `# Daijishou Player Template\n[steamappid] ${store.selectedItemId}`
  const stContent = store.selectedItemId
  const format = forceType ?? config?.steamShortcutFormat ?? "steamappid"
  const content = format == "steamappid" ? stidContent : stContent
  const filename = `${store.selectedItemName}.${format}`
  const everythingOk = await generateShortcut(filename, content, config?.steamfolder)
  if (everythingOk) store.openDialog = false
}

const fetchData = async () => {
  if (store.selectedItemId === null) return
  gameData.value = undefined
  const data = await fetchGameData(store.selectedItemId)
  if (data) gameData.value = data
}
</script>
