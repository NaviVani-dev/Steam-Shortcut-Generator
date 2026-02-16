import { save } from "@tauri-apps/plugin-dialog";
import { toast } from "vue-sonner";
import { writeTextFile, remove } from "@tauri-apps/plugin-fs";
import { platform } from "@tauri-apps/plugin-os";
import { AndroidFs, AndroidFsUri } from "tauri-plugin-android-fs-api";
import { path as p } from "@tauri-apps/api";
import { libraryStore } from "~/states/Library";


export function sanitizeFileName(name: string): string {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .slice(0, 180)
}

export const generateShortcut = async (filename: string, content: string, path?: string | AndroidFsUri) => {
  try {
    const cleanFilename = sanitizeFileName(filename).trim()
    if (!path) {
      //if theres no path set, it will default to the old code
      const path = await save({
        filters: [{ name: "Game Shortcut", extensions: ['.steam', 'steamappid', '.localgameid']}],
        defaultPath: cleanFilename,
      });
      if (!path) return false;
      await writeTextFile(path, content);
      await writeTextFile(path, content);
    } else{
      if (platform() == "android") {
        if (typeof path == "string") return
        const uri = await AndroidFs.createNewFile(path!, cleanFilename, null)
        const file = await AndroidFs.getFsPath(uri)
        await writeTextFile(file,content)
        await writeTextFile(file,content)
      } else {
        if (typeof path != "string") return
        const file = await p.join(path, cleanFilename)
        await writeTextFile(file, content)
        await writeTextFile(file,content)
      }
    }
    // double writeTextFile go!!!!
    toast.success("Shortcut generated succesfully!");
    libraryStore().refreshLibrary()
    return true
  } catch (e) {
    console.error(e);
    toast.error("An error ocurred, try again later...");
    return false
  }
};

export const deleteShortcut = async (filepath: string | AndroidFsUri) => {
  try{
    if (platform() == "android") {
      if (typeof filepath == "string") return
      await AndroidFs.removeFile(filepath)
    } else {
      if (typeof filepath !== "string") return
      await remove(filepath)
    }
    toast.error("Shortcut deleted succesfully")
    libraryStore().refreshLibrary()
  } catch(e) {
    console.log(e)
  }
}
