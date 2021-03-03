<template>
  <div class="bottomPopup flex flex-1 w-full justify-start flex-row p-8 bg-gray-800">
    <img :src="poster" class="poster" alt="" />
    <div class="detail flex flex-col ml-4 text-white">
      <!-- <div class="stuff flex flex-row justify-start text-left">
        <div class="flex flex-col">
          <div>
            <div class="director mb-2">Director: {{ director }}</div>
            <div class="writer mb-2">Writer: {{ writer }}</div>
          </div>

          <div class="actors mb-2">
            Actors:
            <span v-for="a in actors" :key="a">{{ a }}</span>
          </div>
        </div>
      </div> -->

      <div class="wiki w-8/12 text-white flex flex-col justify-between">
        <p class="text-left">
          {{ wiki }}
        </p>
        <button class="bg-purple-800 block w-28 focus:outline-none rounded-full py-3 px-6">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
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
      required: true,
    },
    wiki: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.bottomPopup {
  height: 300px;
  
}

.poster {
  height: 220px;
  width: 150px;
}

.wiki {
  height: 220px;
}
</style>