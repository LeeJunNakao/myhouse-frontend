<template>
  <Page>
    <Panel>
      <UserInfo />
      <Purchases />
      <Form />
    </Panel>
  </Page>
</template>

<script>
import { provide } from 'vue';
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

    provide('formHandler', formHandler);
    provide('serviceHandler', serviceHandler);
  },
};
</script>

<style></style>
