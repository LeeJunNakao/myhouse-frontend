<template>
  <Wrapper direction="column" full>
    <Wrapper full class="form-item">
      <Input
        placeholder="Data da compra"
        :value="date || ''"
        :setValue="setDate"
        :numericInput="{
          date: true,
        }"
      />
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
          :numericInput="{ regex: /^\d{1,6}(\,\d{0,2})?$/ }"
          @keypress.enter="handleSubmit"
        >
          <template v-slot:prepend>
            <label class="currency-symbol">R$</label>
          </template>
        </Input>
      </Wrapper>
      <Wrapper justify="center">
        <Button :text="selectedPurchase ? 'Editar' : 'Salvar'" :handleClick="handleSubmit" />
      </Wrapper>
    </Wrapper>
    <ErrorMessage :message="errors.value" />
    <Wrapper class="buttons-wrapper" justify="space-between" v-if="selectedPurchase">
      <Stamp
        icon="delete"
        :text="purchaseToDelete ? 'Confirmar' : 'Deletar'"
        @click="handleDelete(selectedPurchase)"
        :warning="purchaseToDelete"
      />
      <Stamp icon="cancel" text="Cancelar" @click="handleCancel" />
    </Wrapper>
    <Wrapper full justify="end" class="buttons-wrapper" v-else>
      <Stamp icon="skip_previous" text="Voltar" @click="handleBack" />
    </Wrapper>
  </Wrapper>
</template>

<script lang="ts">
import { computed, inject, ref, SetupContext, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Input } from '@/components/Inputs';
import Wrapper from '@/components/Layout/Wrapper.vue';
import { Data } from '@/protocols/composition';
import Button from '@/components/Button/Button.vue';
import { getFormItem, action, getSelectedItem } from '@/composition/setups/items-list';
import { FormHandler, ServiceHandler } from '@/composition/purchases';
import FormValidator from '@/composition/validators/form-validator';
import ErrorMessage from '@/components/Layout/ErrorMessage.vue';
import { Purchase, PurchaseCreateDto } from '@/protocols/domain/Purchase';
import { State } from '@/store/purchases/protocols';
import { getDateElements } from '@/composition/parser';
import Stamp from '@/components/Button/Stamp.vue';

export default {
  name: 'Form',
  components: {
    Input,
    Wrapper,
    Button,
    ErrorMessage,
    Stamp,
  },
  setup(props: Data, { emit }: SetupContext): Data {
    const route = useRoute();
    const router = useRouter();
    const formHandler = inject<FormHandler | undefined>('formHandler');
    const serviceHandler = inject<ServiceHandler>('serviceHandler');
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
    const houseId = computed(() => Number(route.params.id)).value;
    const selectedPurchase = getSelectedItem(formHandler);
    const purchaseToDelete = ref<Purchase | null>(null);
    watch(purchaseToDelete, (toDelete: Purchase | null) => {
      emit('setDelete', Boolean(toDelete));
    });

    const setDate = (v: string) => action('purchases/setFormDate', v, formHandler);
    const setDescription = (v: string) => action('purchases/setFormDescription', v, formHandler);
    const setValue = (v: string) => action('purchases/setFormValue', v, formHandler);

    const encodeData = (data: State['formData']): PurchaseCreateDto => {
      const { day, month, year } = getDateElements(data.date);
      const timestamp = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      const valueInt = Math.round(Number(data.value.replace(',', '.')) * 100);
      return {
        date: timestamp,
        description: data.description,
        value: valueInt,
      };
    };
    const handleSubmit = async () => {
      formValidator.validate();

      if (!hasErrors.value) {
        const encodedData = encodeData(formHandler?.getFormData() as State['formData']);
        if (selectedPurchase.value) {
          await serviceHandler?.editPurchase(houseId, {
            ...encodedData,
            id: selectedPurchase.value.id,
          });
        } else {
          const response = await serviceHandler?.createPurchase(houseId, encodedData);
          if (response) formHandler?.clearForm();
        }
      } else console.log('not submit');
    };

    watch(selectedPurchase, (purchase: Purchase | null) => {
      if (purchase) {
        setDate(String(purchase.date));
        setDescription(purchase.description);
        setValue(String(purchase.value));
      } else {
        setDate(String(''));
        setDescription('');
        setValue(String(''));
        purchaseToDelete.value = null;
      }
    });

    const handleCancel = () => {
      formHandler?.selectItem(null);
    };

    const handleBack = () => {
      router.push({ name: 'Home' });
    };

    const handleDelete = async (purchase: Purchase) => {
      if (purchaseToDelete.value) {
        const deleted = await serviceHandler?.deletePurchase(houseId, purchaseToDelete.value.id);
        if (deleted) {
          formHandler?.selectItem(null);
          purchaseToDelete.value = null;
        }
      }
      purchaseToDelete.value = purchase;
    };

    return {
      date,
      description,
      value,
      errors,
      selectedPurchase,
      purchaseToDelete,
      setDate,
      setDescription,
      setValue,
      handleSubmit,
      handleCancel,
      handleBack,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scoped>
.buttons-wrapper {
  margin-top: 1rem;
}
.form-item {
  margin-top: 1rem;
  flex-grow: 1;
}

.currency-symbol {
  height: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: flex-end;
}
</style>
