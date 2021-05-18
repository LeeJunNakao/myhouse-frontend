<template>
  <Layout buttonText="Recuperar" footerText="logar" footerPath="/" :handleSubmit="submit">
    <Input
      label="Email"
      :value="email"
      :setValue="(value) => setAttribute('email', value)"
      data-test="email"
    />
    <ErrorMessage v-if="formErrors.email" :message="formErrors.email" />
    <ErrorMessage v-if="formErrors.response" :message="formErrors.response" />
    <div class="success-message" v-if="recovered">
      <label>Email recuperado com sucesso</label>
    </div>
  </Layout>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import Input from '@/components/Inputs';
import * as service from '@/services/auth';
import { setAttribute as setter } from '@/functions/setter';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import FormValidator from '@/functions/validators/form-validator';
import Layout from './components/Layout.vue';

export default {
  name: 'RecoverPassword',
  components: {
    Layout,
    Input,
    ErrorMessage,
  },
  setup(): { [key: string]: any } {
    const email = ref('');
    const recovered = ref(false);
    const formErrors = ref({ response: '', email: '' });
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
        clearErrors();
        formValidator.validate();
        if (!hasFormError.value) {
          await service.recoverPassword(email.value);
          recovered.value = true;
          formErrors.value.response = '';
        }
      } catch (error) {
        formErrors.value.response = 'Não foi possível recuperar senha';
      }
    };

    return {
      email,
      setAttribute,
      formErrors,
      recovered,
      submit,
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
