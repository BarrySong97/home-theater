<template>
  <div>
    <navbar />
    <router-view class="pt-16"/>
    <footer
      class="h-60 block text-white text-1xl flex justify-center p-10"
    >
    <div class="flex flex-row justify-even">
        <div class="item social mr-20 text-left ">
        <h3 class="mb-2 font-bold">
          <span>Developer social media</span>
        </h3>
        <p class="github mb-2">
          <a>Github</a>
        </p>
        <p class="weibo mb-2">
          <a>Weibo</a>
        </p>
        <p class="juejin mb-2">
          <a>Juejin</a>
        </p>
        <p class="zhihu mb-2">
          <a>Juejin</a>
        </p>
      </div>
      <div class="item third-api mr-20 text-left">
         <h3 class="mb-2 font-bold">
           <span>Third party Api</span>
        </h3>
        <p class="mb-2">
          <a>Jikan</a>
        </p>
        <p class="mb-2">
          <a>Imdb-Api</a>
        </p>
      </div>
      <div class="library mr-20 text-left">
        <h3 class="mb-2 font-bold">
          <span>Used third library</span>
        </h3>
        <p class="mb-2">
          <a>Vue3 family</a>
        </p>
        <p class="mb-2">
          <a>Tailwind</a>
        </p>
      </div>
    </div>
    
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
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
  background-color: #000000;
}
footer {
  background: #121212;
}
</style>
