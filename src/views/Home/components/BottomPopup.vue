<template>
  <div
    class="bottomPopup flex flex-1 w-full justify-start flex-row p-8 bg-gray-800"
  >
    <img :src="poster" class="poster" alt="" />
    <div class="detail flex flex-col ml-4 text-white">
      <div class="wiki w-8/12 text-white flex flex-col justify-between">
        <p class="text-left text-justify">
          {{ wiki }}
        </p>
        <button
          @click.prevent="onClick(id)"
          class="bg-purple-800 block w-28 focus:outline-none rounded-full py-3 px-6"
        >
          查看详情
        </button>
      </div>
    </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "bottomPopup",
  props: {
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
    id: {
      type: String,
      reuqired: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick(id: string) {
      this.$router.push(`/filmDetail/${this.type}/${id}`);
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