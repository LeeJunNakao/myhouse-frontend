import { nextTick } from 'vue';
import flushPromises from 'flush-promises';
import RegisterView from '@/views/Auth/Register.vue';
import errorMessages from '@/functions/validators/form-validator/error-messages';
import * as authService from '@/services/auth';
import {
  ElementVerifier,
  FormErrorVerifier,
  DomHandler,
  ServiceMocker,
  ResponseError,
  mount
} from '../utils';

describe('Login', () => {
  it('render the component', () => {
    const wrapper = mount(RegisterView);

    const verifier = new ElementVerifier({
      wrapper,
      elements: ['name', 'email', 'password', 'repeat-password'],
      children: [
        { parentName: 'name', type: 'input' },
        { parentName: 'email', type: 'input' },
        { parentName: 'password', type: 'input' },
        { parentName: 'repeat-password', type: 'input' },
      ],
    });
    verifier.verifyElements([
      { name: 'name', content: 'Nome' },
      { name: 'email', content: 'Email' },
      { name: 'password', content: 'Senha' },
      { name: 'repeat-password', content: 'Repita a senha' },
    ]);

    verifier.verifyChildrenOf([
      { parentName: 'name', content: '' },
      { parentName: 'email', content: '' },
      { parentName: 'password', content: '' },
      { parentName: 'repeat-password', content: '' },
    ]);
  });

  it('Shows form error when try submiting blank inputs', async () => {
    const wrapper = mount(RegisterView);

    const domHandler = new DomHandler(wrapper);
    domHandler.clickButton();

    const errorVerifier = new FormErrorVerifier({ wrapper });
    errorVerifier.expect('name').toBe(errorMessages.required);
    errorVerifier.expect('email').toBe(errorMessages.email);
    errorVerifier.expect('password').toBe(errorMessages.password);
    errorVerifier.expect('repeatPassword').toBe(errorMessages.required);

    await nextTick();

    const elementVerifier = new ElementVerifier({
      wrapper,
      elements: ['name-error', 'email-error', 'password-error', 'repeat-password-error'],
    });

    elementVerifier.verifyElements([
      { name: 'name-error', content: errorMessages.required },
      { name: 'email-error', content: errorMessages.email },
      { name: 'password-error', content: errorMessages.password },
      { name: 'repeat-password-error', content: errorMessages.required },
    ]);
  });

  it('Shows error if password and repeat password are not the same', async () => {
    const wrapper = mount(RegisterView);

    const domHandler = new DomHandler(wrapper);
    domHandler.setValueInto('password', 'Kdsl@*4256');
    domHandler.setValueInto('repeat-password', 'Kdsl@&4256');
    domHandler.clickButton();

    const errorVerifier = new FormErrorVerifier({ wrapper });
    errorVerifier.expect('repeatPassword').toBe('Deve estar igual a senha.');

    await nextTick();

    const elementVerifier = new ElementVerifier({ wrapper, elements: ['repeat-password-error'] });
    elementVerifier.verifyElements([
      { name: 'repeat-password-error', content: 'Deve estar igual a senha.' },
    ]);
  });

  it('Shows error message from http request error', async () => {
    const wrapper = mount(RegisterView);

    const serviceMocker = new ServiceMocker(authService);
    serviceMocker.mockError('register', new ResponseError('Error message'));

    const domHandler = new DomHandler(wrapper);
    domHandler.setValueInto('name', 'Alguem da Silva');
    domHandler.setValueInto('email', 'email@email.com');
    domHandler.setValueInto('password', 'Kdsl@*4256');
    domHandler.setValueInto('repeat-password', 'Kdsl@*4256');
    domHandler.clickButton();

    await nextTick();

    const loading = new ElementVerifier({ wrapper, elements: ['loading'] });
    loading.verifyElements([{ name: 'loading', content: 'Loading...' }]);

    await flushPromises();
    await nextTick();

    const errorVerifier = new ElementVerifier({ wrapper, elements: ['response-error'] });
    errorVerifier.verifyElements([{ name: 'response-error', content: 'Error message' }]);
  });
});
