import { AndroidFsUri } from 'tauri-plugin-android-fs-api'

export interface AppSettings {
  version: number
  theme: ThemeOptions
  steamfolder?: (string| AndroidFsUri)
  localfolder?: (string| AndroidFsUri)
  steamShortcutFormat: "steamappid" | "steam"
}

export type ThemeOptions = "light" | "dark"
