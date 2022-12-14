<template>
  <!-- Poster & Main info -->
  <div
    :style="{ backgroundImage: `url(${bg})` }"
    class="show-background h-72 flex flex-col justify-end mb-6"
  >
    <div class="h-2/3 bg-gradient-to-t from-black to-transparent">
      <div class="container h-full pb-4 flex flex-col justify-end">
        <!-- Title & Favourite button -->
        <div class="flex justify-between">
          <h1 class="text-4xl mb-2">{{ show.name }}</h1>

          <button class="text-xl text-secondary" @click="toggleFavourite(show)">
            <i v-if="isFavourited" class="fa-solid fa-heart"></i>
            <i v-else class="fa-regular fa-heart"></i>
          </button>
        </div>

        <!-- Country & Channel -->
        <p v-if="show.network" class="mb-1">
          <span class="mr-3"
            ><i class="fa-solid fa-globe text-primary"></i>
            {{ show.network.country.name }}</span
          >
          <span
            ><i class="fa-solid fa-tv text-primary"></i>
            {{ show.network.name }}</span
          >
        </p>

        <!-- Genres -->
        <ul v-if="show.genres" class="flex text-[12px] gap-1 flex-wrap">
          <li
            v-for="genre in show.genres"
            :key="genre"
            class="px-1 rounded bg-primary text-dark"
          >
            {{ genre }}
          </li>
        </ul>
        <p></p>
      </div>
    </div>
  </div>

  <!-- Summary -->
  <div v-if="show.summary" class="container mb-8 relative">
    <p
      class="md:text-xl pl-4 text-justify before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-secondary before:rounded"
    >
      {{ formatSummary(show.summary, false) }}
    </p>
  </div>

  <!-- Seasons -->
  <div class="container mb-8">
    <h2 class="text-2xl text-primary mb-4">Seasons</h2>

    <ul class="flex gap-5 overflow-x-auto pb-4">
      <li
        v-for="season in seasons"
        class="season-background w-48 flex-shrink-0 flex flex-col"
      >
        <!-- Image container -->
        <div
          class="relative mb-1 cursor-pointer"
          @click="onSeasonClick(season)"
        >
          <!-- Actual image -->
          <img
            v-if="season.image"
            :src="season.image.medium"
            alt="Season poster"
            class="w-full aspect-square object-cover rounded-xl shadow-md"
          />

          <!-- Image placeholder -->
          <div
            v-else
            class="w-full aspect-square rounded-xl bg-dark flex justify-center items-center shadow-md"
          ></div>

          <!-- Season number -->
          <div
            class="absolute top-0 left-0 w-full aspect-square rounded-xl flex flex-col justify-center items-center bg-black/60"
          >
            <p class="text-8xl">{{ season.number }}</p>
          </div>
        </div>

        <!-- Premiere & End dates -->
        <div class="text-center text-sm text-secondary">
          <p v-if="season.premiereDate">
            {{ formatDate(season.premiereDate) }}
          </p>
          <p v-if="season.endDate">{{ formatDate(season.endDate) }}</p>
        </div>
      </li>
    </ul>
  </div>

  <!-- Cast -->
  <div class="container mb-6">
    <h2 class="text-2xl text-primary mb-4">Cast</h2>

    <ul class="flex gap-5 overflow-x-auto pb-4">
      <li
        v-for="member in cast"
        class="season-background w-48 flex-shrink-0 flex flex-col"
      >
        <!-- Image container -->
        <div class="relative mb-1">
          <!-- Actual image -->
          <img
            v-if="member.person.image"
            :src="member.person.image.medium"
            alt="Actor image"
            class="w-full aspect-square object-cover rounded-full shadow-md"
          />

          <!-- Image placeholder -->
          <div
            v-else
            class="w-full aspect-square rounded-full bg-black flex justify-center items-center shadow-md"
          ></div>
        </div>

        <!-- Actor & Character -->
        <div class="text-center">
          <p>{{ member.person.name }}</p>
          <p class="text-sm text-secondary">{{ member.character.name }}</p>
        </div>
      </li>
    </ul>
  </div>

  <!-- Seasons & Episodes modal -->
  <TheModal
    v-if="selectedSeason"
    :modalActive="modalActive"
    @close-modal="setModalActive(false)"
  >
    <SeasonModal :selectedSeason="selectedSeason" />
  </TheModal>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import TheModal from "../layout/TheModal.vue";
import SeasonModal from "./SeasonModal.vue";
import { formatSummary, formatDate } from "../../utils";
import bgPlaceholder from "../../assets/bg-placeholder.jpg";

const route = useRoute();

const isFavourited = ref(false);
const modalActive = ref(null);
const selectedSeason = ref(null);

const getShow = async () => {
  const URL = "https://api.tvmaze.com/shows";
  const showId = route.params.id;

  const showRequests = [
    axios.get(`${URL}/${showId}`),
    axios.get(`${URL}/${showId}/seasons`),
    axios.get(`${URL}/${showId}/cast`),
    axios.get(`${URL}/${showId}/images`),
  ];

  try {
    const responses = await Promise.all(showRequests);

    return responses.map(({ data }) => data);
  } catch (error) {
    console.error(error);

    return [];
  }
};

const [show, seasons, cast, images] = await getShow();
const bg =
  images.find((img) => img.type === "background")?.resolutions?.original?.url ||
  bgPlaceholder;

// Check if show was favourited before
if (localStorage.getItem("mca-tv-shows")) {
  const savedShows = JSON.parse(localStorage.getItem("mca-tv-shows"));

  isFavourited.value = !!savedShows.find((s) => s.id === show.id);
}

console.log("isFavourited: ", isFavourited.value);
console.log("show: ", show);
console.log("seasons: ", seasons);
console.log("cast: ", cast);
console.log("images: ", images);
console.log("bg: ", bg);

const onSeasonClick = async (season) => {
  setModalActive(true);

  // Fetch season episode info
  try {
    const { data } = await axios.get(
      `https://api.tvmaze.com/seasons/${season.id}/episodes`
    );

    selectedSeason.value = { ...season, episodes: data };
  } catch (error) {
    selectedSeason.value = { ...season, episodes: [] };
  }
};

const setModalActive = (condition) => {
  modalActive.value = condition;

  if (!condition) selectedSeason.value = null;
};

const toggleFavourite = (show) => {
  const savedShows = JSON.parse(localStorage.getItem("mca-tv-shows"));

  if (!!savedShows) {
    if (isFavourited.value) {
      // Remove from favourited shows
      const formatted = savedShows.filter((s) => s.id !== show.id);

      localStorage.setItem("mca-tv-shows", JSON.stringify(formatted));

      isFavourited.value = false;
    } else {
      // Add to favourited shows
      localStorage.setItem(
        "mca-tv-shows",
        JSON.stringify([...savedShows, show])
      );

      isFavourited.value = true;
    }
  } else {
    // There's no localStorage. Adding the first time here.
    // Add to favourited shows
    localStorage.setItem("mca-tv-shows", JSON.stringify([show]));

    isFavourited.value = true;
  }
};
</script>

<style>
.show-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 25%;
}

.season-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
