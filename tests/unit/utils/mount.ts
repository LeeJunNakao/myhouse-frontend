import { mount as mountComponent } from '@vue/test-utils';
import store from '@/store';

interface MockRoute {
  params: {
    id: number;
  };
}

interface MockRouter {
  push: () => any;
}

interface Mocks {
  route: MockRoute;
  router: MockRouter;
}
export const mount = (component: any) => {
  const wrapper = mountComponent(component, {
    global: {
      plugins: [store],
    },
  });
  return wrapper;
};
