<template>
  <Loading v-if="isLoading" class="loading" data-test="loading" />
  <Layout
    v-show="!isLoading"
    buttonText="Login"
    footerPath="/register"
    footerText="registrar"
    :handleSubmit="login"
  >
    <Input
      data-test="email"
      label="Email"
      :value="email"
      :setValue="(v) => setAttribute('email', v)"
      @keydown.enter="login"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" data-test="email-error" />
    <Input
      data-test="password"
      label="Senha"
      type="password"
      :value="password"
      :setValue="(v) => setAttribute('password', v)"
      @keydown.enter="login"
    />
    <ErrorMessage
      v-if="formErrors.password"
      :message="formErrors.password"
      data-test="password-error"
    />
    <ErrorMessage v-if="formErrors.response" :message="translateError(formErrors.response)" />
    <template v-slot:footer>
      <a href="/recover-password" class="recover-password">recuperar senha</a>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Attribute } from '@/protocols/composition';
import Auth from '@/composition/auth';
import { setAttribute as setter } from '@/composition/setter';
import FormValidator from '@/composition/validators/form-validator';
import { translateError } from '@/composition/translator';
import * as authService from '@/services/auth';
import { Input } from '@/components/Inputs';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import Loading from '@/components/Loading/Loading.vue';
import Layout from './components/Layout.vue';

export default { name: 'Home',
  components: { Input,
    Layout,
    ErrorMessage,
    Loading },
  setup(): { [key: string]: any } {
    const store = useStore();
    const auth = new Auth(store);

    const isLoading = ref(false);
    const email = ref('');
    const password = ref('');

    const formErrors = ref({ email: null, password: null, response: null });
    const attributes: { [index: string]: Attribute } = { email, password };
    const formValidator = new FormValidator(attributes, formErrors, { email: { required: true,
      type: 'email' },
    password: { required: true,
      type: 'password' } });

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
          const { token } = await authService.login({ email: email.value,
            password: password.value });
          auth.login(token);
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        formErrors.value.response = errorMessage;
      } finally {
        isLoading.value = false;
      }
    };

    const setAttribute = (key: string, value: string) => setter(attributes, key, value);

    return { email,
      password,
      setAttribute,
      login,
      formErrors,
      isLoading,
      translateError };
  } };
</script>

<style lang="scss" scoped>
[name='input'] + [name='input'] {
  margin-top: 1rem;
}

.error {
  margin-bottom: 1rem;
}

.loading {
  height: 100vh;
}

a {
  font-weight: bold;
}

.recover-password {
  margin-left: 1rem;
  color: $dark-blue;
}

.input-wrapper {
  justify-content: center;
}
</style>
