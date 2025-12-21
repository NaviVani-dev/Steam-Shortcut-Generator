<template>
  <button
    @click="openCreationDialog"
    class="flex flex-row shrink-0 items-center gap-4 w-full h-20 max-h-20 bg-base-300 px-2 rounded-md transition-all duration-100 ease-in-out focus:scale-105 focus:outline-none"
   >
    <img .src="gameImg" class="h-14 w-38 object-cover rounded-sm" />
    <p class="text-lg truncate">{{gameName}}</p>
  </button>
</template>

<script setup lang="ts">
  import { selectedStore } from '../states/SelectedGame';
  const store = selectedStore()
  const props = defineProps({
    gameId: String,
    gameName: String,
    gameImg: String
  });
  const openCreationDialog = () => {
    const modal = document.getElementById("createDialog") as HTMLDialogElement
    if (modal === null) return
    store.selectedItemId = props.gameId!
    store.selectedItemName = props.gameName!
    modal.showModal()
  }
</script>