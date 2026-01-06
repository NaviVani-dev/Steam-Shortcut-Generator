# Steam Shortcut Generator

An app that generates Steam shortcuts for Android Frontends easily.
Made for [Gamehub Lite](https://github.com/Producdevity/gamehub-lite) and [GameNative](https://github.com/utkarshdalal/GameNative)

## How to Use
Steam Shortcut Generator allows you to search for your Steam games to create a shortcut or just typing your game ID for Local Games.
It also includes a manual editor with templates in case you want to make your own shortcuts for other games, even if they are not from Steam!

### Steam Games
- Tap on the Searchbar and type your desired Steam game.
- Select it and click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

### Local/Non-Steam Games
- Write your Game Name
- Write your Local ID provided by your emulator.
- Click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

If you don't want to select a folder to save your shortcuts every time, you can set a default folder for Steam and Local games on the settings.

## Building
To build this app you will need `npm` or `bun` (recommended).

```bash
# Get dependencies
bun install

# For your current OS
bun tauri build
# For an Android build
bun tauri build android
```
