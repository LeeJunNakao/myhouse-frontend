/* eslint-disable max-len */
<template>
  <Loading v-if="isLoading" class="loading"/>
  <Layout v-show="!isLoading"
  buttonText="Login"
  footerPath="/register"
  footerText="registrar"
  :handleSubmit="login"
  >
    <Input
      label="Email"
      :value="email"
      :setValue="(v) => setAttribute('email', v)"
      @keydown.enter="login"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" />
    <Input
      label="Password"
      type="password"
      :value="password"
      :setValue="(v) => setAttribute('password', v)"
      @keydown.enter="login"
    />
    <ErrorMessage v-if="formErrors.password" :message="formErrors.password" />
    <ErrorMessage v-if="formErrors.response" :message="translateError(formErrors.response)" />
  </Layout>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Attribute } from '@/protocols/composition';
import Auth from '@/functions/auth';
import FormValidator from '@/functions/validators/form-validators';
import { translateError } from '@/functions/translator';
import * as authService from '@/services/auth';
import Input from '@/components/Inputs';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import Loading from '@/components/Loading/Loading.vue';
import Layout from './Layout.vue';

export default {
  name: 'Home',
  components: {
    Input,
    Layout,
    ErrorMessage,
    Loading,
  },
  setup() {
    const store = useStore();
    const auth = new Auth(store);

    const isLoading = ref(false);
    const email = ref('');
    const password = ref('');

    const formErrors = ref({ email: null, password: null, response: null });
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
        formErrors.value.response = null;
        isLoading.value = true;
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
        const errorMessage = error.response.data.message;
        formErrors.value.response = errorMessage;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      setAttribute,
      login,
      formErrors,
      isLoading,
      translateError,
    };
  },
};
</script>

<style lang="scss" scoped>
[name="input"] + [name="input"] {
  margin-top: 1rem;
}

.error {
  margin-bottom: 1rem;
}

.loading {
  height: 100vh;
}
</style>
