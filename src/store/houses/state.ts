import { StateType } from './protocols';

const state = (): StateType => ({
  houses: [],
  selectedHouse: null,
  formData: {
    name: '',
  },
});

export default state;
