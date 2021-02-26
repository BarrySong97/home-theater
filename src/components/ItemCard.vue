<template>
  <div class="item flex justify-end flex-col" :style="bgStyle">
    <div class="item-info">
      <p class="full-title">{{ fullTile }}</p>
    </div>
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
    fullTile: {
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
  height: 200px;
  width: 160px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.item-info {
  margin-bottom: 8px;
  transform: translateY(100px);
  transition: transform 0.5s linear;
}

.full-title {
  color: white;
}

.item:hover .item-info {
  transform: translateY(-16px);
}

.item:hover {
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: multiply;
}
</style>