import { StateType } from './state';

const getters = {
  isAuthenticated: (state: StateType): boolean => state.authenticated,
};

export default getters;
