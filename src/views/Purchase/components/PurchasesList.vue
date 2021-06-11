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
      <Wrapper full><Select placeholder="MÊS" :options="[1, 2]" ref="monthFilter"/></Wrapper>
      <Wrapper full><Select placeholder="ANO" :options="[2020, 2021]" ref="yearFilter"/></Wrapper>
    </Wrapper>
    <Wrapper class="list-wrapper" grid :class="{ 'deleting-wrapper': isDeleting }">
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
        v-for="purchase in purchases"
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
      <Wrapper>{{ currencyFormater(total) }}</Wrapper>
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
import { Select } from '@/components/Inputs';

export default {
  name: 'PurchaseList',
  components: {
    Wrapper,
    Select,
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
    const purchases = computed(() => formHandler?.getItems(Number(route.params.id))).value;
    const total = computed<number>(() => {
      return purchases?.map((p) => p.value).reduce((acc, curr) => acc + curr) || 0;
    });

    const monthFilter = ref(null);
    const yearFilter = ref(null);

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
      selectPurchase,
      currencyFormater,
      monthFilter,
      yearFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter-wrapper {
  margin-top: 1rem;

  .period {
    color: $dark-blue;
    align-items: center;
    height: 100%;
  }
}

.selected {
  background-color: $blue;
}
.list-wrapper {
  border: $border-width solid $dark-blue;
  border-radius: $border-radius;
  margin-top: 1rem;
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
