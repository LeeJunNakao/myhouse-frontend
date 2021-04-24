/* eslint-disable max-len */
import { Attribute } from '@/protocols/composition';

export const setAttribute = (attributes: {[key:string]: Attribute}, key: string, value: string | number): void => {
  attributes[key].value = value;
};
