import axios from "axios";
const imdbApiKey = "k_3at9681x";
export async function getNowPopularTVs() {
  return axios.get(`https://imdb-api.com/en/API/MostPopularTVs/${imdbApiKey}`);
}

export async function getNowPopularMovies() {
  return axios.get(`https://imdb-api.com/en/API/MostPopularMovies/${imdbApiKey}`);
}

export async function getNowPopularAnime() {
  return axios.get("https://api.jikan.moe/v3/top/anime/1/airing");
}

export async function getAnimeWikiById(id: string) {
  return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
}

export async function getSeriesOrMoiveWikiById(id: string) {
  return axios.get(`https://imdb-api.com/en/API/Wikipedia/${imdbApiKey}/${id}`);
}
