<template>
<div class="w-full flex flex-row place-items-center">
  <div class="flex flex-col flex-2 min-w-0" v-if="config">
    <p class="text-sm"><SteamIcon /> Steam Shortcuts Folder</p>
    <p class="text-xs text-base-content/50 truncate">Folder: {{currentValue == '' ? 'Not set' : typeof currentValue == "string"? currentValue : currentValue.uri}}</p>
  </div>

  <div class="flex-1 flex flex-row gap-1">
    <button v-if="currentValue != ''" @click="restartFolder" class="anim-all cursor-pointer w-10 border border-base-content/20 bg-base-200 hover:bg-base-300 rounded-lg flex flex-row items-center justify-center p-1 gap-2">
      <RotateCcw :size="10" />
    </button>
    <button @click="setFolder" class="anim-all cursor-pointer w-full h-10 border border-base-content/20 bg-base-200 hover:bg-base-300 rounded-lg flex flex-row items-center justify-center px-2 gap-2">
      <p class="text-sm truncate">Set Folder</p>
    </button>
  </div>
  <div v-if="!config" class="w-full h-14 bg-base-300 rounded-lg animate-pulse" />
</div>
</template>

<script setup lang="ts">
import { getConfig, changeConfig } from '~/utils/SettingsManager';
import { setLibraryFolder } from '~/utils/ShortcutsLibrary';
import { AndroidFsUri } from 'tauri-plugin-android-fs-api'
import SteamIcon from '~/components/shared/SteamIcon.vue';
import { AppSettings } from '~/types/Settings';
import { ref, Ref, onMounted } from 'vue'
import { RotateCcw } from 'lucide-vue-next'

const config : Ref<AppSettings|undefined> = ref()
const currentValue: Ref<string|AndroidFsUri> = ref("")

onMounted(async ()=> {
  config.value = await getConfig()
  if (config.value?.steamfolder) {
    currentValue.value = config.value.steamfolder
  }
})

async function setFolder() {
  const allOk = await setLibraryFolder('steam')
  if (allOk) {
    getFolder()
  }
}

async function restartFolder() {
  const allOk = await changeConfig({steamfolder: undefined})
  console.log(allOk)
  if (allOk) {
    getFolder()
  }
}

async function getFolder() {
  const conf = await getConfig()
  if (conf?.steamfolder) currentValue.value = conf.steamfolder
  else currentValue.value = ''
}
</script>
