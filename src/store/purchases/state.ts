import { State } from './protocols';

const state = (): State => ({
  purchases: [],
  selectedPurchase: null,
  formData: {
    date: null,
    description: '',
    value: 0,
    responseMessage: {
      type: '',
      message: '',
    },
  },
});

export default state;
