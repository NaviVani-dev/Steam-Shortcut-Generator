import { save } from "@tauri-apps/plugin-dialog";
import { toast } from "vue-sonner";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export const generateShortcut = async (
  filename: string,
  type: string,
  gameid: string,
  extension: "steamappid" | "localgameid"
) => {
  try {
    const content = `[${type}] ${gameid}`;
    const filter =
      extension === "steamappid"
        ? { name: "Steam Game Shortcut", extensions: [".steamappid"] }
        : { name: "Local Game Shortcut", extensions: [".localgameid"] };
    const path = await save({
      filters: [filter],
      defaultPath: `${filename}.${extension}`,
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
