/* eslint-disable max-len */
<template>
  <Layout buttonText="Login" footerPath="/register" footerText="registrar" :handleSubmit="login">
    <Input
      label="Email"
      :value="email"
      :setValue="(v) => setAttribute('email', v)"
    />
    <div v-if="formErrors.email">{{ formErrors.email }}</div>
    <Input
      label="Password"
      type="password"
      :value="password"
      :setValue="(v) => setAttribute('password', v)"
    />
    <div v-if="formErrors.password">{{ formErrors.password }} </div>
  </Layout>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Attribute } from '@/protocols/composition';
import Auth from '@/functions/auth';
import FormValidator from '@/functions/validators/form-validators';
import * as authService from '@/services/auth';
import Input from '@/components/Inputs';
import Layout from './Layout.vue';

export default {
  name: 'Home',
  components: {
    Input,
    Layout,
  },
  setup() {
    const store = useStore();
    const auth = new Auth(store);

    const email = ref('');
    const password = ref('');

    const formErrors = ref({ email: null, password: null });
    const attributes: { [index: string]: Attribute } = { email, password };
    // eslint-disable-next-line max-len
    const formValidator = new FormValidator(attributes, formErrors, { email: { required: true, type: 'email' }, password: { required: true, type: 'password' } });

    const setAttribute = (attribute: string, value: string): void => {
      attributes[attribute].value = value;
    };

    const hasFormError = computed(() => {
      const errors = Object.values(formErrors.value);
      return errors.some((error) => error);
    });

    const login = async (): Promise<void> => {
      try {
        formValidator.validate();
        if (!hasFormError.value) {
          const { token } = await authService.login({
            email: email.value,
            password: password.value,
          });
          auth.setToken(token);
          auth.authenticate();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      email,
      password,
      setAttribute,
      login,
      formErrors,
    };
  },
};
</script>

<style lang="scss" scoped>
[name="input"] + [name="input"] {
  margin-top: 1rem;
}
</style>
