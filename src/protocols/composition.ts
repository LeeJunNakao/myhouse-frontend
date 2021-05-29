import { Slots } from 'vue';

export type Data = {
  [key: string]: any;
};

export interface SetupContext {
  attrs: Data;
  slots: Slots;
  emit: (event: string, ...args: unknown[]) => void;
}

export interface Attribute {
  value: any;
}

export interface Store {
  dispatch(action: string, payload?: any): void;
  getters: any;
}

export interface Ref<T> {
  value: T;
}
