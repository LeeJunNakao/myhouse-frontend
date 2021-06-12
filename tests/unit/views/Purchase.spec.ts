import { nextTick } from 'vue';
import Purchase from '@/views/Purchase/Purchase.vue';
import errorMessages from '@/composition/validators/form-validator/error-messages';
import * as authService from '@/services/auth';
import { DomHandler, ElementVerifier, ServiceMocker, mount } from '../utils';

jest.mock('vue-router');
require('vue-router').useRoute = () => {
  return {
    params: {
      id: 1,
    },
  };
};

describe('Purchase', () => {
  it('render the component', () => {
    const wrapper = mount(Purchase);

    const elementVerifier = new ElementVerifier({
      wrapper,
      elements: ['date', 'description', 'value', 'stamp-back', 'message-box'],
      children: [
        { parentName: 'date', type: 'input' },
        { parentName: 'description', type: 'input' },
        { parentName: 'value', type: 'input' },
        { parentName: 'stamp-back', type: 'text' },
      ],
    });

    elementVerifier.verifyElements([
      {
        name: 'message-box',
        content: 'Não há nenhum registro de compra para esta casa',
      },
    ]);

    elementVerifier.verifyChildrenOf([
      { parentName: 'date', content: '' },
      { parentName: 'description', content: '' },
      { parentName: 'value', content: '' },
      { parentName: 'stamp-back', content: 'Voltar' },
    ]);
  });
});
