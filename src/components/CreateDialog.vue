<template>
  <dialog id="createDialog" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"><X/></button>
      </form>
      <a :href="`https://store.steampowered.com/app/${store.selectedItemId}`" class="text-lg font-bold">{{ store.selectedItemName }}</a>
      <p v-if="gameData !== undefined" class="text-xs text-base-content/50 pb-2">{{ gameData.strDescription }}</p>
      <div v-if="gameData !== undefined" class="carousel w-full rounded-md">
        <div 
          :id="'preview'+index.toString()"
          v-for="screenshot,index in gameData.rgScreenshots"
          :key="index"
          class="carousel-item relative w-full items-center justify-center"
        >
          <img :src="imagesBaseUrl + store.selectedItemId + '/' + screenshot.filename" class="w-auto h-[60vh] max-h-44 object-cover" />
          <div v-if="gameData.rgScreenshots.length > 1" class="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a 
              :href="'#preview' + (index === 0 ? gameData.rgScreenshots.length - 1 : index - 1)" 
              class="btn btn-circle "
            ><ChevronLeft/></a>

            <a 
              :href="'#preview' + (index === gameData.rgScreenshots.length - 1 ? 0 : index + 1)" 
              class="btn btn-circle"
            ><ChevronRight/></a>
          </div>
        </div>
      </div>

      <div v-if="gameData === undefined" class="skeleton w-full h-3 mt-1" />
      <div v-if="gameData === undefined" class="skeleton w-full h-3 my-1" />
      <div v-if="gameData === undefined" class="skeleton w-full h-44 mb-2" />

      <button @click="generateSteamappidFile" class="btn btn-accent w-full">Create shortcut</button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { selectedStore } from '../states/SelectedGame';
import { fetch } from "@tauri-apps/plugin-http";
import {ref, Ref, watch} from 'vue'
import {ChevronLeft, ChevronRight, X} from 'lucide-vue-next'
import { generateShortcut } from '../utils/GenerateShortcut'
import { SteamGameDetails } from '../types/GameDetails';

const store = selectedStore()
const gameData: Ref<SteamGameDetails|undefined> = ref()
const imagesBaseUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/`

watch(() => store.selectedItemId, ()=> {
  fetchGameData()
})

const generateSteamappidFile = () => {
  generateShortcut(store.selectedItemName, "steamappid", store.selectedItemId)
  const modal = document.getElementById('createDialog') as HTMLDialogElement
  modal.close()
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