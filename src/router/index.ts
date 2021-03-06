import { createRouter, createWebHashHistory } from "vue-router";
import FilmDetail from "../views/FilmDetail/index.vue";
import Index from "../views/Home/index.vue";
const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/filmDetail/:id", component: FilmDetail },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
