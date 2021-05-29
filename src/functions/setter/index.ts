/* eslint-disable max-len */
import { Ref } from 'vue';
import { Attribute } from '@/protocols/composition';

export const setAttribute = (
  attributes: { [key: string]: Attribute },
  key: string,
  value: string | number,
): void => {
  attributes[key].value = value;
};

export const setStyleProperty = (wrapper: Ref<InstanceType<any>>, property: string, prop: any) => {
  if (prop && wrapper.value) wrapper.value.style.setProperty(property, prop);
};
