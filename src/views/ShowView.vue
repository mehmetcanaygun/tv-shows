<template>
  <Suspense>
    <AsyncShowView #default />
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncShowView from '../components/AsyncShowView.vue';
</script>