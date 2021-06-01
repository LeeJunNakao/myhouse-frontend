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
    const formHandler: FormHandler | undefined = inject('formHandler');
    const options = computed(() => {
      const houses = formHandler?.getHouses() || [];
      return houses.map((h: House) => ({ ...h, label: h.name }));
    });
    const selectInput = ref<any>(null);

    const handleSelect = (house: any) => {
      formHandler?.selectHouse(house);
    };

    onMounted(async () => {
      watch(
        selectInput,
        (input) => {
          if (input && formHandler) {
            formHandler.clearSelect = () => {
              input.searchValue = '';
            };
          }
        },
        { immediate: true },
      );
    });

    return { handleSelect, options, selectInput };
  },
};
</script>
