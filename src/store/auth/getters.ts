import { StateType } from './state';

const getters = { isAuthenticated: (state: StateType): boolean => state.authenticated,
  getToken: (state: StateType): string | null => state.token };

export default getters;
