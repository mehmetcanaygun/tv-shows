<template>
  <div
    class="rounded-md bg-primary flex flex-col overflow-hidden p-2 cursor-pointer duration-300 hover:bg-secondary group relative"
    @click="viewDetail"
  >
    <!-- Poster -->
    <div class="rounded-md overflow-hidden shadow-lg mb-2 relative group-hover:-translate-y-full group-hover:opacity-0 duration-300">
      <img
        v-if="this.result.show.image"
        :src="this.result.show.image.original"
        alt="TV show poster"
        class="w-full aspect-[3/4]"
      >
      <div
        v-else
        class="w-full aspect-[3/4] bg-dark flex justify-center items-center"
      >
        <i class="fa-solid fa-tv text-6xl text-primary"></i>
      </div>
    </div>

    <!-- Summary - Show on hover -->
    <div class="bg-dark rounded-md shadow-lg mb-2 w-[calc(100%-1rem)] aspect-[3/4] p-3 flex flex-col absolute top-2 left-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
      <p class="italic text-[10px] md:text-lg flex-1 translate-y-20 group-hover:translate-y-0 duration-300 delay-150">
        <span v-if="this.result.show.summary">{{ formatSummary(this.result.show.summary) }}</span>
        <span v-else>Summary is not found.</span>
      </p>
      <p class="text-center text-secondary text-sm md:text-lg">Click to see more <i class="fa-regular fa-hand-pointer"></i></p>
    </div>

    <!-- Title -->
    <p class="text-lg text-dark font-bold mb-2">{{ this.result.show.name }}</p>

    <!-- Genres -->
    <ul
      v-if="this.result.show.genres"
      class="flex text-[12px] gap-1 flex-wrap"
    >
      <li
        v-for="genre in this.result.show.genres"
        :key="genre"
        class="px-1 rounded bg-dark"
      >{{ genre }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["result"],
  methods: {
    viewDetail() {
      console.log("view detail");
    },
    formatSummary(summary) {
      const regex = /(<([^>]+)>)/gi;
      const withoutTags = summary.replace(regex, "");
      const shortened =
        withoutTags.length > 240
          ? `${withoutTags.substr(0, 240)}...`
          : withoutTags;
      return shortened;
    },
  },
};
</script>