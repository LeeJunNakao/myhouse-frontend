import StateType from './protocols';

const state = (): StateType => ({ authenticated: false,
  token: localStorage.getItem('token') });

export { StateType };
export default state;
