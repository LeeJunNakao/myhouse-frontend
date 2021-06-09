<template>
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
      <Wrapper full justify="center">{{ purchase.value }}</Wrapper>
    </Wrapper>
  </Wrapper>
</template>

<script lang="ts">
import { inject, computed, nextTick } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { FormHandler } from '@/composition/purchases';
import { Purchase } from '@/protocols/domain/Purchase';
import { Data } from '@/protocols/composition';

export default {
  name: 'PurchaseList',
  components: {
    Wrapper,
  },
  props: {
    purchases: Array,
  },
  setup(): Data {
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

    return {
      selectPurchase,
      selectedPurchase,
      isDeleting,
    };
  },
};
</script>

<style lang="scss" scoped>
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
}

.deleting {
  background-color: $light-red;

  color: white;
}

.deleting-wrapper {
  border-color: $red !important;
}
</style>
