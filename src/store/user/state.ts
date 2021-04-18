import { StateType } from './protocols';

const state = (): StateType => ({
  id: null,
  name: '',
  email: '',
});

export { StateType };
export default state;
