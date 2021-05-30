<template>
  <div id="user-info-wrapper">
    <Wrapper full>
      <Wrapper id="icon-wrapper" @click="changeShowInfo(userIcon)">
        <span class="material-icons icon blue" id="user-icon" ref="userIcon">
          account_circle
        </span>
      </Wrapper>

      <Wrapper direction="column" jusitfy="center" id="info-wrapper" :class="{ hide: !showInfo }">
        <label>
          {{ userData.name }}
        </label>
        <label id="user-email">
          {{ userData.email }}
        </label>
      </Wrapper>
    </Wrapper>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Wrapper from '@/components/Layout/Wrapper.vue';

export default {
  name: 'UserInfo',
  components: { Wrapper },
  setup() {
    const store = useStore();
    const showInfo = ref(false);
    const userData = computed(() => store.getters['user/getUserData']);
    const userIcon = ref<HTMLElement | null>(null);
    const disabledButton = ref(false);

    const changeShowInfo = async (icon: any): Promise<void> => {
      const isDisabled = disabledButton.value;
      const wrapper = icon.parentElement;
      const iconWidth = icon.offsetWidth;

      if (!isDisabled) {
        disabledButton.value = true;
        if (!showInfo.value) {
          wrapper.style.setProperty('width', `${iconWidth}px`);
          setTimeout(() => {
            showInfo.value = true;
            disabledButton.value = false;
          }, 1000);
        } else {
          showInfo.value = false;
          wrapper.style.setProperty('width', '100%');
          disabledButton.value = false;
        }
      }
    };

    return { userData, showInfo, changeShowInfo, userIcon };
  },
};
</script>

<style lang="scss" scoped>
#user-info-wrapper {
  display: flex;
  justify-content: center;
  color: $dark-blue;
}

#icon-wrapper {
  height: 50px;
  transition: all 1s;
  align-items: center;
  justify-content: center;
  width: 100%;
}

#info-wrapper {
  height: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

#user-icon {
  position: relative;
  font-size: 2rem;
  padding: 0.5rem;
}

#user-email {
  font-size: 0.7rem;
  display: flex;
  align-items: flex-end;
}
</style>
