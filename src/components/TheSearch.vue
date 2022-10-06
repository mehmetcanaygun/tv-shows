<template>
  <div class="py-8">
    <div class="container">
      <input
        type="text"
        :value="this.searchText"
        @input="e => this.onSearchTextChange(e.target.value)"
        placeholder="Search for a TV Show..."
        class="w-full mb-12 text-center bg-transparent text-2xl py-2 border-solid border-0 border-b-2 border-light focus:outline-none focus:border-secondary"
      />

      <div
        v-if="this.searchResults.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8"
      >
        <SearchResultCard
          v-for="result in this.searchResults"
          :key="result.id"
          :result="result"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchResultCard from "./SearchResultCard.vue";
import axios from "axios";

let searchTimeout;

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

export default {
  data() {
    return {
      searchText: "",
      searchResults: [],
    };
  },
  methods: {
    onSearchTextChange(val) {
      this.searchText = val;
      // Reset timeout so that it'll only look for the full input instead of each input change
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(async () => {
        this.searchResults = await searchShow(this.searchText);
      }, 600);
    },
  },
  components: { SearchResultCard },
};
</script>