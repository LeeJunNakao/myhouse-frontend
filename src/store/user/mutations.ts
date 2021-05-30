import { Data } from '@/protocols/composition';
import { StateType } from './protocols';

const mutations = { setUserData(state: Data, userData: StateType): void {
  const { name, id, email } = userData;
  state.name = name;
  state.email = email;
  state.id = id;
} };

export default mutations;
