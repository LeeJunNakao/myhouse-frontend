<template>
  <transition name="form">
    <Wrapper class="form-wrapper" justify="center" v-show="showForm">
      <Input placeholder="Nome da casa" :value="name" :setValue="(n) => setName(n)" />
      <Wrapper justify="center">
        <Button text="Salvar" :handleClick="() => {}" />
      </Wrapper>
    </Wrapper>
  </transition>
</template>

<script lang="ts">
import { ref } from 'vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import Input from '@/components/Inputs/Input.vue';
import Button from '@/components/Button/Button.vue';

export default {
  name: 'Form',
  props: {
    showForm: Boolean,
  },
  setup(props) {
    const showForm = ref(props.showForm);
    const name = ref('');

    const setName = (n: string) => {
      name.value = n;
    };

    return { name, setName };
  },
  components: {
    Wrapper,
    Input,
    Button,
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
