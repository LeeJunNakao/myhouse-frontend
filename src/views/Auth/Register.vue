<template>
  <Layout buttonText="Registrar" footerPath="/" footerText="logar" :handleSubmit="register">
    <Input
      label="Nome"
      :value="name"
      :setValue="(value) => setAttribute('name', value)"
    />
    <ErrorMessage v-if="formErrors.name" :message="formErrors.name" />
    <Input
      label="Email"
      :value="email"
      :setValue="(value) => setAttribute('email', value)"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" />
    <Input
      label="Senha"
      :value="password"
      type="password"
      :setValue="(value) => setAttribute('password', value)"
    />
    <ErrorMessage v-if="formErrors.password" :message="formErrors.password" />
    <Input
      label="Repita Senha"
      type="password"
      :value="repeatPassword"
      :setValue="(value) => setAttribute('repeatPassword', value)"
    />
    <ErrorMessage v-if="formErrors.repeatPassword" :message="formErrors.repeatPassword" />
  </Layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { setAttribute as setter } from '@/functions/setter';
import * as authService from '@/services/auth';
import FormValidator from '@/functions/validators/form-validator';
import Input from '@/components/Inputs';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import Layout from './Layout.vue';

export default {
  components: {
    Layout,
    Input,
    ErrorMessage,
  },
  setup(): { [key: string ]: any} {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');
    const attributes = {
      name, email, password, repeatPassword,
    };
    const formErrors = ref({
      name: null, email: null, password: null, repeatPassword: null,
    });

    const verifyPasswords = (): string => {
      if (password.value !== repeatPassword.value) return 'Deve estar igual a senha.';
      return '';
    };
    const formValidator = new FormValidator(attributes, formErrors, {
      email: {
        type: 'email',
      },
      password: {
        type: 'password',
      },
      repeatPassword: {
        callback: verifyPasswords,
      },
    });

    const register = async (): Promise<void> => {
      const hasError = formValidator.validate();
      if (!hasError) {
        try {
          const { token } = await authService.register({
            name: name.value,
            email: email.value,
            password: password.value,
          });
          console.log(token);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    };

    const setAttribute = (key: string, value: string) => setter(attributes, key, value);

    return {
      name, email, password, repeatPassword, setAttribute, formErrors, register,
    };
  },
};
</script>

<style>
.input-wrapper + .input-wrapper {
  margin-top: 1rem;
}
</style>
