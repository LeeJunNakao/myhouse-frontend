import { Commit } from 'vuex';
import { State, House } from './protocols';

const actions = {
  setHouses({ commit }: { commit: Commit }, houses: State['houses']): void {
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
  selectHouse({ commit }: { commit: Commit }, house: State['selectedHouse']): void {
    commit('selectHouse', house);
  },
  setFormDataName({ commit }: { commit: Commit }, name: State['formData']['name']): void {
    commit('setFormDataName', name);
  },
  setFormDataResponseMessage(
    { commit }: { commit: Commit },
    responseMessage: State['formData']['responseMessage'],
  ): void {
    commit('setFormDataResponseMessage', responseMessage);
  },
};

export default actions;
