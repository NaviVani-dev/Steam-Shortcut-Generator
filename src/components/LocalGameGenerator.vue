<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-132 flex flex-col gap-2 p-6 bg-base-200 rounded-xl border border-base-content/20">
      <div class="w-full flex flex-col">
      <p class="text-lg font-bold text-center">Generate a shortcut for your Local Games</p>
      <p class="text-xs text-center text-base-content/30">a.k.a. Non-Steam games</p>
    </div>
    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game name:</p>
      <label class="w-full transition-all duration-100 ease-in-out flex flex-row border border-base-content/20 px-4 py-3 rounded-xl bg-base-200 gap-2">
        <Gamepad2 class="opacity-50" />
        <input v-model="gameName" type="search" class="grow focus:outline-none" placeholder="Hollow Knight..."/>
      </label>
    </div>
    <div class="w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game Local ID:</p>
      <label class="w-full transition-all duration-100 ease-in-out flex flex-row border border-base-content/20 px-4 py-3 rounded-xl bg-base-200 gap-2">
        <IdCard class="opacity-50" />
        <input v-model="gameId" type="search" class="grow focus:outline-none" placeholder="local_########-####-####-####-..."/>
      </label>
    </div>
    <button @click="generateLocalGameShortcut" :disabled="gameName === '' || gameId === ''" class="bg-accent py-2 rounded-xl w-full focus:outline-0 mt-2 max-w-132">Create Shortcut</button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Gamepad2, IdCard } from 'lucide-vue-next'
import { generateShortcut } from '../utils/GenerateShortcut'
import { ref,Ref } from 'vue'

const gameName: Ref<string> = ref('')
const gameId: Ref<string> = ref('')

const generateLocalGameShortcut = () => {
  if (gameName.value === '' || gameId.value === '') return
  generateShortcut(gameName.value, "localgameid", gameId.value)
}

</script>