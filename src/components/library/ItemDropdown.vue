<template>
<DropdownMenuRoot v-model:open="dropdownOpen">
  <DropdownMenuTrigger class="anim-all w-6 h-6 bg-base-200 hover:bg-base-300 border border-base-content/20 rounded-md flex items-center justify-center absolute top-1 right-1 sm:static cursor-pointer">
    <Ellipsis :size="12"/>
  </DropdownMenuTrigger>
  <DropdownMenuPortal>
    <DropdownMenuContent class="border border-base-content/20 bg-base-200 rounded-lg text-sm w-54 overflow-hidden">
      <DropdownMenuItem
        v-if="item.type != 'localgameid'"
        @select="openSteamPage"
        class="bg-base-200 hover:bg-base-300 anim-all cursor-pointer p-4 flex flex-row items-center gap-2"
      >
        <SteamIcon/>
        <p>Open Steam Page</p>
      </DropdownMenuItem>
      <DropdownMenuItem
        @select="deleteMe"
        class="bg-base-200 anim-all cursor-pointer p-4 flex flex-row items-center gap-2 text-error hover:bg-error hover:text-error-content"
      >
        <Trash :size="14" />
        <p>Delete Shortcut</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</DropdownMenuRoot>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { Ellipsis, Trash } from "lucide-vue-next"
import { LibraryItem } from '~/types/Library';
import { openUrl } from '@tauri-apps/plugin-opener';
import { deleteShortcut } from '~/utils/GenerateShortcut';
import { libraryStore } from "~/states/Library";
import SteamIcon from '~/components/shared/SteamIcon.vue';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

const lib = libraryStore()
const dropdownOpen: Ref<boolean> = ref(false)
const p = defineProps<{
  item: LibraryItem
}>();

async function openSteamPage() {
  const baseUrl = `https://store.steampowered.com/app/${p.item.id}`
  await openUrl(baseUrl)
}

async function deleteMe() {
  await deleteShortcut(p.item.path)
  lib.refreshLibrary()
}
</script>
