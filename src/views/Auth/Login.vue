<template>
  <Layout buttonText="Login" footerPath="/register" footerText="registrar">
    <Input
      label="Email"
      :value="email"
      :setValue="(v) => setAttribute('email', v)"
    />
    <Input
      label="Password"
      :value="password"
      :setValue="(v) => setAttribute('password', v)"
    />
  </Layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import Input from '@/components/Inputs';
import { Attribute } from '@/protocols/composition';
import Layout from './Layout.vue';

export default {
  name: 'Home',
  components: {
    Input,
    Layout,
  },
  setup() {
    const email = ref('');
    const password = ref('');

    const attributes: { [index: string]: Attribute } = { email, password };

    const setAttribute = (attribute: string, value: string): void => {
      attributes[attribute].value = value;
    };

    return {
      email,
      password,
      setAttribute,
    };
  },
};
</script>

<style lang="scss" scoped>
[name="input"] + [name="input"] {
  margin-top: 1rem;
}
</style>
