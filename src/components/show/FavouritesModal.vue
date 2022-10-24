<template>
  <div class="h-full flex flex-col">
    <h2 class="text-3xl mb-6">My Favourites</h2>

    <hr />

    <!-- Sort -->
    <div class="mt-4 mb-1 flex gap-4">
      <!-- Genre -->
      <div class="flex flex-col gap-1">
        <label class="text-sm text-primary">Sort by genre</label>

        <select
          class="text-dark w-32 md:w-56 p-1 rounded"
          @change="(e) => sortByGenre(e.target.value)"
        >
          <option disabled selected value="0">Select genre</option>
          <option v-for="genre in genres" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <!-- Alphabetical -->
      <div class="flex flex-col gap-1">
        <label class="text-sm text-primary">Sort by alphabetical order</label>

        <select
          class="text-dark w-32 md:w-56 p-1 rounded"
          @change="(e) => sortByAlphabeticalOrder(e.target.value)"
        >
          <option disabled selected value="0">Select alphabetical order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- Sort info -->
    <p v-if="sortBy" class="text-sm text-primary mb-4">
      Sorted by {{ sortBy }}
    </p>

    <!-- List -->
    <ul class="flex-1 overflow-y-auto my-4 pr-3">
      <li
        v-for="show in showList"
        class="py-2 border-b last:border-b-0 border-black flex items-center"
      >
        <!-- Image -->
        <img
          v-if="show.image"
          :src="show.image.medium"
          alt="Show poster"
          class="w-12 h-12 md:w-20 md:h-20 object-cover border-2 border-primary rounded-full mr-3"
        />

        <!-- Info -->
        <div>
          <p
            class="text-md md:text-2xl text-primary hover:text-light cursor-pointer"
            @click="viewDetail(show.id)"
          >
            {{ show.name }}
          </p>
          <p class="flex gap-1">
            <span
              v-for="genre in show.genres"
              class="text-[10px] md:text-sm bg-primary text-dark px-2 rounded"
              >{{ genre }}</span
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  favouritedShows: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["close-modal"]);

const genres = [
  ...new Set(
    props.favouritedShows
      .map((show) => show.genres.join(","))
      .join(",")
      .split(",")
  ),
];

const showList = ref([...props.favouritedShows]);
const sortBy = ref("");

const sortByGenre = (val) => {
  showList.value = showList.value.sort((a, b) =>
    a.genres.includes(val) ? -1 : 1
  );

  sortBy.value = `${val}`;
};

const sortByAlphabeticalOrder = (val) => {
  showList.value = showList.value.sort((a, b) => {
    if (val === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  sortBy.value = `alphabetic order ${
    val === "asc" ? "(ascending)" : "(descending)"
  }`;
};

const viewDetail = (id) => {
  router.push({
    name: "show",
    params: { id },
  });

  emit("close-modal");
};
</script>
