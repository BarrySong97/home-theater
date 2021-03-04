<template>
  <div @click="() => (bottomPopupOpen = false)">
    <navbar />

    <main class="container mx-auto flex justify-center pl-8 pr-8 pt-16">
      <div>
        <div class="mb-14">
          <p class="list-title flex justify-start font-bold">
            Now Pouplar - Tv Series
          </p>
          <popular-list>
            <item-card
              @click.stop="onClick(column.id, column.image, `series`, $event)"
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
              @click.stop="onClick(column.id, column.image, `anime`, $event)"
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
  </div>
  <div
    :class="{ modalDisplay: bottomPopupOpen, modalClose: !bottomPopupOpen }"
    class="w-full"
  >
    <bottom-popup
      :director="itemDetail.director"
      :writer="itemDetail.writer"
      :actors="itemDetail.actors"
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
interface ItemDetail {
  director: string;
  writer: string;
  actors: string[];
  poster: string;
  title: string;
  wiki: string;
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
      itemDetail: {
        director: "",
        writer: "",
        actors: [],
        poster: "",
        title: "",
        wiki: "",
      } as ItemDetail,
      bottomPopupOpen: false,
    };
  },
  setup() {
    const popularSeries = ref<PopularListProps[]>([]);
    const popularMoives = ref<PopularListProps[]>([]);
    const popularAnimes = ref<PopularListProps[]>([]);
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
      popularAnimes.value = animeResponse.data.top
        .slice(0, 8)
        .map((v: { mal_id: string; title: string; image_url: string }) => {
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
    onClick(id: string, poster: string, type: string, event: Event) {
      if (type === "anime") {
        const getFullInfo = async () => {
          const fullResponse = await axios.get(
            `https://api.jikan.moe/v3/anime/${id}`
          );

          this.itemDetail.wiki = fullResponse.data.synopsis.substring(0, 800);
          this.itemDetail.poster = poster;
          this.bottomPopupOpen = true;
        };
        getFullInfo();
        this.bottomPopupOpen = true;
      } else {
        const getFullInfo = async () => {
          // const castResponse = await axios.get(
          //   `https://imdb-api.com/en/API/FullCast/k_3at9681x/${id}`
          // );
          const wikiResponse = await axios.get(
            `https://imdb-api.com/en/API/Wikipedia/k_3at9681x/${id}`
          );

          // this.itemDetail.director = castResponse.data.directors.items[0].name;
          // this.itemDetail.writer = castResponse.data.writers.items[0].name;
          // this.itemDetail.actors = castResponse.data.actors
          //   .slice(0, 5)
          //   .map((v: { name: string }) => {
          //     return v.name;
          //   });

          // console.log(this.itemDetail.actors);

          this.itemDetail.wiki = wikiResponse.data.plotShort.plainText.substring(
            0,
            600
          );
          this.itemDetail.poster = poster;
        };
        getFullInfo();
        this.bottomPopupOpen = true;
      }
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

.modalDisplay {
  display: block;
  position: fixed;
  z-index: 10;
  transform: translate(0, -550px);
  transition: transform 0.8s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}

.modalClose {
  z-index: 10;
   position: fixed;
  transform: translate(0, 300px);
  transition: transform 0.8s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}
</style>
