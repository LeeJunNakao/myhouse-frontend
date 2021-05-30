<template>
  <div class="home-wrapper">
    <Page>
      <Panel>
        <UserInfo />
        <UserHouses @handleSelect="handleSelect" />
        <Buttons :setShowForm="setShowForm" :showForm="showForm" :selectedHouse="selectedHouse" />
        <Form :showForm="showForm" />
      </Panel>
    </Page>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Data } from '@/protocols/composition';
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import UserInfo from './components/UserInfo.vue';
import UserHouses from './components/UserHouses.vue';
import Buttons from './components/Buttons.vue';
import Form from './components/Form.vue';

export default {
  name: 'Home',
  components: {
    Page,
    Panel,
    UserInfo,
    UserHouses,
    Buttons,
    Form,
  },
  setup(): Data {
    const showForm = ref(false);
    const selectedHouse = ref(null);

    const setShowForm = (show: boolean) => {
      showForm.value = show;
    };

    const handleSelect = (value: any) => {
      selectedHouse.value = value;
    };

    onMounted(() => {
      watch(
        selectedHouse,
        (s) => {
          console.log('watch', s);
        },
        { immediate: true },
      );
    });

    return {
      setShowForm,
      showForm,
      handleSelect,
      selectedHouse,
    };
  },
};
</script>

<style scoped lang="scss">
.home-wrapper::v-deep {
  width: 100vw;

  .title-wrapper {
    margin-bottom: 2rem;
  }

  .message {
    margin-top: 1rem;
  }
}
</style>
