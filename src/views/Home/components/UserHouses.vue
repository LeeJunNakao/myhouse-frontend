<template>
  <div>
    <Select
      v-if="options.length"
      placeholder="Selecione uma casa"
      :options="options"
      :disabled="selectDisabled"
      @handleSelect="handleSelect"
    />
    <MessageBox v-else text="Não há nenhuma casa cadastrada" />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { Select } from '@/components/Inputs';
import { Data, SetupContext } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';
import { FormHandler } from '@/functions/houses';
import { House } from '@/protocols/domain/House';

export default {
  name: 'UserHouses',
  props: {
    selectDisabled: Boolean,
  },
  components: { Select, MessageBox },
  setup(props: Data, { emit }: SetupContext): Data {
    const store = useStore();
    const formHandler = new FormHandler(store);
    const options = computed(() => {
      const houses = formHandler.getHouses();
      return houses.map((h: House) => ({ ...h, label: h.name }));
    });

    const handleSelect = (house: any) => {
      formHandler.selectHouse(house);
    };

    return { handleSelect, options };
  },
};
</script>
