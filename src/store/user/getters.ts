import { State } from './state';

const getters = { getId: (state: State): number | null => state.id,
  getName: (state: State): string => state.name,
  getEmail: (state: State): string => state.email,
  getUserData: (state: State): State => ({ name: state.name,
    id: state.id,
    email: state.email }) };

export default getters;
