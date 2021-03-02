<template>
  <div class="grid grid-cols-8 gap-4">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
export default defineComponent({
  name: "popularList",
});
</script>

<style scoped>
</style>