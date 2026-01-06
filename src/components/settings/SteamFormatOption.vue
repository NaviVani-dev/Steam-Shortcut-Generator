<template>
<div class="w-full flex flex-row place-items-center">
  <div class="flex flex-col flex-2 min-w-0" v-if="config">
    <p class="text-sm flex flex-row items-center gap-1"><File :size="14"/>Shortcut Type</p>
    <p class="text-xs text-base-content/50">The file type of your Steam shortcuts</p>
  </div>
  <SelectRoot v-if="config" v-model="currentValue">
    <SelectTrigger class="anim-all flex-1 h-10 border border-base-content/20 bg-base-200 hover:bg-base-300 rounded-lg flex flex-row items-center justify-between px-2 text-sm cursor-pointer">
      <SelectValue placeholder="Format" />
      <ChevronDown :size="14" class="opacity-50" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent :side-offset="5" class="w-full max-w-42 bg-base-300 border border-base-content/20 rounded-lg z-100">
        <SelectViewport>
          <SelectItem v-for="option,i in availableFormats" :key="i" :value="option" class="anim-all p-2 text-sm flex flex-row items-center gap-2 hover:bg-accent hover:text-accent-content cursor-pointer">
            <SelectItemText>
              .{{option}}
            </SelectItemText>
            <SelectItemIndicator>
              <Check :size="16" />
            </SelectItemIndicator>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
  <div v-if="!config" class="w-full h-14 bg-base-300 rounded-lg animate-pulse" />
</div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { changeConfig, getConfig } from '~/utils/SettingsManager';
import { AppSettings } from '~/types/Settings';
import { ref, Ref, onMounted, watch } from 'vue'
import { Check, ChevronDown, File } from 'lucide-vue-next'

const config : Ref<AppSettings|undefined> = ref()
const availableFormats: ("steamappid" | "steam")[] = ["steamappid", "steam"]
const currentValue: Ref<"steamappid" | "steam"> = ref("steamappid")

onMounted(async ()=> {
  config.value = await getConfig()
  if (config.value?.steamShortcutFormat) {
    currentValue.value = config.value.steamShortcutFormat
  }
})

watch(currentValue, async ()=> {
  const partialData: Partial<AppSettings> = { steamShortcutFormat: currentValue.value }
  await changeConfig(partialData)
})
</script>
