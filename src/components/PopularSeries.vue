<template>
  <div class="grid grid-cols-8 gap-4">
    <item-card v-for="column in list" :key="column.id" :id="column.id" :fullTile="column.fullTitle" :poster="column.image" :title="column.title">
      
    </item-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ItemCard from "./ItemCard.vue";
export interface PopularSeriesProps {
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
export default defineComponent({
  name: "popularSeries",
  components: {
    ItemCard,
  },
  props: {
    list: {
      type: Array as PropType<PopularSeriesProps[]>,
      require: true,
    },
  },
});
</script>

<style scoped>


</style>