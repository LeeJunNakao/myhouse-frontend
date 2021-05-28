<template>
  <Loading v-if="isLoading" class="loading" data-test="loading" />
  <Layout buttonText="Recuperar" footerText="logar" footerPath="/" :handleSubmit="submit" v-else>
    <Input
      label="Email"
      :value="email"
      :setValue="(value) => setAttribute('email', value)"
      data-test="email"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" data-test="email-error" />
    <ErrorMessage
      v-if="formErrors.response"
      :message="formErrors.response"
      data-test="responseError"
    />
    <div class="success-message" v-if="recovered" data-test="success-message">
      <label>Email recuperado com sucesso</label>
    </div>
  </Layout>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { Input } from '@/components/Inputs';
import * as service from '@/services/auth';
import { setAttribute as setter } from '@/functions/setter';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import FormValidator from '@/functions/validators/form-validator';
import Loading from '@/components/Loading/Loading.vue';
import Layout from './components/Layout.vue';

export default {
  name: 'RecoverPassword',
  components: {
    Layout,
    Input,
    ErrorMessage,
    Loading,
  },
  setup(): { [key: string]: any } {
    const email = ref('');
    const recovered = ref(false);
    const formErrors = ref({ response: '', email: '' });
    const isLoading = ref(false);
    const attributes = { email };

    const formValidator = new FormValidator(attributes, formErrors, { email: { type: 'email' } });
    const setAttribute = (key: string, value: string) => setter(attributes, key, value);

    const hasFormError = computed(() => {
      const errors = Object.values(formErrors.value);
      return errors.some((error) => error);
    });

    const clearErrors = () => {
      formErrors.value.response = '';
      formErrors.value.email = '';
    };

    const submit = async () => {
      try {
        isLoading.value = true;
        clearErrors();
        formValidator.validate();
        if (!hasFormError.value) {
          await service.recoverPassword(email.value);
          recovered.value = true;
          formErrors.value.response = '';
        }
      } catch (error) {
        formErrors.value.response = 'Não foi possível recuperar senha';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      setAttribute,
      formErrors,
      recovered,
      submit,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.success-message {
  display: flex;
  justify-content: center;
  border-radius: $border-radius;
  padding: 1rem;
  border: 1px solid $blue;
  margin-top: 2rem;
}

.input-wrapper {
  justify-content: center;
}
</style>
