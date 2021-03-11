<template>
  <div>
    <div class="filmDetail flex flex-row p-8">
      <div class="poster w-5/6">
        <img :src="filmDetail.poster" height="300" width="200" alt="poster" />
      </div>
      <div class="info text-left text-white">
        <div class="title text-3xl mb-1">{{ filmDetail.fullTitle }}</div>
        <div class="releaseDate mb-1">
          ReleaseDate: &nbsp;
          {{ `${filmDetail.releaseDate}` }}
        </div>
        <div class="year mb-1">Year: {{ filmDetail.year }}</div>
        <div class="episodes mb-1">Episodes: {{ filmDetail.episodes }}</div>
        <div class="genres mb-1 flex flex-row">
          Genres: &nbsp;
          <p v-for="g in filmDetail.genres" :key="g" class="director-item mr-2">
            {{ g }}
          </p>
        </div>
        <div class="directors flex flex-row mb-1">
          <span>Directors: &nbsp;</span>
          <p
            v-for="d in filmDetail.directors"
            :key="d"
            class="director-item mr-2"
          >
            {{ d }}
          </p>
        </div>
        <div v-if="filmDetail.actors" class="actors flex flex-row mb-1">
          <span>Actors: &nbsp;</span>
          <p
            v-show="filmDetail.actors"
            v-for="a in filmDetail.actors"
            :key="a"
            class="director-item"
          >
            {{ a }}
          </p>
        </div>
        <div v-if="filmDetail.writers" class="actors flex flex-row mb-1">
          <span>Writers: &nbsp;</span>
          <p
            v-show="filmDetail.writers"
            v-for="w in filmDetail.writers"
            :key="w"
            class="director-item"
          >
            {{ w }}
          </p>
        </div>
        <div class="wiki text-justify">
          <p>
            {{ filmDetail.wiki }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  getAnimeDetail,
  getMoiveOrSeriesDetail,
  getMoiveOrSeriesCast,
  getSeriesOrMoiveWikiById,
  getSeriesEpisodes,
} from "./api";
interface FilmDetail {
  id: string;
  seasons: number;
  actors: string[];
  wiki: string;
  directors: string[];
  episodes: number;
  score: number;
  writers: string[];
  releaseDate: Date;
  year: number;
  fullTitle: string;
  genres: string[];
  poster: string;
}
export default defineComponent({
  name: "fileDetail",
  async setup() {
    const route = useRoute();
    const { id, type } = route.params;
    const filmDetail = reactive<FilmDetail>({
      id: String(id),
      actors: [],
      directors: [],
      episodes: 0,
      seasons: 0,
      score: 9.9,
      writers: [],
      year: 2021,
      genres: [],
      releaseDate: new Date(),
      poster: "",
      fullTitle: "tittle",
      wiki: "some whiki",
    });

    if (type === "anime") {
      const fullResponse = await getAnimeDetail(String(id));
      filmDetail.directors = fullResponse.data.producers.map(
        (v: { name: string }) => v.name
      );
      filmDetail.episodes = fullResponse.data.episodes;
      filmDetail.fullTitle = fullResponse.data.title_japanese;
      filmDetail.score = fullResponse.data.score;
      filmDetail.year = fullResponse.data.aired.prop.from.year;
      filmDetail.releaseDate = fullResponse.data.aired.from.split("T")[0];
      filmDetail.poster = fullResponse.data.image_url;
      filmDetail.wiki = fullResponse.data.synopsis;
      filmDetail.genres = fullResponse.data.genres.map(
        (v: { name: string }) => v.name
      );
    } else {
      const fullResponse = await getMoiveOrSeriesDetail(String(id));
      const wikiResponse = await getSeriesOrMoiveWikiById(String(id));
      const castResponse = await getMoiveOrSeriesCast(String(id));
      const episodesResponse = await getSeriesEpisodes(String(id), 1);
      filmDetail.episodes = fullResponse.data.episodes;
      filmDetail.fullTitle = fullResponse.data.fullTitle;
      filmDetail.score = fullResponse.data.imDbRating;
      filmDetail.directors = castResponse.data.directors.items.map(
        (v: { name: string }) => v.name
      );
      filmDetail.writers = castResponse.data.writers.items.map(
        (v: { name: string }) => v.name
      );

      filmDetail.actors = fullResponse.data.starList
        .slice(0, 6)
        .map((v: { name: string }) => v.name);
      filmDetail.year = fullResponse.data.year;
      filmDetail.releaseDate = fullResponse.data.releaseDate;
      filmDetail.poster = fullResponse.data.image;
      filmDetail.genres = fullResponse.data.genres.split(",");
      filmDetail.wiki =
        wikiResponse.data.plotShort.plainText
          .split(" ")
          .slice(0, 100)
          .join(" ") + ".....";
    }

    return {
      filmDetail,
    };
  },
});
</script>

<style scoped>
</style>