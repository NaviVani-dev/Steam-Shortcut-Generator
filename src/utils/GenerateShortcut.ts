import { save } from "@tauri-apps/plugin-dialog";
import { toast } from "vue-sonner";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export const generateShortcut = async (
  filename: string,
  type: string,
  gameid: string
) => {
  try {
    const content = `[${type}] ${gameid}`;
    const path = await save({
      filters: [{ name: "Steam Shortcut", extensions: [".steamappid"] }],
      defaultPath: `${filename}.steamappid`,
    });
    if (!path) return;

    // idk why, but sometimes the file will be empty only the 1st time, hopefully this will fix it
    await writeTextFile(path, content);
    await writeTextFile(path, content);

    toast.success("Shortcut generated succesfully!");
  } catch (e) {
    console.error(e);
    toast.error("An error ocurred, try again later...");
  }
};
