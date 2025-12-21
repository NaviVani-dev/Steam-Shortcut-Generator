# Steam Shortcut Generator

An app that generates `.steamappid` shortcuts for Android Frontends easily.

Made for [Gamehub Lite](https://github.com/Producdevity/gamehub-lite) and [GameNative](https://github.com/utkarshdalal/GameNative)

## How to Use
Steam Shortcut Generator allows you to search for your Steam games or manually create shortcuts with you Local ID.

### Steam Games
- Tap on the Searchbar and type your desired Steam game.
- Select it and click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

### Local/Non-Steam Games
- Write your Game Name
- Write your Local ID provided by your emulator.
- Click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

## Building
To build this app you will need `npm` or `bun` (recommended).

```bash
bun install

# For your current OS
bun tauri build
# For an Android build
bun tauri build android
```

