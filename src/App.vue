<template>
  <div class="container mx-auto flex justify-center">
    <div>
      <p class="list-title flex justify-start">现在流行 - 电视剧</p>
      <popular-series :list="list" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import PopularSeries from "./components/PopularSeries.vue";

export default defineComponent({
  name: "App",
  components: {
    PopularSeries,
  },
  setup() {
    const popularSeries = ref([]);
    const getPopular = async () => {
      const response = await axios.get(
        "https://imdb-api.com/en/API/MostPopularTVs/k_3at9681x"
      );
      popularSeries.value = response.data.items.slice(0, 8);
    };
    onMounted(getPopular);
    return {
      list: popularSeries,
    };
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
  margin-top: 60px;
}

.list-title {
  font-weight: 400;
  font-size: 18px;
  margin:16px 0;
}
</style>
