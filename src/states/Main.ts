import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const mainStore = defineStore("main", () => {
  const sharedDialogOpen: Ref<boolean> = ref(false)
  const sharedAppId: Ref<string|undefined> = ref()
  return { sharedDialogOpen, sharedAppId };
});
