<template>
  <div class="py-8">
    <div class="container relative">
      <input type="text" :value="searchText" @input="e => onSearchTextChange(e.target.value)"
        placeholder="Search for a TV Show..."
        class="w-full mb-12 text-center bg-transparent text-2xl py-2 border-solid border-0 border-b-2 border-light focus:outline-none focus:border-secondary" />

      <div v-if="searchResults.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
        <SearchResultCard v-for="result in searchResults" :key="result.show.id" :result="result" />
      </div>

      <!-- Spinner -->
      <div v-show="isLoading" class="w-10 aspect-square absolute top-0 right-0 flex justify-center items-center">
        <div class="w-7 aspect-square rounded-full border-4 border-black border-t-secondary animate-rotate-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchResultCard from "./SearchResultCard.vue";
import { ref } from "vue";
import axios from "axios";

const searchText = ref("");
const searchTimeout = ref(null);
const searchResults = ref([]);
const isLoading = ref(false);

const onSearchTextChange = (val) => {
  searchText.value = val;
  isLoading.value = true;

  // Reset timeout so that it'll only look for the full input instead of each input change
  clearTimeout(searchTimeout.value);

  searchTimeout.value = setTimeout(async () => {
    searchResults.value = await searchShow(searchText.value);

    isLoading.value = false;
  }, 600);
}

const searchShow = async (text) => {
  if (text.length > 0) {
    const URL = `https://api.tvmaze.com/search/shows?q=${text}`;

    try {
      const { data } = await axios.get(URL);
      console.log(data);

      return data;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  return [];
};
</script>