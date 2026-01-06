export interface ShortcutTemplate {
  name: string
  content: string
  filetype: ShortcutValidFiletypes
}

export type ShortcutValidFiletypes = "steamappid" | "steam" | "localgameid" | "dpt"
