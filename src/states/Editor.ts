import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { ShortcutValidFiletypes, ShortcutTemplate } from "~/types/Editor";

export const editorStore = defineStore("editor", () => {
  const fileName: Ref<string> = ref("")
  const fileContent: Ref<string> = ref("")
  const fileType: Ref<ShortcutValidFiletypes | undefined> = ref()
  const steamTemplates: Ref<ShortcutTemplate[]> = ref([
    { name: "Steam App ID", content: "# Daijisho Player Template \n[steamappid] YOUR_GAME_ID_HERE", filetype: "steamappid" },
    { name: "Steam Shortcut", content: "YOUR_GAME_ID_HERE", filetype: "steam" },
    { name: "Local Game ID", content: "# Daijisho Player Template \n[localgameid] YOUR_GAME_ID_HERE", filetype: "localgameid" },
  ])
  const templates: Ref<ShortcutTemplate[]> = ref([
    ...steamTemplates.value,
    { name: "PS Vita Game", content: "# Daijisho Player Template \n[vita_game_id] YOUR_VITA_GAMEID_HERE", filetype: "dpt" }
  ])
  function applyTemplate(index:number){
    const template = templates.value[index]
    fileContent.value = template.content
    fileType.value = template.filetype
  }
  return { fileName, fileContent, fileType, steamTemplates, templates, applyTemplate };
});
