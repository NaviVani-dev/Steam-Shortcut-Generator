<template>
  <button
    @click="openCreationDialog"
    class="flex flex-col sm:flex-row shrink-0 items-center gap-4 w-full bg-base-200 hover:bg-base-300 border border-base-content/20 p-4 rounded-xl transition-all duration-100 ease-in-out focus:outline-none cursor-pointer"
   >
     <AvatarRoot class="w-57.75 h-21.75 sm:w-[161.7px] sm:h-[60.9px] rounded-lg border border-base-content/20 relative">
        <AvatarImage
         class="w-full h-full object-cover rounded-[inherit]"
         :src="gameImg!"
         :alt="gameName"
       />
       <AvatarFallback class="w-full h-full rounded-[inherit]">
         <div class="w-full h-full shrink-0 flex items-center justify-center bg-base-200 rounded-[inherit]">
           <ExternalLink :size="48" class="scale-100 sm:scale-60 mb-1 ml-1" />
         </div>
       </AvatarFallback>
       <p class="text-[10px] bg-accent text-accent-content border border-base-content/20 px-2 rounded-full font-bold absolute -bottom-1 -right-1" v-if="isOnLibrary">IN LIBRARY</p>
     </AvatarRoot>
    <p class="truncate text-center sm:text-start w-full">{{gameName}}</p>
  </button>
</template>

<script setup lang="ts">
  import { AvatarImage, AvatarRoot, AvatarFallback } from 'reka-ui'
  import { ExternalLink } from 'lucide-vue-next'
  import { browserStore } from '~/states/Browser';
  const store = browserStore()
  const props = defineProps({
    gameId: String,
    gameName: String,
    gameImg: String,
    isOnLibrary: Boolean
  });
  const openCreationDialog = () => {
    store.openDialog = true
    store.selectedItemId = props.gameId!
    store.selectedItemName = props.gameName!
  }
</script>
