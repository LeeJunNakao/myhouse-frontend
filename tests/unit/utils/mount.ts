import { mount as mountComponent } from '@vue/test-utils';
import store from '@/store';

export const mount = (component: any) => {
  const wrapper = mountComponent(component, { global: { plugins: [store] } });
  return wrapper;
};
