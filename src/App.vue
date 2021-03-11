<template>
  <div>
    <navbar />
    <router-view class="pt-16" v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
      </suspense>
    </router-view>
    <footer class="h-60 block text-white text-1xl flex justify-center p-10">
      <div class="flex flex-row justify-even">
        <div
          v-for="item in footerItems"
          :key="item.title"
          class="item social mr-20 text-left"
        >
          <h3 class="mb-2 font-bold">
            <span>{{ item.title }}</span>
          </h3>
          <p class="mb-2" v-for="v in item.items" :key="v.name">
            <a :href="v.url" target="_blank">{{ v.name }}</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
const items = [
  {
    title: "Developer social media",
    items: [
      {
        name: "Github",
        url: "https://github.com/BarrySong97",
      },
      {
        name: "Juejin",
        url: "https://juejin.cn/user/2049145406506856",
      },
    ],
  },
  {
    title: "Third party Api",
    items: [
      {
        name: "Jikan",
        url: "https://jikan.moe/",
      },
      {
        name: "Imdb-Api",
        url: "https://jikan.moe/",
      },
    ],
  },
  {
    title: "Used third library",
    items: [
      {
        name: "Vue family",
        url: "",
      },
      {
        name: "Tailwind",
        url: "",
      },
    ],
  },
];
export default defineComponent({
  name: "App",
  data() {
    return {
      footerItems: items,
    };
  },
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
