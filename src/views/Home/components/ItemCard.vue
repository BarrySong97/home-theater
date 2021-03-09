<template>
  <div class="flex flex-col card">
    <div class="item rounded-md" :style="bgStyle"></div>
    <p class="full-title absolute text-center">{{ fullTitle }}</p>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "itemCard",
  props: {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    fullTitle: {
      type: String,
      require: true,
    },
    poster: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const bgStyle = {
      backgroundImage: `url(${props.poster}) `,
    };

    return {
      bgStyle,
    };
  },
});
</script>

<style scoped>
.item {
  height: 220px;
  width: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}

.full-title {
  width: 150px;
  transform: translateY(140px);
  z-index: 0;
  color: black;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05);
}

.card:hover .full-title {
  transform: translateY(100px);
  z-index: 1;
  color: white;
}

.card:hover .item {
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: multiply;
  transform: translateY(-16px);
}
</style>