import { Commit } from 'vuex';
import { StateType } from './protocols';

const actions = { setUserData({ commit }: { commit: Commit}, userData: StateType): void {
  commit('setUserData', userData);
} };

export default actions;
