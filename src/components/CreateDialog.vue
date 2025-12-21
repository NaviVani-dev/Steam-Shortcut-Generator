<template>
  <dialog v-if="store.openDialog" class="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center">
    <div class="bg-base-200 text-base-content w-screen h-min max-w-142 max-h-112 rounded-xl border border-base-content/20 p-6 relative">
      <button @click="store.openDialog = false" class="absolute right-6 top-6 w-4 h-4 focus:outline-0"><X/></button>
      <a class="text-lg font-bold">{{ store.selectedItemName }}</a>
      <p v-if="gameData !== undefined" class="text-xs text-base-content/50 pb-2">{{ gameData.strDescription }}</p>
      <div v-if="gameData !== undefined" class="flex flex-row gap-2 w-full rounded-md overflow-x-scroll px-4 pb-4">
          <img
            v-for="screenshot,index in gameData.rgScreenshots"
            :key="index"
            :src="imagesBaseUrl + store.selectedItemId + '/' + screenshot.filename"
            class="w-auto h-[60vh] max-h-44 object-cover rounded-xl border border-base-content/20"
          />
      </div>

      <div v-if="gameData === undefined" class="animate-pulse bg-base-300 rounded-xl w-full h-3 mt-1" />
      <div v-if="gameData === undefined" class="animate-pulse bg-base-300 rounded-xl w-full h-3 my-1" />
      <div v-if="gameData === undefined" class="animate-pulse bg-base-300 rounded-xl w-full h-42 mb-2" />

      <button @click="generateSteamappidFile" class="bg-accent py-2 rounded-xl w-full focus:outline-0 mt-2">Create shortcut</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { selectedStore } from '../states/SelectedGame';
import { fetch } from "@tauri-apps/plugin-http";
import {ref, Ref, watch} from 'vue'
import {X} from 'lucide-vue-next'
import { generateShortcut } from '../utils/GenerateShortcut'
import { SteamGameDetails } from '../types/GameDetails';

const store = selectedStore()
const gameData: Ref<SteamGameDetails|undefined> = ref()
const imagesBaseUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/`

watch(() => store.selectedItemId, ()=> {
  fetchGameData()
})

const generateSteamappidFile = () => {
  generateShortcut(store.selectedItemName, "steamappid", store.selectedItemId, "steamappid")
  store.openDialog = false
}
  
const fetchGameData = async () => {
  if (store.selectedItemId === null) return
  gameData.value = undefined
  const fetchUrl = `https://store.steampowered.com/apphoverpublic/${store.selectedItemId}/?l=english&json=1`
  const response = await fetch(fetchUrl, {
    method: 'GET',
  });
  if (response.status === 200) {
    gameData.value = await response.json()
  }
}
</script>