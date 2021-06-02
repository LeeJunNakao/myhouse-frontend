<template>
  <div>
    <Select
      v-if="options.length"
      placeholder="Selecione uma casa"
      :options="options"
      :disabled="selectDisabled"
      @handleSelect="handleSelect"
      ref="selectInput"
    />
    <MessageBox v-else text="Não há nenhuma casa cadastrada" />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch, inject } from 'vue';
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
    const formHandler: FormHandler | undefined = inject('formHandler');
    const options = computed(() => {
      const houses = formHandler?.getHouses() || [];
      return houses.map((h: House) => ({ ...h, label: h.name }));
    });
    const selectInput = ref<any>(null);
    const selectedHouse = computed(() => formHandler?.getSelectedHouse());

    const handleSelect = (house: any) => {
      formHandler?.selectHouse(house);
    };

    onMounted(async () => {
      watch(
        selectedHouse,
        (house) => {
          if (selectInput.value) {
            selectInput.value.searchValue = house?.name || '';
          }
        },
        { immediate: true, deep: true },
      );
    });

    return { handleSelect, options, selectInput };
  },
};
</script>
