<template>
  <Layout buttonText="Login" footerPath="/register" footerText="registrar" :handleSubmit="login">
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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Input from '@/components/Inputs';
import { Attribute } from '@/protocols/composition';
import * as authService from '@/services/auth';
import Layout from './Layout.vue';

export default {
  name: 'Home',
  components: {
    Input,
    Layout,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const attributes: { [index: string]: Attribute } = { email, password };

    const setAttribute = (attribute: string, value: string): void => {
      attributes[attribute].value = value;
    };

    const login = async (): Promise<void> => {
      try {
        const { token } = await authService.login({ email: email.value, password: password.value });
        localStorage.setItem('token', token);
        store.dispatch('auth/setAuthentication', true);
        router.push({ name: 'Home' });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      setAttribute,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
[name="input"] + [name="input"] {
  margin-top: 1rem;
}
</style>
