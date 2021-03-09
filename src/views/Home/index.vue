<template>
  <div>
    <div>
      <main class="container mx-auto flex justify-center pl-8 pr-8">
        <Suspense>
          <template #default>
            <popular-list />
          </template>
          <template #fallback> 
            <load-popular-list/>
          </template>
        </Suspense>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PopularList from "./components/PopularList.vue";
import LoadPopularList from "./components/LoadPopularList.vue";
export default defineComponent({
  name: "index",
  components: {
    PopularList,
    LoadPopularList
  },
});
</script>

<style scoped>
</style>