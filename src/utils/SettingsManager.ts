import { create, mkdir, exists, readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { appConfigDir } from '@tauri-apps/api/path'
import { AppSettings } from '../types/Settings';

const configFile = "config.json"
const baseDirObj = { baseDir: BaseDirectory.AppConfig }
const configTemplate: AppSettings = {
  version: 1,
  theme: "dark",
  steamShortcutFormat: "steamappid"
}

export async function createConfig(): Promise<boolean> {
  try {
    if (await exists(configFile, baseDirObj)) return true
    const configDir = await appConfigDir()
    if (!(await exists(configDir, baseDirObj))) {
      await mkdir(configDir, { ...baseDirObj, recursive: true });
    }
    const file = await create(configFile, baseDirObj)
    await file.write(new TextEncoder().encode(JSON.stringify(configTemplate)))
    await file.close()
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

export async function getConfig(): Promise<AppSettings|undefined> {
  try {
    if (!await exists(configFile, baseDirObj)) return
    const data = await readTextFile(configFile, baseDirObj)
    return JSON.parse(data) as AppSettings
  } catch(e) {
    console.log(e)
    return
  }
}

export async function changeConfig(newData: Partial<AppSettings>): Promise<boolean> {
  try {
    if (!await exists(configFile, baseDirObj) || !newData) return false
    const oldData = await getConfig()
    const data = Object.assign({}, oldData, newData)
    await writeTextFile(configFile, JSON.stringify(data), baseDirObj)
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}
