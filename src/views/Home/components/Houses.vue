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
import { onMounted, ref, watch, inject } from 'vue';
import { Select } from '@/components/Inputs';
import { Data, SetupContext } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';
import { FormHandler } from '@/composition/houses';
import { getOptions, getSelectedItem, selectItem } from '@/composition/setups/items-list';

export default {
  name: 'Houses',
  props: {
    selectDisabled: Boolean,
  },
  components: { Select, MessageBox },
  setup(props: Data, { emit }: SetupContext): Data {
    const formHandler: FormHandler | undefined = inject('formHandler');
    const options = getOptions(formHandler);
    const selectedHouse = getSelectedItem();
    const selectInput = ref<any>(null);

    const handleSelect = (house: any) => {
      selectItem(house, formHandler);
    };

    onMounted(() => {
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
