import { State } from './protocols';

const state = (): State => ({ id: null,
  name: '',
  email: '' });

export { State };
export default state;
