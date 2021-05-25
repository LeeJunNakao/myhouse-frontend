<template>
  <div>
    <Page>
      <Panel>
        <div class="icon-wrapper">
          <Wrapper justify="space-between" full>
            <span class="material-icons icon blue">
              account_circle
            </span>
            <label class="user-info mytext">
              {{ userData }}
            </label>
          </Wrapper>
        </div>
      </Panel>
    </Page>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Page from '@/components/Page/Page.vue';
import Panel from '@/components/Panel/Panel.vue';
import Wrapper from '@/components/Layout/Wrapper.vue';

export default {
  name: 'Home',
  components: {
    Page,
    Panel,
    Wrapper,
  },
  setup() {
    const store = useStore();

    const userData = computed(() => store.getters['user/getName']);

    return { userData };
  },
};
</script>
