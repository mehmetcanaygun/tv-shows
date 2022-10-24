<template>
  <header class="h-16 bg-secondary shadow-lg flex items-center">
    <div class="container flex justify-between">
      <nav class="w-full flex justify-between items-center">
        <RouterLink :to="{ name: 'home' }">
          <div class="text-2xl text-dark">
            <i class="fa-solid fa-tv"></i>
            TV Shows
          </div>
        </RouterLink>
      </nav>

      <button
        v-show="route.name !== 'show'"
        class="bg-dark flex justify-between items-center gap-2 hover:bg-light hover:text-dark rounded px-2 text-secondary duration-300"
        @click="setModalActive(true)"
      >
        <i class="fa-solid fa-heart"></i> Favourites
      </button>

      <TheModal :modalActive="modalActive" @close-modal="setModalActive(false)">
        <FavouritesModal
          :favouritedShows="favouritedShows"
          @close-modal="setModalActive(false)"
        />
      </TheModal>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import TheModal from "./TheModal.vue";
import FavouritesModal from "../show/FavouritesModal.vue";
import { ref } from "vue";

const route = useRoute();

console.log(route.name);

const modalActive = ref(false);
const favouritedShows = ref([]);

if (localStorage.getItem("mca-tv-shows")) {
  favouritedShows.value = JSON.parse(localStorage.getItem("mca-tv-shows"));
}

const setModalActive = (condition) => {
  modalActive.value = condition;
};
</script>
