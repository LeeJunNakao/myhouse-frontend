import State from './protocols';

const state = (): State => ({ authenticated: false,
  token: localStorage.getItem('token') });

export { State };
export default state;
