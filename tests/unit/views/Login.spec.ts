import { nextTick } from 'vue';
import LoginView from '@/views/Auth/Login.vue';
import errorMessages from '@/functions/validators/form-validator/error-messages';
import * as authService from '@/services/auth';
import { DomHandler, ElementVerifier, ServiceMocker, mount } from '../utils';

describe('Login', () => {
  it('render the component', () => {
    const wrapper = mount(LoginView);

    const elementVerifier = new ElementVerifier({ wrapper,
      elements: ['email', 'password'],
      children: [
        { parentName: 'email', type: 'input' },
        { parentName: 'password', type: 'input' },
      ] });

    elementVerifier.verifyElements([
      { name: 'email', content: 'Email' },
      { name: 'password', content: 'Senha' },
    ]);
    elementVerifier.verifyChildrenOf([
      { parentName: 'email', content: '' },
      { parentName: 'password', content: '' },
    ]);
  });

  it('Shows form error when try submitting blank inputs', async () => {
    const wrapper = mount(LoginView);

    const domHandler = new DomHandler(wrapper);
    domHandler.clickButton();

    await nextTick();

    const elementVerifier = new ElementVerifier({ wrapper,
      elements: ['email-error', 'password-error'] });
    elementVerifier.verifyElements([
      { name: 'email-error', content: errorMessages.email },
      { name: 'password-error', content: errorMessages.password },
    ]);
  });

  it('Shows loader while awaiting login response', async () => {
    const wrapper = mount(LoginView);

    const serviceMocker = new ServiceMocker(authService);
    serviceMocker.mockSuccess('login', { token: 'token ' });

    const domHandler = new DomHandler(wrapper);

    domHandler.setValueInto('email', 'email@email.com');
    domHandler.setValueInto('password', 'Abcdf123@_*');
    domHandler.clickButton();

    await nextTick();

    const loading = new ElementVerifier({ wrapper, elements: ['loading'] });
    loading.verifyElements([{ name: 'loading', content: 'Loading...' }]);
  });
});
