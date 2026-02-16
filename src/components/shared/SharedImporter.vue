<template>
<DialogRoot v-model:open="mStore.sharedDialogOpen">
  <DialogPortal>
    <Transition name="fade">
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" />
    </Transition>
    <Transition name="scale">
      <DialogContent class="dialog-card">
        <DialogClose class="p-1.5 border border-base-content/20 bg-base-200 hover:bg-base-300 active:bg-base-200 active:scale-95 rounded-lg fixed top-5 right-5 cursor-pointer" ><X :size="14"/></DialogClose>
        <DialogTitle class="font-bold">Import to editor</DialogTitle>
        <p class="text-sm text-base-content/50">App ID: {{mStore.sharedAppId}}</p>
        <SelectRoot v-model="selectedTemplate">
          <SelectTrigger class="my-2 w-full h-12 flex flex-row items-center justify-between px-4 rounded-xl border border-base-content/20 anim-all cursor-pointer text-sm">
            <SelectValue placeholder="Filetype" />
            <ChevronDown :size="14" class="opacity-50" />
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="anim-all bg-base-200 border border-base-content/20 rounded-lg overflow-hidden z-300">
              <SelectViewport>
                <SelectItem
                  v-for="template,i in eStore.steamTemplates"
                  :key="i"
                  :value="i"
                  class="px-4 py-2 bg-base-200 hover:bg-base-300 anim-all cursor-pointer text-sm"
                >
                  <SelectItemText>
                    .{{template.name}}
                  </SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
        <button
          @click="importToEditor"
          class="anim-all bg-accent text-accent-content py-2 rounded-xl w-full enabled:hover:bg-accent/80 enabled:active:scale-95 enabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-base-300 disabled:text-base-content/50"
        >
          Import
        </button>
      </DialogContent>
    </Transition>
  </DialogPortal>
</DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogRoot,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import {ref, Ref} from "vue"
import { X, ChevronDown } from 'lucide-vue-next'
import { mainStore } from '~/states/Main';
import { editorStore } from '~/states/Editor';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter()
const mStore = mainStore()
const eStore = editorStore()
const selectedTemplate: Ref<number> = ref(0)

function importToEditor() {
  try {
    if (!mStore.sharedAppId) {
      throw new Error("no appID")
    }
    const template = eStore.steamTemplates[selectedTemplate.value]
    if (!template) {
      throw new Error("template was not found")
    }
    const content = template.content.replace("YOUR_GAME_ID_HERE", mStore.sharedAppId)
    eStore.fileContent = content
    eStore.fileType = template.filetype
    router.push('/editor')
  } catch (e) {
    console.log(e)
    toast.error("An error ocurred while trying to import the App ID.")
  } finally {
    mStore.sharedDialogOpen = false
  }
}
</script>
