<template>
  <div class="anim-all flex w-full flex-col sm:flex-row bg-base-200 border border-base-content/20 p-4 rounded-lg items-center justify-between gap-2 relative">
    <div class="flex flex-col sm:flex-row gap-2 items-center">
      <AvatarRoot class="w-57.75 h-21.75 sm:w-[161.7px] sm:h-[60.9px] rounded-lg border border-base-content/20">
         <AvatarImage
          class="w-full h-full object-cover rounded-[inherit]"
          :src="capsuleUrl!"
          :alt="item.name"
        />
        <AvatarFallback class="w-full h-full rounded-[inherit]">
          <div class="w-full h-full shrink-0 flex items-center justify-center bg-base-200 rounded-[inherit]">
            <ExternalLink :size="48" class="scale-100 sm:scale-60 mb-1 ml-1" />
          </div>
        </AvatarFallback>
      </AvatarRoot>
      <div class="flex flex-col gap-1 items-center sm:items-start">
        <div class="flex flex-row flex-1 gap-1 items-center">
          <TooltipRoot>
            <TooltipTrigger>
              <SteamIcon v-if="item.folder == 'Steam'" class="text-xs"/>
              <Gamepad2 v-if="item.folder == 'Local'" :size="14" />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent class="bg-base-200 border border-base-content/20 rounded-lg py-0.5 px-1 text-sm">
                {{item.folder}} Folder
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
          <p class="truncate text-center sm:text-start">{{item.name}}</p>
        </div>

        <p @click="openShortcutFolder" class="text-xs truncate text-base-content/50 underline cursor-pointer">{{item.name}}.{{item.type}}</p>
      </div>
    </div>
    <ItemDropdown :item="item" />
  </div>
</template>

<script setup lang="ts">
import { ExternalLink, Gamepad2 } from 'lucide-vue-next'
import { LibraryItem } from '~/types/Library';
import { fetch } from "@tauri-apps/plugin-http";
import {ref, Ref, onMounted} from 'vue'
import { AvatarImage, AvatarRoot, AvatarFallback, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'
import SteamIcon from '~/components/shared/SteamIcon.vue';
import ItemDropdown from "~/components/library/ItemDropdown.vue";
import { platform } from '@tauri-apps/plugin-os';
import { openPath } from '@tauri-apps/plugin-opener';
import { AndroidFs } from "tauri-plugin-android-fs-api"
import { dirname } from '@tauri-apps/api/path';

const p =defineProps<{
  item: LibraryItem
}>();

const capsuleUrl: Ref<string> = ref('')

async function openShortcutFolder(){
  const path = p.item.path
  if (platform() == "android") {
    if (typeof path != "string") AndroidFs.showViewDirDialog(path)
  } else {
    if (typeof path == "string") await openPath(await dirname(path))
  }
}

async function getItemCapsule() {
  try {
    if (p.item.type.includes("localgameid")) {
      capsuleUrl.value = ''
      return
    }
    const fetchUrl = `https://store.steampowered.com/search/suggest?cc=US&l=english&realm=1&origin=https:%2F%2Fstore.steampowered.com&f=jsonfull&term=${p.item.id}`
    const response = await fetch(fetchUrl, {
      method: 'GET',
    });
    if (response.status === 200) {
      const data = await response.json()
      capsuleUrl.value = data[0].small_cap
    }
  } catch (e) {
    capsuleUrl.value = ''
    console.log(e)
  }
}

onMounted(()=> {
  getItemCapsule()
})
</script>
