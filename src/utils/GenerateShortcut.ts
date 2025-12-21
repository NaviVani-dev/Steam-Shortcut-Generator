import { save } from "@tauri-apps/plugin-dialog";
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
    await writeTextFile(path, content);
  } catch (e) {
    console.error(e);
  }
};
