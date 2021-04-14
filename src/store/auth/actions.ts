import { Commit } from 'vuex';

const actions = {
  setAuthentication({ commit }: { commit: Commit}, isAuthenticated: boolean): void {
    commit('setAuthentication', isAuthenticated);
  },
};

export default actions;
