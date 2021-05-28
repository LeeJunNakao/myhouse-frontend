<template>
  <div>
    <Page>
      <Panel>
        <UserInfo />
        <UserHouses />
      </Panel>
    </Page>
  </div>
</template>

<script>
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import UserInfo from './components/UserInfo.vue';
import UserHouses from './components/UserHouses.vue';

export default {
  name: 'Home',
  components: {
    Page,
    Panel,
    UserInfo,
    UserHouses,
  },
};
</script>
