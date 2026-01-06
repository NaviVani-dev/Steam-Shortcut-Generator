import { AndroidFs } from 'tauri-plugin-android-fs-api'
import { LibraryItem, ShortcutFileType } from '~/types/Library';
import { platform } from '@tauri-apps/plugin-os';
import { open } from "@tauri-apps/plugin-dialog";
import { readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { path } from '@tauri-apps/api';
import { changeConfig, getConfig } from '~/utils/SettingsManager';

export async function setLibraryFolder(folderType: "steam" | "local"): Promise<boolean> {
  try {
    const config = await getConfig();
    if (!config) return false;

    const folder = platform() === "android"
      ? await AndroidFs.showOpenDirPicker()
      : await open({ multiple: false, directory: true });

    if (!folder) return false;

    const configKey = folderType === "steam" ? "steamfolder" : "localfolder";
    const oldFolder = config[configKey];

    if (folder === oldFolder) return true;
    if (platform() === "android" && typeof folder !== "string") {
      await AndroidFs.persistUriPermission(folder);
      if (oldFolder && typeof oldFolder !== "string") {
        try {
          await AndroidFs.releasePersistedUriPermission(oldFolder);
        } catch (e) {
          console.warn("Error releasing permissions for old URI", e);
        }
      }
    }

    config[configKey] = folder;
    await changeConfig(config);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getLibrary(): Promise<LibraryItem[] | undefined> {
  try {
    const config = await getConfig();
    if (!config) return;

    const folders = [
      { path: config.steamfolder, type: "Steam" as const },
      { path: config.localfolder, type: "Local" as const }
    ];
    let items: (LibraryItem | null)[] | undefined = []
    if (platform() === "android") {
      for (const folder of folders) {
        if (typeof folder.path == "string") continue;
        if (!folder.path) continue;
        const entries = await AndroidFs.readDir(folder.path)
        const scannedItems = await Promise.all(
          entries.map(async (file): Promise<LibraryItem | null> => {
            if (file.type == "Dir") return null
            const filetype = await path.extname(file.name.toLowerCase())
            if (!["steam", "steamappid", "localgameid"].includes(filetype)) return null;

            const fileUri = file.uri
            const filePath = await AndroidFs.getFsPath(fileUri)
            const content = await readTextFile(filePath)

            let id: string | null = null
            if (filetype === "steamappid") id = getSteamAppId(content);
            else if (filetype === "localgameid") id = getLocalGameId(content);
            else id = content.trim();
            if (!id) return null;

            return {
              id,
              name: file.name.substring(0, file.name.lastIndexOf(".")),
              type: filetype as ShortcutFileType,
              folder: folder.type,
              path: fileUri
            }
          })
        )
        items.push(...scannedItems.filter((i): i is LibraryItem => i !== null))
      }
    } else {
      for (const folder of folders) {
        if (typeof folder.path !== "string") continue;
        const entries = await readDir(folder.path);
        const scannedItems = await Promise.all(
          entries.map(async (file): Promise<LibraryItem | null> => {
            if (!file.isFile) return null;
            const filetype = await path.extname(file.name.toLowerCase())
            if (!["steam", "steamappid", "localgameid"].includes(filetype)) return null;

            const filePath = await path.join(folder.path as string, file.name);
            const content = await readTextFile(filePath);

            let id: string | null = null;
            if (filetype === "steamappid") id = getSteamAppId(content);
            else if (filetype === "localgameid") id = getLocalGameId(content);
            else id = content.trim();
            if (!id) return null

            return {
              id,
              name: file.name.substring(0, file.name.lastIndexOf(".")),
              type: filetype as ShortcutFileType,
              folder: folder.type,
              path: filePath
            };
          })
        );
        items.push(...scannedItems.filter((i): i is LibraryItem => i !== null))
      }
    }

    return items as LibraryItem[]
  } catch (e) {
    console.error(e);
    return;
  }
}

function getSteamAppId(content: string): string | null {
  const regex = /\[steamappid\]\s+(\d+)/m;
  const match = content.match(regex);
  return match ? match[1] : null;
}

function getLocalGameId(content: string): string | null {
  const regex = /\[localgameid\]\s+(.+)/;
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}
