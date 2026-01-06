<template>
<div class="w-full flex flex-row place-items-center">
  <div class="flex flex-col flex-2 min-w-0" v-if="config">
    <p class="text-sm flex flex-row items-center gap-1"><Palette :size="14"/>App Theme</p>
    <p class="text-xs text-base-content/50">Change the app appearance</p>
  </div>
  <SelectRoot v-if="config" v-model="currentValue">
    <SelectTrigger class="anim-all flex-1 h-10 bg-base-200 hover:bg-base-300 border border-base-content/20 rounded-lg flex flex-row items-center justify-between px-2 capitalize text-sm cursor-pointer">
      <SelectValue placeholder="Themes" />
      <ChevronDown :size="14" class="opacity-50" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent :side-offset="5" class="w-full max-w-42 bg-base-300 border border-base-content/20 rounded-lg z-100 overflow-hidden">
        <SelectViewport>
          <SelectItem v-for="option,i in availableThemes" :key="i" :value="option" class="anim-all p-2 capitalize text-sm flex flex-row items-center gap-2 hover:bg-accent hover:text-accent-content cursor-pointer">
            <SelectItemText>
              {{option}}
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
import { AppSettings, ThemeOptions } from '~/types/Settings';
import { ref, Ref, onMounted, watch } from 'vue'
import { Check, ChevronDown, Palette } from 'lucide-vue-next'

const config : Ref<AppSettings|undefined> = ref()
const availableThemes: ThemeOptions[] = ["light", "dark"]
const currentValue: Ref<ThemeOptions> = ref("dark")

onMounted(async ()=> {
  config.value = await getConfig()
  if (config.value?.theme) {
    currentValue.value = config.value.theme
    document.documentElement.setAttribute('data-theme', currentValue.value)
  }
})

watch(currentValue, async ()=> {
  const partialData: Partial<AppSettings> = { theme: currentValue.value }
  await changeConfig(partialData)
  document.documentElement.setAttribute('data-theme', currentValue.value)
})
</script>
