import { mount, ElementVerifier } from '../../unit/utils';
import RecoverPassword from '@/views/Auth/RecoverPassword.vue';

describe('Login', () => {
  it('render the component', () => {
    const wrapper = mount(RecoverPassword);
    const verifier = new ElementVerifier({ wrapper, elements: ['email'], children: ['input'] });
    verifier.fromElements('text', ['Email']);
    verifier.fromChildren('text', ['']);
  });
});
