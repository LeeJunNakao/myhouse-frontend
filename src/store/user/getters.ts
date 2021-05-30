import { StateType } from './state';

const getters = { getId: (state: StateType): number | null => state.id,
  getName: (state: StateType): string => state.name,
  getEmail: (state: StateType): string => state.email,
  getUserData: (state: StateType): StateType => ({ name: state.name,
    id: state.id,
    email: state.email }) };

export default getters;
