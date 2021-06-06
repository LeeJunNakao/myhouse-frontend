import { Commit } from 'vuex';
import { Purchase, HousePurchases } from './protocols';

const actions = {
  setPurchases(
    { commit }: { commit: Commit },
    { houseId, purchases }: { houseId: HousePurchases['houseId']; purchases: Purchase[] },
  ): void {
    commit('setPurchases', { houseId, purchases });
  },
  insertPurchase(
    { commit }: { commit: Commit },
    { houseId, purchase }: { houseId: HousePurchases['houseId']; purchase: Purchase },
  ): void {
    commit('insertPurchase', { houseId, purchase });
  },
  setSelectedPurchase({ commit }: { commit: Commit }, purchase: Purchase): void {
    commit('setSelectedPurchase', purchase);
  },
  setFormDate({ commit }: { commit: Commit }, date: Date): void {
    commit('setFormDate', date);
  },
  setFormDescription({ commit }: { commit: Commit }, description: string): void {
    commit('setFormDescription', description);
  },
  setFormValue({ commit }: { commit: Commit }, value: number): void {
    commit('setFormValue', value);
  },
};

export default actions;
