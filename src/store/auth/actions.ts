import { Commit } from 'vuex';

const actions = {
  setAuthentication({ commit }: { commit: Commit }, isAuthenticated: boolean): void {
    commit('setAuthentication', isAuthenticated);
  },
  setToken({ commit }: { commit: Commit }, token: string): void {
    localStorage.setItem('token', token);
    commit('setToken', token);
  },
  removeToken({ commit }: { commit: Commit }): void {
    localStorage.removeItem('token');
    commit('setToken', null);
  },
};

export default actions;
