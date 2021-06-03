import { Commit } from 'vuex';
import { State } from './protocols';

const actions = { setUserData({ commit }: { commit: Commit}, userData: State): void {
  commit('setUserData', userData);
} };

export default actions;
