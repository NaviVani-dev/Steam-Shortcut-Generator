<template>
  <main class="flex h-full w-full flex-col gap-2 items-center justify-center">
    <div class="w-full flex flex-col">
      <p class="text-lg font-bold text-center">Generate a shortcut for your Local Games</p>
      <p class="text-xs text-center text-base-content/30">a.k.a. Non-Steam games</p>
    </div>
    <div class="max-w-132 w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game name:</p>
      <label class="input w-full transition-all duration-100 ease-in-out">
        <Gamepad2 class="opacity-50" />
        <input v-model="gameName" type="search" class="grow" placeholder="Hollow Knight: Silksong"/>
      </label>
    </div>
    <div class="max-w-132 w-full flex flex-col shrink-0 gap-1.5">
      <p class="text-sm">Game Local ID:</p>
      <label class="input w-full transition-all duration-100 ease-in-out">
        <IdCard class="opacity-50" />
        <input v-model="gameId" type="search" class="grow" placeholder="local_########-####-####-####-..."/>
      </label>
    </div>
    <button @click="generateLocalGameShortcut" :disabled="gameName === '' || gameId === ''" class="btn btn-accent w-full max-w-132">Create Shortcut</button>
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