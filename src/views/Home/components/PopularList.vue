<template>
  <div @click="bottomPopupOpen = !bottomPopupOpen">
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">
        Now Pouplar - Tv Series
      </p>
      <div class="grid grid-cols-8 gap-4">
        <item-card
          @click.stop="onClick(column.id, column.image, `series`)"
          v-for="column in seriesList"
          :key="column.id"
          :id="column.id"
          :fullTitle="column.fullTitle"
          :poster="column.image"
          :title="column.title"
        >
        </item-card>
      </div>
    </div>
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">Now Pouplar - Moive</p>
      <div class="grid grid-cols-8 gap-4">
        <item-card
          @click.stop="onClick(column.id, column.image, `series`)"
          v-for="column in moivesList"
          :key="column.id"
          :id="column.id"
          :fullTitle="column.fullTitle"
          :poster="column.image"
          :title="column.title"
        >
        </item-card>
      </div>
    </div>
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">Now Pouplar - Anime</p>
      <div class="grid grid-cols-8 gap-4">
        <item-card
          @click.stop="onClick(column.id, column.image, `anime`)"
          v-for="column in animesList"
          :key="column.id"
          :id="column.id"
          :fullTitle="column.fullTitle"
          :poster="column.image"
          :title="column.title"
        >
        </item-card>
      </div>
    </div>
  </div>
  <div
    :class="{ modalDisplay: bottomPopupOpen, modalClose: !bottomPopupOpen }"
    class="w-full"
  >
    <bottom-popup
      :id="itemDetail.id"
      :type="itemDetail.type"
      :poster="itemDetail.poster"
      :title="itemDetail.title"
      :wiki="itemDetail.wiki"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ItemCard from "./ItemCard.vue";
import BottomPopup from "./BottomPopup.vue"
import {
  getNowPopularTVs,
  getNowPopularMovies,
  getNowPopularAnime,
  getAnimeWikiById,
  getSeriesOrMoiveWikiById,
} from "../api";
export interface PopularListProps {
  id: string;
  title: string;
  year: number;
  image: string;
  imDbRating: number;
  crew: string;
  fullTitle: string;
  imDbRatingCount: number;
  rank: number;
  rankUpDown: number;
}
interface ItemDetail {
  poster: string;
  title: string;
  wiki: string;
  id: string;
  type: "anime" | "series" | "moive";
}
export default defineComponent({
  name: "popularList",
  components: {
    ItemCard,
    BottomPopup
  },
  data() {
    return {
      itemDetail: {
        poster: "",
        title: "",
        wiki: "",
        id: "",
        type: "series",
      } as ItemDetail,
      bottomPopupOpen: false,
    };
  },
  async setup() {
    const popularSeries = ref<PopularListProps[]>([]);
    const popularMoives = ref<PopularListProps[]>([]);
    const popularAnimes = ref<PopularListProps[]>([]);
    try {
      const seriesResponse = await getNowPopularTVs();
      const moivesResponse = await getNowPopularMovies();
      const animeResponse = await getNowPopularAnime();
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
    } catch (e) {
      console.log(e);
      
    }

    return {
      seriesList: popularSeries,
      moivesList: popularMoives,
      animesList: popularAnimes,
    };
  },
  methods: {
    onClick(id: string, poster: string, type: string) {
      if (type === "anime") {
        const getFullInfo = async () => {
          const fullResponse = await getAnimeWikiById(id);

          this.itemDetail.wiki = fullResponse.data.synopsis.substring(0, 800);
          this.itemDetail.poster = poster;
          this.itemDetail.type = "anime";
          this.itemDetail.id = id;
          this.bottomPopupOpen = true;
        };
        getFullInfo();
      } else {
        const getFullInfo = async () => {
          const wikiResponse = await getSeriesOrMoiveWikiById(id);

          this.itemDetail.wiki = wikiResponse.data.plotShort.plainText.split(" ").slice(0, 120).join(" ") + ".....";
          this.itemDetail.poster = poster;
          this.itemDetail.type = "series";
          this.itemDetail.id = id;
        };
        getFullInfo();
        this.bottomPopupOpen = true;
      }
    },
  },
});
</script>

<style scoped>
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
  transform: translate(0, 400px);
  transition: transform 0.8s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}

.modalClose {
  z-index: 10;
  position: fixed;
  transform: translate(0, 900px);
  transition: transform 0.8s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}
</style>