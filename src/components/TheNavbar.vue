<template>
  <header class="h-16 bg-secondary shadow-lg flex items-center">
    <div class="container flex">
      <nav class="w-full flex justify-between items-center">
        <RouterLink :to="{ name: 'home' }">
          <div class="text-2xl text-dark">
            <i class="fa-solid fa-tv"></i>
            TV Shows
          </div>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

