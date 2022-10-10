<template>
  <Suspense>
    <AsyncShowView #default />
    <template #fallback>
      <TheSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import AsyncShowView from '../components/AsyncShowView.vue';
import TheSpinner from '../components/TheSpinner.vue';
</script>