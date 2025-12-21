<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { Search, Gamepad2, Bug } from "lucide-vue-next"
import { fetch } from "@tauri-apps/plugin-http";
import SearchResult from "./SearchResult.vue";
import CreateDialog from "./CreateDialog.vue";
import { SteamSearchResult } from "../types/SearchResults";

const searchTerm: Ref<string> = ref("")
const searchResults: Ref<SteamSearchResult[]> = ref([])
const isSearching = ref(false)
const errorState = ref(true)
const searchTimeout = 1000
//@ts-ignore
let timeout = null

watch(searchTerm, ()=> {
  if (searchTerm.value === "") {
    searchResults.value = []
    return
  }

  //@ts-ignore just shut up jesus
  clearTimeout(timeout)

  timeout = setTimeout(()=> {
    fetchSearchResults()
  }, searchTimeout)
})

const fetchSearchResults = async () => {
  try {
    if (searchTerm.value === "") return
    searchResults.value = []
    isSearching.value = true
    errorState.value = false

    const fetchUrl = `https://store.steampowered.com/search/suggest?cc=US&l=english&realm=1&origin=https:%2F%2Fstore.steampowered.com&f=jsonfull&term=${searchTerm.value}`
    const response = await fetch(fetchUrl, {
      method: 'GET',
    });
    if (response.status === 200) {
      searchResults.value = await response.json()
    }
  } catch (e) {
    console.log(e)
    errorState.value = true
  } finally {
    isSearching.value = false;
  }
}
</script>

<template>
  <main class="flex h-full w-full flex-col gap-2 items-center">
    <label class="input w-full max-w-132 transition-all duration-100 ease-in-out">
      <Search class="opacity-50" />
      <input v-model="searchTerm" type="search" class="grow" placeholder="Search for a Steam game..."/>
    </label>
    <div class="w-full max-w-132 flex flex-col flex-1 gap-2 overflow-y-scroll overflow-x-hidden bg-base-200 p-2 rounded-md border border-base-content/20">
      <SearchResult v-for="result in searchResults" :gameName="result.name" :gameImg="result.small_cap" :gameId="result.id" :key="result.id" />
      <div class="flex grow flex-col items-center justify-center opacity-30" v-if="searchResults.length === 0 && !isSearching">
        <Gamepad2 :size="112"/>
        <p class="text-center">Search for a game to create a shortcut for your frontend!</p>
      </div>
      <div class="flex grow flex-col items-center justify-center opacity-30" v-if="errorState">
        <Bug :size="112"/>
        <p class="text-center">An error ocurred! Maybe try again later...</p>
      </div>
      <div class="skeleton h-20 w-full shrink-0" v-for="_i in 5" v-if="isSearching" />
    </div>
    <CreateDialog />
  </main>
</template>
