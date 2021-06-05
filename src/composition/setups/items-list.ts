import { computed, ComputedRef } from 'vue';
import { FormHandler } from '../protocols';

export const getOptions = (formHandler?: FormHandler, itemField = 'name'): ComputedRef<any[]> => {
  return computed(() => {
    const items = formHandler?.getItems() || [];
    return items.map((i: any) => ({ ...i, label: i[itemField] }));
  });
};

export const getSelectedItem = (formHandler?: FormHandler) => {
  return computed(() => formHandler?.getSelectedItem());
};

export const selectItem = (item: any, formHandler?: FormHandler) => {
  formHandler?.selectItem(item);
};

export const getFormItem = (field: string, formHandler?: FormHandler) => {
  return computed(() => {
    const formData = formHandler?.getFormData();
    if (formData) return formData[field];
    return null;
  });
};

export const action = (actionName: string, value: any, formHandler?: FormHandler) => {
  formHandler?.callAction(actionName, value);
};
