<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-182 flex flex-col gap-2 p-6 bg-base-200 rounded-xl border border-base-content/20 relative overflow-x-scroll">

      <DropdownMenuRoot>
        <DropdownMenuTrigger class="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs border border-base-content/20 bg-base-200 hover:bg-base-300 flex flex-row items-center gap-1 anim-all cursor-pointer">
          <Star :size="12" />
          <p>Templates</p>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="anim-all bg-base-200 border border-base-content/20 rounded-lg overflow-hidden">
            <DropdownMenuItem
              v-for="template,i in store.templates"
              :key="i"
              @select="store.applyTemplate(i)"
              class="anim-all px-4 py-2 text-sm text-start bg-base-200 hover:bg-base-300 cursor-pointer"
            >
              <p>{{template.name}}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <div class="w-full flex flex-col">
        <p class="text-lg font-bold text-center">Manual Editor</p>
        <p class="text-xs text-center text-base-content/30">Generate a custom shortcut for multiple platforms, not only Steam!</p>
      </div>

    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm font-bold">File:</p>
      <div class="anim-all border border-base-content/20 px-4 py-3 rounded-xl flex flex-row items-center gap-1.5">
        <SelectRoot v-model="store.folder">
          <SelectTrigger class="w-auto h-6 gap-1 flex flex-row items-center justify-between px-2 rounded-md border border-base-content/20 anim-all cursor-pointer text-sm">
            <Folder :size="12" />
            <SelectValue placeholder="Custom" class="text-xs" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="anim-all bg-base-200 border border-base-content/20 rounded-lg overflow-hidden">
              <SelectViewport>
                <SelectItem
                  value="custom"
                  class="px-4 py-2 bg-base-200 hover:bg-base-300 anim-all cursor-pointer text-sm"
                >
                  <SelectItemText>Custom</SelectItemText>
                </SelectItem>
                <SelectItem
                  value="steam"
                  class="px-4 py-2 bg-base-200 hover:bg-base-300 anim-all cursor-pointer text-sm"
                >
                  <SelectItemText>Steam</SelectItemText>
                </SelectItem>
                <SelectItem
                  value="local"
                  class="px-4 py-2 bg-base-200 hover:bg-base-300 anim-all cursor-pointer text-sm"
                >
                  <SelectItemText>Local</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
        <span class="opacity-50 font-extrabold">/</span>
        <input v-model="store.fileName" class="w-full text-xs" placeholder="My Custom Shortcut..." />
      </div>
    </div>

    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm font-bold">Content:</p>
      <textarea v-model="store.fileContent" class="font-mono placeholder:font-sans text-xs whitespace-pre overflow-y-auto anim-all border border-base-content/20 px-4 py-3 rounded-xl h-36 resize-none" placeholder="The contents of your shortcut!" />
    </div>

    <div class="flex flex-row gap-2 items-center justify-center mt-2">
      <SelectRoot v-model="store.fileType">
        <SelectTrigger class="w-52 h-full flex flex-row items-center justify-between px-4 rounded-xl border border-base-content/20 anim-all cursor-pointer text-sm">
          <SelectValue placeholder="Filetype" />
          <ChevronDown :size="14" class="opacity-50" />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent class="anim-all bg-base-200 border border-base-content/20 rounded-lg overflow-hidden">
            <SelectViewport>
              <SelectItem
                v-for="template,i in store.templates"
                :key="i"
                :value="template.filetype"
                class="px-4 py-2 bg-base-200 hover:bg-base-300 anim-all cursor-pointer text-sm"
              >
                <SelectItemText>
                  .{{template.filetype}}
                </SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>

      <button
        @click="generateLocalGameShortcut"
        :disabled="store.fileName === '' || store.fileContent === '' || !store.fileType"
        class="anim-all bg-accent text-accent-content py-2 rounded-xl w-full enabled:hover:bg-accent/80 enabled:active:scale-95 enabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-base-300 disabled:text-base-content/50"
      >
        Create Shortcut
      </button>
    </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Star, ChevronDown, Folder } from 'lucide-vue-next'
import { generateShortcut } from '~/utils/GenerateShortcut'
import { editorStore } from '~/states/Editor'
import { getConfig } from '~/utils/SettingsManager';
import { sanitizeFileName } from '~/utils/GenerateShortcut';
import { watch } from 'vue';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'reka-ui'

const store = editorStore()


watch(
  () => store.fileName,
  (newValue) => {
    store.fileName = sanitizeFileName(newValue)
  }
)

const generateLocalGameShortcut = async () => {
  if (store.fileName === '' || store.fileContent === '' || store.fileType == undefined) return
  const config = await getConfig()
  const fileShit = `${store.fileName}.${store.fileType}`
  const path = store.folder === "steam" ? config?.steamfolder : store.folder === "local" ? config?.localfolder : undefined

  generateShortcut(fileShit, store.fileContent, path)
}
</script>
