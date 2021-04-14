import { Data } from '@/protocols/composition';

const mutations = {
  setAuthentication(state: Data, isAuthenticated: boolean): void {
    state.authenticated = isAuthenticated;
  },
};

export default mutations;
