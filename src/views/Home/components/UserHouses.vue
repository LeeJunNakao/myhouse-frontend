<template>
  <div>
    <Select
      v-if="options.length"
      placeholder="Selecione uma casa"
      @handleSelect="handleSelect"
      :options="options"
    />
    <MessageBox v-else text="Não há nenhuma casa cadastrada" />
    <Wrapper full align="center" justify="center" class="button-wrapper">
      <Stamp icon="cottage" text="Nova casa" />
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Select } from '@/components/Inputs';
import { Data } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Stamp from '@/components/Button/Stamp.vue';

const OPTIONS: any[] = [
  // 'casa A',
  // 'casa B',
  // 'casa C',
  // 'casa D',
  // 'casa E',
  // 'casa F',
  // 'casa G',
  // 'casa H',
  // 'casa I',
  // 'casa J',
  // 'casa K',
  // 'casa L',
  // 'casa M',
  // 'casa N',
  // 'casa O',
  // 'casa P',
  // 'casa Q',
];

export default {
  name: 'UserHouses',
  components: {
    Select,
    MessageBox,
    Wrapper,
    Stamp,
  },
  setup(): Data {
    const options = ref(OPTIONS);

    const handleSelect = (value: any) => {
      console.log('emit!!', value);
    };

    return {
      handleSelect,
      options,
    };
  },
};
</script>

<style scoped lang="scss">
.icon {
  color: $blue;
  font-size: 4rem;
}

.button-wrapper {
  margin-top: 1rem;
}
</style>
