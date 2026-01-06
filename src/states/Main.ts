import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const mainStore = defineStore("main", () => {
  const activeTab: Ref<"library"|"steam"|"local"|"editor"|"settings"> = ref("library")
  return { activeTab };
});
