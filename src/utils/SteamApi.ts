import { fetch } from "@tauri-apps/plugin-http";
import { SteamSearchResult } from "~/types/SearchResults";
import { SteamGameDetails } from "~/types/GameDetails";

export async function searchGame(searchTerm: string):Promise<SteamSearchResult[] | undefined> {
  try {
    const fetchUrl = `https://store.steampowered.com/search/suggest?cc=US&l=english&realm=1&origin=https:%2F%2Fstore.steampowered.com&f=jsonfull&term=${searchTerm}`
    const response = await fetch(fetchUrl, {
      method: 'GET',
    })
    if (response.status === 200) {
      return response.json()
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
}

export async function fetchGameData(gameId: string): Promise<SteamGameDetails | undefined> {
  try {
    const fetchUrl = `https://store.steampowered.com/apphoverpublic/${gameId}/?l=english&json=1`
    const response = await fetch(fetchUrl, {
      method: 'GET',
    });
    if (response.status === 200) {
      return response.json()
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
}
