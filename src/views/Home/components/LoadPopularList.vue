<template>
  <div>
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">
        Now Pouplar - Tv Series
      </p>
      <div class="grid grid-cols-8 gap-4">
        <div v-for="i in 8" :key="i" class="flex flex-col card">
          <div class="item rounded-md"></div>
        </div>
      </div>
    </div>
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">Now Pouplar - Moive</p>
      <div class="grid grid-cols-8 gap-4">
        <div v-for="i in 8" :key="i" class="flex flex-col card">
          <div class="item rounded-md"></div>
        </div>
      </div>
    </div>
    <div class="mb-14">
      <p class="list-title flex justify-start font-bold">Now Pouplar - Anime</p>
      <div class="grid grid-cols-8 gap-4">
        <div v-for="i in 8" :key="i" class="flex flex-col card">
          <div class="item rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
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
  background: linear-gradient(
    135deg,
    rgb(100, 107, 106),
    rgb(67, 73, 75),
    rgb(48, 45, 59),
    rgb(49, 33, 44)
  );
  background-size: 200% 200%;
  animation: gradient-move 15s ease alternate infinite;
}

@keyframes gradient-move {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.card:hover .item {
  background-color: rgba(0, 0, 0, 0.4);
  background-blend-mode: multiply;
  transform: translateY(-16px);
}
</style>