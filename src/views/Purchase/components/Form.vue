<template>
  <Wrapper direction="column" full>
    <Wrapper full class="form-item">
      <Input placeholder="Data da compra" :value="date || ''" :setValue="setDate" />
    </Wrapper>
    <ErrorMessage :message="errors.date" />
    <Wrapper full class="form-item">
      <Input placeholder="Descrição" :value="description || ''" :setValue="setDescription" />
    </Wrapper>
    <ErrorMessage :message="errors.description" />
    <Wrapper
      class="form-item"
      grid
      templateColumns="auto auto"
      gapColumns="1rem"
      align="center"
      full
    >
      <Wrapper>
        <Input
          placeholder="Valor"
          :value="value || ''"
          :setValue="setValue"
          type="tel"
          numericInput
          :regex="/^\d+(\,\d{0,2})?$/"
        />
      </Wrapper>
      <Wrapper justify="center">
        <Button text="Salvar" :handleClick="handleClick" />
      </Wrapper>
    </Wrapper>
    <ErrorMessage :message="errors.value" />
  </Wrapper>
</template>

<script lang="ts">
import { computed, inject, ref } from 'vue';
import { Input, NumericInput } from '@/components/Inputs';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data } from '@/protocols/composition';
import Button from '@/components/Button/Button.vue';
import { getFormItem, action } from '@/composition/setups/items-list';
import { FormHandler } from '@/composition/purchases/form-handlers';
import FormValidator from '@/composition/validators/form-validator';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';

export default {
  name: 'Form',
  components: {
    Input,
    Wrapper,
    Button,
    ErrorMessage,
    NumericInput,
  },
  setup(): Data {
    const formHandler = inject<FormHandler | undefined>('formHandler');
    const date = getFormItem('date', formHandler);
    const description = getFormItem('description', formHandler);
    const value = getFormItem('value', formHandler);
    const errors = ref({ date: '', description: '', value: '' });
    const formValidator = new FormValidator({ date, description, value }, errors, {
      date: { required: true },
      description: { required: true },
      value: {
        required: true,
        callback: () => (Number(value.value) === 0 ? 'Deve ser um valor maior que zero' : ''),
      },
    });
    const hasErrors = computed(() => Object.values(errors.value).some((i) => i));

    const setDate = (v: string) => action('purchases/setFormDate', v, formHandler);
    const setDescription = (v: string) => action('purchases/setFormDescription', v, formHandler);
    const setValue = (v: string) => action('purchases/setFormValue', v, formHandler);

    const handleClick = () => {
      formValidator.validate();
      if (!hasErrors.value) console.log('submit');
      else console.log('not submit');
    };

    return {
      date,
      description,
      value,
      setDate,
      setDescription,
      setValue,
      handleClick,
      errors,
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
