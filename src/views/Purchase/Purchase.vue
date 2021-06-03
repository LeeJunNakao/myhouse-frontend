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
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import UserInfo from '@/components/UserInfo/UserInfo.vue';
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
};
</script>

<style></style>
