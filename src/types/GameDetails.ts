/*
  only making types for the data im gnna use, tbh this is only show-off
*/
export interface SteamGameDetails {
  strReleaseDate: string;
  strDescription: string;
  strGenres: string;
  strMicroTrailerUrl: string;
  rgScreenshots: SteamGameDetailsScreenshot[];
}

export interface SteamGameDetailsScreenshot {
  appid: number;
  id: number;
  filename: string;
  all_ages: string;
  normalized_name: string;
}
