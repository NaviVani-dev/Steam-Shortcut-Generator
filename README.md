# Steam Shortcut Generator

Generate Steam shortcuts for your favourite Android frontends.

## Installation
[<img src="https://raw.githubusercontent.com/ImranR98/Obtainium/refs/heads/main/assets/graphics/badge_obtainium.png"
     alt="Get it on Obtainium"
     height="55"
     style="border: 13px solid transparent;">](https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22com.navivani.ssgen%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FNaviVani-dev%2FSteam-Shortcut-Generator%22%2C%22author%22%3A%22NaviVani-dev%22%2C%22name%22%3A%22Steam%20Shortcut%20Generator%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Afalse%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22sortMethodChoice%5C%22%3A%5C%22date%5C%22%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22releaseTitleAsVersion%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Atrue%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22invertAPKFilter%5C%22%3Afalse%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22%5C%22%2C%5C%22appAuthor%5C%22%3A%5C%22%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22allowInsecure%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22%5C%22%2C%5C%22refreshBeforeDownload%5C%22%3Afalse%2C%5C%22includeZips%5C%22%3Afalse%2C%5C%22zippedApkFilterRegEx%5C%22%3A%5C%22%5C%22%7D%22%2C%22overrideSource%22%3Anull%7D)

You can grab the latest release from the [Releases page](https://github.com/NaviVani-dev/Steam-Shortcut-Generator/releases/latest)!

## Usage
Steam Shortcut Generator allows you to search for your Steam games to create a shortcut or just typing your game ID for Local Games.

### Steam Games
- Tap on the Searchbar and type your desired Steam game.
- Select it and click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

### Local/Non-Steam Games
- Write your Game Name
- Write the Local ID provided by your emulator.
- Click "Generate Shortcut"
- Select the folder where you would like to save the shortcut.

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

## ☕ Support Me
If you enjoy this project and you have an extra buck, please consider donating to my Ko-Fi!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/navivani_dev)
