<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed navbar">
    <div class="max-w-8xl mx-auto pl-8">
      <div
        class="flex justify-between items-center py-5 md:justify-start md:space-x-10"
      >
        <nav class="hidden md:flex space-x-10">
          <a href="#" class="text-base font-medium text-white"> Moives </a>
          <a href="#" class="text-base font-medium text-white"> Tv-Series </a>
          <a href="#" class="text-base font-medium text-white"> Animes </a>
          
        </nav>
        <input
            type="text"
            name="price"
            id="price"
            class=" pl-2 pr-12 rounded-md h-8 search focus:outline-none "
            placeholder="search something enter"
          />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "navbar",
});
</script>

<style scoped>
.navbar {
  background: #121212;
  z-index: 2;
  width: 100%;
}
.search {
  position: absolute;
  right: 100px;
}
</style>