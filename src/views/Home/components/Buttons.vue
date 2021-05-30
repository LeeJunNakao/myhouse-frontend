<template>
  <Wrapper full align="center" justify="space-between" class="button-wrapper">
    <transition @before-enter="enterHouse" @after-leave="leaveNewHouse" name="new-house">
      <Stamp
        icon="cottage"
        text="Nova casa"
        @click="handleNewHouse"
        class="transition-ease"
        v-show="!selectedHouse && shouldDisplayNewHouse"
      />
    </transition>
    <Stamp
      icon="mode_edit"
      text="Editar casa"
      @click="() => {}"
      class="transition-ease"
      v-show="shouldDisplayEdit"
    />
    <Stamp
      icon="attach_money"
      text="Compras"
      @click="() => {}"
      class="transition-ease"
      :disabled="!selectedHouse"
    />
    <transition @after-leave="leaveBack" name="back">
      <Stamp
        icon="backspace"
        text="Voltar"
        @click="handleBack"
        class="transition-ease"
        v-show="showForm"
      />
    </transition>
  </Wrapper>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  computed,
  onMounted,
  watch,
} from 'vue';
import { Data } from '@/protocols/composition';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Stamp from '@/components/Button/Stamp.vue';

export default {
  name: 'Buttons',
  components: {
    Wrapper,
    Stamp,
  },
  props: {
    showForm: Boolean,
    setShowForm: Function,
    selectedHouse: String,
  },
  setup(props: Data): Data {
    const hideNewHouse = ref(false);
    const { showForm, selectedHouse: house } = toRefs(props);
    const shouldDisplayEdit = ref(false);

    const shouldDisplayNewHouse = computed(() => !hideNewHouse.value);
    const shouldDisplayBack = computed(() => showForm.value);

    onMounted(() => {
      watch(
        house,
        (h) => {
          console.log('house', h);
        },
        { immediate: true },
      );
    });

    const handleNewHouse = () => {
      hideNewHouse.value = true;
    };

    const leaveNewHouse = () => {
      props.setShowForm(hideNewHouse.value);
      if (house.value) shouldDisplayEdit.value = true;
    };

    const enterHouse = () => {
      shouldDisplayEdit.value = false;
    };

    const leaveBack = () => {
      hideNewHouse.value = false;
    };
    const handleBack = () => {
      props.setShowForm(false);
    };

    return {
      hideNewHouse,
      shouldDisplayNewHouse,
      shouldDisplayBack,
      shouldDisplayEdit,
      handleNewHouse,
      enterHouse,
      leaveNewHouse,
      handleBack,
      leaveBack,
    };
  },
};
</script>

<style scoped lang="scss">
.button-wrapper {
  margin-top: 1rem;
}

.box {
  width: 30px;
  height: 30px;
  background: teal;
  margin-top: 20px;
}

.new-house-enter-active,
.back-enter-active {
  animation: disappear 0.5s reverse;
}

.new-house-leave-active,
.back-leave-active {
  animation: disappear 0.5s;
}
</style>
