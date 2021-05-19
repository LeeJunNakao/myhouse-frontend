import RecoverPassword from '@/views/Auth/RecoverPassword.vue';
import { mount, ElementVerifier, ElementHandler } from '../utils';

describe('Login', () => {
  it('render the component', () => {
    const wrapper = mount(RecoverPassword);
    const verifier = new ElementVerifier({ wrapper, elements: ['email'], children: ['input'] });
    verifier.fromElements('text', ['Email']);
    verifier.fromChildren('text', ['']);
  });

  it('show error if tries submitting blank input', async () => {
    const wrapper = mount(RecoverPassword);
    const elementHandler = new ElementHandler(wrapper);
    elementHandler.clickButton();
  });
});
