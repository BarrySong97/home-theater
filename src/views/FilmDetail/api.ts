import axios from "axios";

export async function getMoiveOrSeriesDetail(id: string) {
  return axios.get(`https://imdb-api.com/en/API/Title/k_3at9681x/${id}`);
}

export async function getAnimeDetail(id: string) {
  return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
}