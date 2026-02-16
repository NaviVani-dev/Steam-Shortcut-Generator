<script setup lang="ts">
import { Ref, ref } from "vue";
import { Search, Gamepad2, Bug } from "lucide-vue-next"
import SearchResult from "~/components/browser/SearchResult.vue";
import { SteamSearchResult } from "~/types/SearchResults";
import { libraryStore } from "~/states/Library";
import { searchGame } from "~/utils/SteamApi";

const searchTerm: Ref<string> = ref("")
const searchResults: Ref<SteamSearchResult[]> = ref([])
const isSearching = ref(false)
const errorState = ref(false)
const lib = libraryStore()

const fetchSearchResults = async () => {
  try {
    if (searchTerm.value === "") return
    searchResults.value = []
    isSearching.value = true
    errorState.value = false
    const gameData = await searchGame(searchTerm.value)
    if (gameData) searchResults.value = gameData
  } catch (e) {
    console.log(e)
    errorState.value = true
  } finally {
    isSearching.value = false;
  }
}
</script>

<template>
  <main class="flex h-full w-full flex-col gap-2 items-center min-h-0">
    <div class="w-full min-h-0 max-w-182 flex flex-col flex-1 gap-2 overflow-y-scroll overflow-x-hidden bg-base-200 p-2 rounded-xl border border-base-content/20">
      <label class="z-1 w-full transition-all duration-100 ease-in-out flex flex-row border border-base-content/20 px-4 bg-base-200 py-3 rounded-xl gap-2 sticky top-0">
        <Search class="opacity-50" />
        <input @keyup.enter="fetchSearchResults" v-model="searchTerm" type="search" class="grow focus:outline-none" placeholder="Search for a Steam game..."/>
      </label>
      <SearchResult
        v-for="result in searchResults"
        :gameName="result.name"
        :gameImg="result.small_cap"
        :gameId="result.id"
        :isOnLibrary="lib.library && lib.library.some(shortcut=>shortcut.id == result.id)"
        :key="result.id"
      />
      <div class="flex grow flex-col items-center justify-center opacity-30" v-if="searchResults.length === 0 && !isSearching">
        <Gamepad2 :size="112"/>
        <p class="text-center">Search for a game to create a shortcut for your frontend!</p>
      </div>
      <div class="flex grow flex-col items-center justify-center opacity-30" v-if="errorState">
        <Bug :size="112"/>
        <p class="text-center">An error ocurred! Maybe try again later...</p>
      </div>
      <div class="animate-pulse bg-base-300 rounded-xl h-20 w-full shrink-0" v-for="_i in 5" v-if="isSearching" />
    </div>
  </main>
</template>
