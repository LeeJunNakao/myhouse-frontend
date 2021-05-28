<template>
  <div>
    <Select
      placeholder="Selecione uma casa"
      :options="[
        'casa A',
        'casa B',
        'casa C',
        'casa D',
        'casa E',
        'casa F',
        'casa G',
        'casa H',
        'casa I',
        'casa J',
        'casa K',
        'casa L',
        'casa M',
        'casa N',
        'casa O',
        'casa P',
        'casa Q',
      ]"
    />
  </div>
</template>

<script lang="ts">
import { Select } from '@/components/Inputs';

export default {
  name: 'UserHouses',
  components: {
    Select,
  },
};
</script>

<style></style>
