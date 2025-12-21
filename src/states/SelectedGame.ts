import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const selectedStore = defineStore("selected", () => {
  const selectedItemId: Ref<string> = ref("");
  const selectedItemName: Ref<string> = ref("");
  const openDialog: Ref<boolean> = ref(false);
  return { selectedItemId, selectedItemName, openDialog };
});
