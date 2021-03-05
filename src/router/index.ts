import { createRouter, createWebHashHistory } from "vue-router";
import FilmDetail from "../views/FilmDetail.vue";
import Index from "../views/Index.vue";
const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/filmDetail/:id", component: FilmDetail },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
