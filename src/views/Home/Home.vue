<template>
  <div>
    <Page>
      <Panel>
        <UserInfo />
      </Panel>
    </Page>
  </div>
</template>

<script>
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import UserInfo from './components/UserInfo.vue';

export default {
  name: 'Home',
  components: {
    Page,
    Panel,
    UserInfo,
  },
};
</script>
