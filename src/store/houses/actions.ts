import { Commit } from 'vuex';
import { StateType, House } from './protocols';

const actions = {
  setHouses({ commit }: { commit: Commit }, houses: StateType['houses']): void {
    commit('setHouses', houses);
  },
  insertHouse({ commit }: { commit: Commit }, house: House): void {
    commit('insertHouse', house);
  },
  updateHouse({ commit }: { commit: Commit }, house: House): void {
    commit('updateHouse', house);
  },
  deleteHouse({ commit }: { commit: Commit }, houseId: number): void {
    commit('deleteHouse', houseId);
  },
  selectHouse({ commit }: { commit: Commit }, house: StateType['selectedHouse']): void {
    commit('selectHouse', house);
  },
  setFormDataName({ commit }: { commit: Commit }, name: StateType['formData']['name']): void {
    commit('setFormDataName', name);
  },
};

export default actions;
