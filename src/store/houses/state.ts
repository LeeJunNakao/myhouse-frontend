import { State } from './protocols';

const state = (): State => ({
  houses: [],
  selectedHouse: null,
  formData: {
    name: '',
    responseMessage: {
      type: '',
      message: '',
    },
  },
});

export default state;
