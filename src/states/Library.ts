import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import { LibraryItem } from '~/types/Library';
import { getLibrary } from '~/utils/ShortcutsLibrary';

export const libraryStore = defineStore('library', () => {
  const library:Ref<LibraryItem[]> = ref([])
  async function refreshLibrary() {
    const data = await getLibrary()
    if (!data) return
    library.value = data
  }
  refreshLibrary()

  return { library, refreshLibrary };
});
