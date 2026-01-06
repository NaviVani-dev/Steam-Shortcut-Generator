import { AndroidFsUri } from "tauri-plugin-android-fs-api"

export interface LibraryItem {
  id: string
  name: string
  type: ShortcutFileType
  folder: "Steam" | "Local"
  path: string | AndroidFsUri
}

export type ShortcutFileType = "steam" | "steamappid" | "localgameid"
