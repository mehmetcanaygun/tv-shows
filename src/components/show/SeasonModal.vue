<template>
  <div class="h-full flex flex-col">
    <!-- Season title -->
    <h2 class="text-3xl mb-6">
      Season
      <span v-if="selectedSeason.number" class="text-secondary">{{
        selectedSeason.number
      }}</span>
      <span v-if="selectedSeason.name" class="text-secondary">
        - {{ selectedSeason.name }}</span
      >
    </h2>

    <hr />

    <!-- Season summary -->
    <p v-if="selectedSeason.summary" class="my-4 text-justify">
      {{ formatSummary(selectedSeason.summary, false) }}
    </p>

    <!-- Episodes -->
    <div
      v-if="selectedSeason.episodes && selectedSeason.episodes.length > 0"
      class="flex-1 overflow-y-auto mt-3"
    >
      <ul>
        <li
          v-for="episode in selectedSeason.episodes"
          class="py-4 first:pt-0 mr-2 border-b border-dashed border-primary last:border-b-0 text-sm"
        >
          <!-- Title -->
          <p class="mb-2">
            <span v-if="episode.number" class="text-2xl text-secondary mr-2">{{
              episode.number || "#"
            }}</span>

            <span v-if="episode.name" class="mr-2">{{ episode.name }}</span>

            <span
              v-if="episode.rating.average"
              class="px-1 rounded bg-primary text-dark"
              >{{ episode.rating.average }}</span
            >
          </p>

          <!-- Summary -->
          <p v-if="episode.summary" class="text-justify text-white/70">
            {{ formatSummary(episode.summary, false) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatSummary } from "../../utils";

defineProps({
  selectedSeason: {
    type: Object,
    default: {},
  },
});
</script>
