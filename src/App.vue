<template>
  <div>
    <navbar />

    <main class="container mx-auto flex justify-center pl-8 pr-8 pt-16">
      <div>
        <div class="mb-14">
          <p class="list-title flex justify-start font-bold">
            Now Pouplar - Tv Series
          </p>
          <popular-list>
            <item-card
              @click="onClick(column.id, column.image)"
              v-for="column in seriesList"
              :key="column.id"
              :id="column.id"
              :fullTitle="column.fullTitle"
              :poster="column.image"
              :title="column.title"
            >
            </item-card>
          </popular-list>
        </div>
        <div class="mb-14">
          <p class="list-title flex justify-start font-bold">
            Now Pouplar - Moive
          </p>
          <popular-list>
            <item-card
              @click="onClick(column.id)"
              v-for="column in moivesList"
              :key="column.id"
              :id="column.id"
              :fullTitle="column.fullTitle"
              :poster="column.image"
              :title="column.title"
            >
            </item-card>
          </popular-list>
        </div>
        <div class="mb-14">
          <p class="list-title flex justify-start font-bold">
            Now Pouplar - Anime
          </p>
          <popular-list>
            <item-card
              @click="onClick"
              v-for="column in animesList"
              :key="column.id"
              :id="column.id"
              :fullTitle="column.fullTitle"
              :poster="column.image"
              :title="column.title"
            >
            </item-card>
          </popular-list>
        </div>
      </div>
    </main>
    <bottom-popup
      :director="itemDetail.director"
      :writer="itemDetail.writer"
      :actor="itemDetail.actors"
      :poster="itemDetail.poster"
      :title="itemDetail.title"
      :wiki="itemDetail.wiki"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import PopularList, { PopularListProps } from "./components/PopularList.vue";
import Navbar from "./components/Navbar.vue";
import ItemCard from "./components/ItemCard.vue";
import BottomPopup from "./components/BottomPopup.vue";
interface Cast {
  director: string;
  writer: string;
  actors: string[];
}

export default defineComponent({
  name: "App",
  components: {
    PopularList,
    Navbar,
    ItemCard,
    BottomPopup,
  },
  data() {
    return {
      itemDetail: {},
    };
  },
  setup() {
    const popularSeries = ref<PopularListProps[]>([]);
    const popularMoives = ref([]);
    const popularAnimes = ref([]);
    const getPopular = async () => {
      const seriesResponse = await axios.get(
        "https://imdb-api.com/en/API/MostPopularTVs/k_3at9681x"
      );
      const moivesResponse = await axios.get(
        "https://imdb-api.com/en/API/MostPopularMovies/k_3at9681x"
      );
      const animeResponse = await axios.get(
        "https://api.jikan.moe/v3/top/anime/1/airing"
      );
      popularSeries.value = seriesResponse.data.items.slice(0, 8);

      popularMoives.value = moivesResponse.data.items.slice(0, 8);
      popularAnimes.value = animeResponse.data.top.slice(0, 8).map((v: any) => {
        return {
          id: `${v.mal_id}`,
          fullTitle: v.title,
          image: v.image_url,
        };
      });
    };
    onMounted(getPopular);

    return {
      seriesList: popularSeries,
      moivesList: popularMoives,
      animesList: popularAnimes,
    };
  },
  methods: {
    onClick(id: string, poster: string) {
      const getFullInfo = async () => {
        const castResponse = await axios.get(
          `https://imdb-api.com/en/API/FullCast/k_3at9681x/${id}`
        );
        const wikiResponse = await axios.get(
          `https://imdb-api.com/zh/API/Wikipedia/k_3at9681x/${id}`
        );

        this.itemDetail = {
          director: castResponse.data.directors.items[0].name,
          writer: castResponse.data.writers.items[0].name,
          actors: castResponse.data.actors.slice(0, 5),
          wiki: wikiResponse.data.plotShort.plainText,
          poster,
        };
      };
      getFullInfo();
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #000000;
}

.list-title {
  font-weight: 400;
  font-size: 18px;
  margin: 16px 0;
  color: white;
}
</style>
