import { nextTick } from 'vue';
import RecoverPassword from '@/views/Auth/RecoverPassword.vue';
import {
  mount,
  ElementVerifier,
  ElementHandler,
  FormErrorVerifier,
  ServiceMocker,
  ResponseError,
} from '../utils';
import errorMessages from '@/functions/validators/form-validator/error-messages';
import * as service from '@/services/auth';
import flushPromises from 'flush-promises';

const { email: emailError } = errorMessages;

describe('Login', () => {
  it('Renders the component', () => {
    const wrapper = mount(RecoverPassword);
    const verifier = new ElementVerifier({
      wrapper,
      elements: ['email'],
      children: [{ parentName: 'email', type: 'input' }],
    });
    verifier.verifyElements([{ name: 'email', content: 'Email' }]);
    verifier.verifyChildrenOf([{ parentName: 'email', content: '' }]);
  });

  it('Shows error if tries submitting blank input', async () => {
    const wrapper = mount(RecoverPassword);
    const elementHandler = new ElementHandler(wrapper);
    elementHandler.clickButton();
    const errorVerifier = new FormErrorVerifier({ wrapper });
    errorVerifier.expect('email').toBe(emailError);

    await nextTick();

    const elementVerifier = new ElementVerifier({
      wrapper,
      elements: ['email-error'],
    });
    elementVerifier.verifyElements([{ name: 'email-error', content: emailError }]);
  });

  it('Informs that password could not be recovered if request is failed', async () => {
    const serviceMocker = new ServiceMocker(service);
    serviceMocker.mockError('recoverPassword', new ResponseError(''));
    const wrapper = mount(RecoverPassword);
    const elementHandler = new ElementHandler(wrapper);
    elementHandler.setValueInto('email', 'email@email.com');
    elementHandler.clickButton();

    await nextTick();

    const loaderVerifier = new ElementVerifier({
      wrapper,
      elements: ['loading'],
    });
    loaderVerifier.verifyElements([{ name: 'loading', content: 'Loading...' }]);

    await flushPromises();

    const errorVerifier = new ElementVerifier({ wrapper, elements: ['responseError'] });
    errorVerifier.verifyElements([
      { name: 'responseError', content: 'Não foi possível recuperar senha' },
    ]);
  });

  it('Displays success message', async () => {
    const serviceMocker = new ServiceMocker(service);
    serviceMocker.mockSuccess('recoverPassword');
    const wrapper = mount(RecoverPassword);
    const elementHandler = new ElementHandler(wrapper);
    elementHandler.setValueInto('email', 'email@email.com');
    elementHandler.clickButton();

    await nextTick();

    const loaderVerifier = new ElementVerifier({
      wrapper,
      elements: ['loading'],
    });
    loaderVerifier.verifyElements([{ name: 'loading', content: 'Loading...' }]);

    await flushPromises();

    const errorVerifier = new ElementVerifier({ wrapper, elements: ['success-message'] });
    errorVerifier.verifyElements([
      { name: 'success-message', content: 'Email recuperado com sucesso' },
    ]);
  });
});
