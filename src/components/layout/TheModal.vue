<template>
  <div
    v-show="modalActive"
    :style="{ top: `${windowTop}px` }"
    class="overflow-hidden absolute left-0 w-screen h-screen bg-black/80 flex justify-center items-center"
  >
    <!-- Content -->
    <div
      class="w-full h-full md:w-2/3 md:h-[90%] bg-dark md:rounded-xl py-8 px-2 md:px-6"
    >
      <slot />
    </div>

    <!-- Close button -->
    <button
      @click="$emit('close-modal')"
      class="w-10 aspect-square absolute top-0 md:top-4 right-0 md:right-4"
    >
      <i class="fa-solid fa-xmark text-3xl text-secondary"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

defineEmits(["close-modal"]);
const props = defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

const windowTop = ref(0);

watch(
  () => props.modalActive,
  (prop, prevProp) => {
    console.log("prop: ", prop);
    console.log("prev prop: ", prevProp);
  }
);

document.addEventListener("scroll", () => (windowTop.value = window.scrollY));
</script>

<style lang="scss" scoped></style>
