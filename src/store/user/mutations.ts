import { Data } from '@/protocols/composition';
import { State } from './protocols';

const mutations = { setUserData(state: Data, userData: State): void {
  const { name, id, email } = userData;
  state.name = name;
  state.email = email;
  state.id = id;
} };

export default mutations;
