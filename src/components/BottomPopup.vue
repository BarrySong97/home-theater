<template>
  <div class="bottomPopup">
      <div class="poster"
      >
        <img :src="poster" alt="">
      </div>
      <div class="title">
          {{title}}
      </div>
      <div class="director">
          {{director}}
      </div>
      <div class="writer">
          {{writer}}
      </div>
      <div class="actors">
          <p v-for="a in actors" :key="a">{{a}}</p>
      </div>
      <div class="wiki">
          {{wiki}}
      </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "bottomPopup",
  props: {
    director: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    actors: {
      type: Array as PropType<string[]>,
      required: true,
    },
    poster: {
        type: String,
        required: true
    },
    wiki: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
  },
});
</script>

<style scoped>
.bottomPopup {
    height: 200px;
    background: white;
}
</style>