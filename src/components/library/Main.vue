<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-182 flex-1 flex flex-col gap-2 p-6 bg-base-200 rounded-xl border border-base-content/20 overflow-x-scroll">

      <div class="flex flex-row items-center justify-between">
        <p class="text-lg font-bold">Library</p>
        <div class="flex flex-row-reverse">
          <button @click="lib.refreshLibrary" class="anim-all cursor-pointer bg-base-200 hover:bg-base-300 p-2 rounded-lg border border-base-content/20"><RotateCcw :size="16"/></button>
        </div>
      </div>

      <LibraryItemComponent v-for="item in lib.library" :item="item" :key="item.id" />
      <div v-if="lib.library && lib.library.length === 0" class="w-full h-full flex flex-col items-center justify-center">
        <ExternalLink :size="112" class="opacity-50"/>
        <p class="text-lg text-base-content/50 text-center">Your library is empty!</p>
        <p class="text-sm text-base-content/50 text-center">Try getting some shortcuts or scanning your files.</p>
        <div class="h-4" />
        <button
          @click="store.activeTab = 'steam'"
          class="flex flex-row items-center justify-center gap-1 text-sm py-1 px-2 rounded-xl border border-base-content/20 w-full max-w-42"
        >
          <SteamIcon />Add Steam Games
        </button>
        <button
          @click="store.activeTab = 'settings'"
          class="flex flex-row items-center justify-center gap-1 text-sm py-1 px-2 rounded-xl border border-base-content/20 w-full max-w-42 mt-2"
        >
          <Folder :size="14" />Add a folder
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import LibraryItemComponent from '~/components/library/LibraryItem.vue';
import { libraryStore } from '~/states/Library';
import { onMounted } from 'vue'
import { RotateCcw, ExternalLink, Folder } from 'lucide-vue-next'
import SteamIcon from '~/components/shared/SteamIcon.vue';
import { mainStore } from '~/states/Main';

const store = mainStore()
const lib = libraryStore()

onMounted(lib.refreshLibrary)
</script>
