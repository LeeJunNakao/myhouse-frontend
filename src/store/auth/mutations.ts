import { Data } from '@/protocols/composition';

const mutations = { setAuthentication(state: Data, isAuthenticated: boolean): void {
  state.authenticated = isAuthenticated;
},
setToken(state: Data, token: string | null): void {
  state.token = token;
} };

export default mutations;
