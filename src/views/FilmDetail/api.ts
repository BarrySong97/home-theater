import axios from "axios";
const imdbApiKey = "k_3at9681x";
export async function getMoiveOrSeriesDetail(id: string) {
  return axios.get(`https://imdb-api.com/en/API/Title/${imdbApiKey}/${id}`);
}

export async function getAnimeDetail(id: string) {
  return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
}

export async function getMoiveOrSeriesCast(id: string) {
  return axios.get(`https://imdb-api.com/en/API/FullCast/${imdbApiKey}/${id}`);
}

export async function getSeriesOrMoiveWikiById(id: string) {
  return axios.get(`https://imdb-api.com/en/API/Wikipedia/${imdbApiKey}/${id}`);
}

export async function getSeriesEpisodes(id: string, season: number) {
  return axios.get(`https://imdb-api.com/en/API/SeasonEpisodes/${imdbApiKey}/${id}/${season}`);
}

