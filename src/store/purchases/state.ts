import { State } from './protocols';

const state = (): State => ({
  purchases: [],
  selectedPurchase: null,
  formData: {
    date: '',
    description: '',
    value: 0,
    responseMessage: {
      type: '',
      message: '',
    },
  },
});

export default state;
