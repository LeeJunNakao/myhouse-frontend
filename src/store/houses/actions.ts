import { Commit } from 'vuex';
import StateType from './protocols';

const actions = {
  setHouses({ commit }: { commit: Commit }, houses: StateType['houses']): void {
    commit('setHouses', houses);
  },
  selectHouse({ commit }: { commit: Commit }, house: StateType['selectedHouse']): void {
    commit('selectHouse', house);
  },
  setFormDataName({ commit }: { commit: Commit }, name: StateType['formData']['name']): void {
    commit('setFormDataName', name);
  },
};

export default actions;
