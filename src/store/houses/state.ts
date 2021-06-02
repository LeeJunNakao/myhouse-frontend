import { StateType } from './protocols';

const state = (): StateType => ({
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
