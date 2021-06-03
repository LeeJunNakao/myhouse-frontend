<template>
  <Select v-if="options.length" />
  <MessageBox v-else text="Não há nenhum registro de compra para esta casa" />
</template>

<script lang="ts">
import { ref } from 'vue';
import { Select } from '@/components/Inputs';
import { Data } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';

export default {
  name: 'Purchase',
  components: {
    Select,
    MessageBox,
  },
  setup(): Data {
    const options = ref([]);

    return { options };
  },
};
</script>

<style></style>
