<template>
  <Page>
    <Panel>
      <UserInfo />
      <Form @setDelete="setDelete" />
      <Purchases />
    </Panel>
  </Page>
</template>

<script lang="ts">
import { provide, ref } from 'vue';
import { useStore } from 'vuex';
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import UserInfo from '@/components/UserInfo/UserInfo.vue';
import { FormHandler, ServiceHandler } from '@/composition/purchases';
import Purchases from './components/Purchases.vue';
import Form from './components/Form.vue';

export default {
  name: 'Purchase',
  components: {
    Page,
    Panel,
    UserInfo,
    Purchases,
    Form,
  },
  setup() {
    const store = useStore();
    const formHandler = new FormHandler(store);
    const serviceHandler = new ServiceHandler(store);
    const isDeleting = ref(false);

    provide('formHandler', formHandler);
    provide('serviceHandler', serviceHandler);
    provide('isDeleting', isDeleting);

    const setDelete = (value: boolean) => {
      isDeleting.value = value;
    };

    return { setDelete };
  },
};
</script>

<style></style>
