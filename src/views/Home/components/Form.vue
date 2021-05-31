<template>
  <transition name="form">
    <Wrapper class="form-wrapper" justify="center" v-show="showForm">
      <Input placeholder="Nome da casa" :value="name" :setValue="(n) => setName(n)" />
      <Wrapper justify="center">
        <Button :text="buttonText" :handleClick="handleSubmit" />
      </Wrapper>
    </Wrapper>
  </transition>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { inject, computed } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Input from '@/components/Inputs/Input.vue';
import Button from '@/components/Button/Button.vue';
import { Data, Ref } from '@/protocols/composition';
import { FormHandler, ServiceHandler } from '@/functions/houses';

export default {
  name: 'Form',
  props: {
    showForm: Boolean,
    name: String,
    buttonText: String,
    setName: Function,
  },
  components: { Wrapper, Input, Button },
  setup(props: Data): Data {
    const store = useStore();
    const serviceHandler = new ServiceHandler(store);
    const formHandler: FormHandler | undefined = inject('formHandler');
    const name = computed(() => props.name);
    const isEditing: Ref<boolean> | undefined = inject('isEditing');

    const handleSubmit = () => {
      if (!isEditing?.value) {
        serviceHandler.createHouse(name.value);
        if (formHandler?.handleBack) formHandler.handleBack();
      }
    };

    return { handleSubmit };
  },
};
</script>

<style scoped lang="scss">
.form-wrapper::v-deep {
  flex-wrap: wrap;
  width: 100%;
  margin-top: 1rem;
  height: 2.2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;

  .input-wrapper {
    height: 100%;
    grid-template-columns: 1fr;

    input {
      height: 100%;
      width: 100%;
    }
  }
}

.form-enter-active {
  animation: disappear 0.5s reverse;
}

.form-leave-active {
  animation: disappear 0.5s;
}
</style>
