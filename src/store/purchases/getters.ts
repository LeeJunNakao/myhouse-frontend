import { State } from './protocols';

const getters = {
  getPurchasesByHouse: (state: State) => (houseId: number): State['purchases'] => {
    const housePurchases = state.purchases.filter((p) => Number(p.houseId) === Number(houseId));
    return housePurchases;
  },
  getSelectedPurchase: (state: State): State['selectedPurchase'] => state.selectedPurchase,
  getFormData: (state: State): State['formData'] => state.formData,
};

export default getters;
