<template>
  <Wrapper direction="column" full>
    <Wrapper full class="form-item">
      <Input placeholder="Data da compra" :value="name" :setValue="(n) => setName(n)" />
    </Wrapper>
    <Wrapper full class="form-item">
      <Input placeholder="Descrição" :value="name" :setValue="(n) => setName(n)" />
    </Wrapper>
    <Wrapper
      class="form-item"
      grid
      templateColumns="auto auto"
      gapColumns="1rem"
      align="center"
      full
    >
      <Wrapper>
        <Input placeholder="Valor" :value="name" :setValue="(n) => setName(n)" />
      </Wrapper>
      <Wrapper justify="center">
        <Button text="Salvar" />
      </Wrapper>
    </Wrapper>
  </Wrapper>
</template>

<script lang="ts">
import { ref } from 'vue';
import Input from '@/components/Inputs/Input.vue';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data } from '@/protocols/composition';
import Button from '@/components/Button/Button.vue';

export default {
  name: 'Form',
  components: {
    Input,
    Wrapper,
    Button,
  },
  setup(): Data {
    const name = ref('');

    const setName = (n: string) => {
      name.value = n;
    };

    return {
      name,
      setName,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-item {
  margin-top: 1rem;
  flex-grow: 1;
}
</style>
