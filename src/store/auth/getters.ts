import { State } from './state';

const getters = { isAuthenticated: (state: State): boolean => state.authenticated,
  getToken: (state: State): string | null => state.token };

export default getters;
