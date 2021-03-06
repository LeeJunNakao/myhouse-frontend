<template>
  <Loading v-if="isLoading" class="loading" data-test="loading" />
  <Layout v-else buttonText="Registrar" footerPath="/" footerText="logar" :handleSubmit="register">
    <Input
      label="Nome"
      :value="name"
      :setValue="(value) => setAttribute('name', value)"
      data-test="name"
    />
    <ErrorMessage v-if="formErrors.name" :message="formErrors.name" data-test="name-error" />
    <Input
      label="Email"
      :value="email"
      :setValue="(value) => setAttribute('email', value)"
      data-test="email"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" data-test="email-error" />
    <Input
      label="Senha"
      :value="password"
      type="password"
      :setValue="(value) => setAttribute('password', value)"
      data-test="password"
    />
    <ErrorMessage
      v-if="formErrors.password"
      :message="formErrors.password"
      data-test="password-error"
    />
    <Input
      label="Repita a senha"
      type="password"
      :value="repeatPassword"
      :setValue="(value) => setAttribute('repeatPassword', value)"
      data-test="repeat-password"
    />
    <ErrorMessage
      v-if="formErrors.repeatPassword"
      :message="formErrors.repeatPassword"
      data-test="repeat-password-error"
    />
    <ErrorMessage
      v-if="formErrors.response"
      :message="formErrors.response"
      data-test="response-error"
    />
  </Layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { setAttribute as setter } from '@/composition/setter';
import { useStore } from 'vuex';
import Auth from '@/composition/auth';
import * as authService from '@/services/auth';
import FormValidator from '@/composition/validators/form-validator';
import Loading from '@/components/Loading/Loading.vue';
import { Input } from '@/components/Inputs';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import Layout from './components/Layout.vue';

export default { components: { Layout,
  Input,
  ErrorMessage,
  Loading },
setup(): { [key: string]: any } {
  const store = useStore();
  const isLoading = ref(false);
  const auth = new Auth(store);
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const repeatPassword = ref('');
  const attributes = { name,
    email,
    password,
    repeatPassword };
  const formErrors = ref({ name: null,
    email: null,
    password: null,
    repeatPassword: null,
    response: null });

  const verifyPasswords = (): string => {
    if (password.value !== repeatPassword.value) return 'Deve estar igual a senha.';
    return '';
  };
  const formValidator = new FormValidator(attributes, formErrors, { email: { type: 'email' },
    password: { type: 'password' },
    repeatPassword: { callback: verifyPasswords } });

  const register = async (): Promise<void> => {
    const hasError = formValidator.validate();
    if (!hasError) {
      isLoading.value = true;
      try {
        const { token } = await authService.register({ name: name.value,
          email: email.value,
          password: password.value });
        auth.login(token);
      } catch (error) {
        const message = error.response && error.response.data.message;
        if (message) formErrors.value.response = message;
      } finally {
        isLoading.value = false;
      }
    }
  };

  const setAttribute = (key: string, value: string) => setter(attributes, key, value);

  return { name,
    email,
    password,
    repeatPassword,
    setAttribute,
    formErrors,
    register,
    isLoading };
} };
</script>

<style scoped lang="scss">
.input-wrapper + .input-wrapper {
  margin-top: 1rem;
}

.input-wrapper {
  justify-content: center;
}
</style>
