<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-182 flex flex-col gap-2 p-6 bg-base-200 rounded-xl border border-base-content/20 overflow-x-scroll">
      <div class="w-full flex flex-col">
      <p class="text-lg font-bold text-center">Add Local Games</p>
      <p class="text-xs text-center text-base-content/30">Generate Shortcuts for your Local Games with only the ID!</p>
    </div>
    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game name:</p>
      <label class="w-full transition-all duration-100 ease-in-out flex flex-row border border-base-content/20 px-4 py-3 rounded-xl bg-base-200 gap-2">
        <Gamepad2 class="opacity-50" />
        <input v-model="gameName" class="grow focus:outline-none" placeholder="Hollow Knight..."/>
      </label>
    </div>
    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game Local ID:</p>
      <label class="w-full transition-all duration-100 ease-in-out flex flex-row border border-base-content/20 px-4 py-3 rounded-xl bg-base-200 gap-2">
        <IdCard class="opacity-50" />
        <input v-model="gameId" class="grow focus:outline-none" placeholder="local_########-####-####-####-..."/>
      </label>
    </div>
    <button @click="generateLocalGameShortcut" :disabled="gameName === '' || gameId === ''" class="anim-all bg-accent text-accent-content py-2 rounded-xl w-full enabled:hover:bg-accent/80 enabled:active:scale-95 enabled:cursor-pointer disabled:cursor-not-allowed mt-2 disabled:bg-base-300 disabled:text-base-content/50">Create Shortcut</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Gamepad2, IdCard } from 'lucide-vue-next'
import { generateShortcut } from '~/utils/GenerateShortcut'
import { getConfig } from '~/utils/SettingsManager';
import { sanitizeFileName } from '~/utils/GenerateShortcut';
import { ref, Ref, watch } from 'vue'

const gameName: Ref<string> = ref('')
const gameId: Ref<string> = ref('')

watch(
  () => gameName.value,
  (newValue) => {
    gameName.value = sanitizeFileName(newValue)
  }
)

const generateLocalGameShortcut = async () => {
  if (gameName.value === '' || gameId.value === '') return
  const config = await getConfig()
  const content = `# Daijishou Player Template\n[localgameid] ${gameId.value}`
  const filename = `${gameName.value}.localgameid`
  generateShortcut(filename, content, config?.localfolder)
}

</script>
