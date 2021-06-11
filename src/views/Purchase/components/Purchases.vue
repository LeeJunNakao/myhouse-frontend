<template>
  <PurchaseList v-if="items.length" :purchases="items" />
  <MessageBox v-else text="Não há nenhum registro de compra para esta casa" />
  <MessageBox :text="responseMessage.message" :error="responseMessage.type === 'error'" />
</template>

<script lang="ts">
import { computed, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Data } from '@/protocols/composition';
import MessageBox from '@/components/MessageBox/MessageBox.vue';
import { FormHandler } from '@/composition/purchases';
import { Purchase } from '@/protocols/domain/Purchase';
import { dateToString } from '@/composition/parser';
import PurchaseList from './PurchasesList.vue';

export default {
  name: 'Purchase',
  components: {
    MessageBox,
    PurchaseList,
  },
  setup(props: Data): Data {
    const route = useRoute();
    const houseId = computed(() => route.params.id);
    const formHandler = inject<FormHandler>('formHandler');

    const decode = (purchase: Purchase) => {
      const date = dateToString(new Date(Number(purchase.date)));
      const value = String(Number(purchase.value).toFixed(2)).replace('.', ',');

      return {
        id: purchase.id,
        date,
        value,
        description: purchase.description,
      };
    };

    const items = computed(() => {
      const purchases = formHandler?.getItems(Number(houseId.value)) || [];
      return purchases
        .sort((a, b) => (Number(a.date) < Number(b.date) ? -1 : 1))
        .map((p) => decode(p));
    });

    const responseMessage = computed(() => formHandler?.getResponseMessage());

    return { items, responseMessage };
  },
};
</script>

<style></style>
