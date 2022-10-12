<script setup>
import TheNavbar from "./components/layout/TheNavbar.vue";
</script>

<template>
  <div
    class="bg-dark text-light w-full min-h-screen overflow-x-hidden font-Raleway"
  >
    <TheNavbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
