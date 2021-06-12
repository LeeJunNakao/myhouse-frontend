<template>
  <Wrapper full direction="column">
    <Wrapper
      grid
      templateColumns="1fr 1fr 1fr"
      align="center"
      full
      gapColumns="0.5rem"
      class="filter-wrapper"
    >
      <Wrapper full class="period">Período</Wrapper>
      <Wrapper full
        ><Select
          placeholder="MÊS"
          :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          ref="monthFilter"
          block
      /></Wrapper>
      <Wrapper full
        ><Select placeholder="ANO" :options="yearOptions" ref="yearFilter" block
      /></Wrapper>
    </Wrapper>
    <MessageBox v-if="!filteredPurchases.length" text="Não há compras para esse período." />
    <Wrapper class="list-wrapper" grid :class="{ 'deleting-wrapper': isDeleting }" v-else>
      <Wrapper
        full
        class="head"
        grid
        templateColumns="1fr 1fr 1fr"
        :class="{ 'deleting-wrapper': isDeleting }"
      >
        <Wrapper justify="center">Data</Wrapper>
        <Wrapper justify="center">Descrição</Wrapper>
        <Wrapper justify="center">Valor</Wrapper>
      </Wrapper>
      <Wrapper
        full
        class="item"
        :class="{
          selected: selectedPurchase && purchase.id === selectedPurchase.id,
          deleting: isDeleting && selectedPurchase && purchase.id === selectedPurchase.id,
        }"
        v-for="purchase in filteredPurchases"
        :key="purchase.id"
        :data-id="purchase.id"
        @click="selectPurchase(purchase)"
        templateColumns="1fr 1fr 1fr"
        gapColumns=".5rem"
        align="center"
      >
        <Wrapper full justify="center">{{ purchase.date }}</Wrapper>
        <Wrapper full justify="center">{{ purchase.description }}</Wrapper>
        <Wrapper full justify="start">{{ purchase.value }}</Wrapper>
      </Wrapper>
    </Wrapper>
    <Wrapper full class="list-wrapper total-wrapper" justify="space-between">
      <Wrapper>Total</Wrapper>
      <Wrapper data-class="purchases-total">{{ currencyFormater(total) }}</Wrapper>
    </Wrapper>
  </Wrapper>
</template>

<script lang="ts">
import { inject, computed, nextTick, ref, onMounted } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { FormHandler } from '@/composition/purchases';
import { Purchase } from '@/protocols/domain/Purchase';
import { Data } from '@/protocols/composition';
import { useRoute } from 'vue-router';
import { currencyFormater } from '@/composition/formater';
import { getDateElements, fromCurrencyToNumber } from '@/composition/parser';
import { Select } from '@/components/Inputs';
import MessageBox from '@/components/MessageBox/MessageBox.vue';

interface ParsedPurchases {
  id: number;
  date: string;
  value: string;
  description: string;
}

export default {
  name: 'PurchaseList',
  components: {
    Wrapper,
    Select,
    MessageBox,
  },
  props: {
    purchases: Array,
  },
  setup(props: Data): Data {
    const route = useRoute();
    const formHandler = inject<FormHandler>('formHandler');
    const selectedPurchase = computed<Purchase | null>(
      () => formHandler?.getSelectedItem() || null,
    );
    const selectPurchase = async (purchase: Purchase) => {
      formHandler?.selectItem(null);
      await nextTick();
      formHandler?.selectItem(purchase);
    };
    const isDeleting = inject<boolean>('isDeleting');

    const purchases = computed(() => props.purchases);

    const monthFilter = ref(null);
    const yearFilter = ref(null);

    const filters = computed(() => ({
      month: (monthFilter.value as any)?.searchValue || '',
      year: (yearFilter.value as any)?.searchValue,
    }));

    const filteredPurchases = computed(() => {
      const { month, year } = filters.value;
      if (month && year) {
        const filteredIds =
          purchases.value
            ?.map((i: ParsedPurchases) => ({
              ...i,
              date: getDateElements(i.date),
            }))
            .filter((i: any) => {
              return Number(i.date.month) === Number(month) && Number(i.date.year) === Number(year);
            })
            .map((i: any) => i.id) || [];
        const filtered = purchases.value?.filter((p: any) => filteredIds.includes(p.id)) || [];
        return filtered;
      }
      return [];
    });

    const total = computed(() => {
      const filteredValues = filteredPurchases.value.map((p: ParsedPurchases) => {
        return fromCurrencyToNumber(p.value);
      });
      if (filteredValues.length) {
        return filteredValues.reduce((acc: number, curr: number) => acc + curr);
      }
      return 0;
    });

    const yearOptions = computed(() => {
      const currentYear = new Date(Date.now()).getFullYear();
      const initialYear = 2000;
      const years = [...new Array(currentYear - initialYear).keys()].map(
        (i) => i + initialYear + 1,
      );
      const options = [initialYear, ...years].reverse();
      return options;
    });

    onMounted(() => {
      if (monthFilter.value) {
        (monthFilter.value as any).searchValue = new Date(Date.now()).getMonth() + 1;
      }

      if (yearFilter.value) {
        (yearFilter.value as any).searchValue = new Date(Date.now()).getFullYear();
      }
    });

    return {
      selectedPurchase,
      isDeleting,
      total,
      monthFilter,
      yearFilter,
      yearOptions,
      filteredPurchases,
      selectPurchase,
      currencyFormater,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  margin-top: 1rem;

  .period {
    align-items: center;
    height: 100%;
    border-radius: $border-radius;
    background-color: $dark-blue;
    color: white;
    justify-content: center;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
}

.selected {
  background-color: $blue;
}
.list-wrapper {
  border: $border-width solid $dark-blue;
  border-radius: $border-radius;
  margin-top: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}

.head {
  height: 2rem;
  align-items: center;
  border-bottom: 0.2rem solid $blue;
}

.item {
  font-size: 0.8rem;
  height: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &:hover {
    cursor: pointer;
  }

  div {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  & > div:nth-child(3) {
    text-align: right;
    padding-right: 0.5rem;
  }
}

.deleting {
  background-color: $light-red;

  color: white;
}

.deleting-wrapper {
  border-color: $red !important;
}

.total-wrapper {
  padding: 0.5rem;
}
</style>
