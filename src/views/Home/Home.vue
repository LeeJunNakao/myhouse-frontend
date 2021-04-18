<template>
  <div>s: {{ userData }}</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();

    const userData = computed(() => store.getters['user/getName']);

    return { userData };
  },
};
</script>

<style>

</style>
