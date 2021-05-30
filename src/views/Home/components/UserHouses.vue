<template>
  <div>
    <Select
      v-if="options.length"
      placeholder="Selecione uma casa"
      @handleSelect="handleSelect"
      :options="options"
    />
    <MessageBox v-else text="Não há nenhuma casa cadastrada" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Select } from '@/components/Inputs';
import { Data, SetupContext } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';

const OPTIONS: any[] = [
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
];

export default {
  name: 'UserHouses',
  components: {
    Select,
    MessageBox,
  },
  setup(props: Data, { emit }: SetupContext): Data {
    const options = ref(OPTIONS);
    const hideNewHouse = ref(false);

    const handleSelect = (value: any) => {
      emit('handleSelect', value);
    };

    const handleNewHouse = () => {
      hideNewHouse.value = true;
    };

    return {
      handleSelect,
      options,
      handleNewHouse,
      hideNewHouse,
    };
  },
};
</script>
