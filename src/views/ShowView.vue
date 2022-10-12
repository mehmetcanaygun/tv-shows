<template>
  <Suspense>
    <AsyncShowView #default />
    <template #fallback>
      <TheSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import AsyncShowView from "../components/show/AsyncShowView.vue";
import TheSpinner from "../components/layout/TheSpinner.vue";
</script>
