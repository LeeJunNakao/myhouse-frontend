import { State, HousePurchases, Purchase } from './protocols';

const mutations = {
  setPurchases(
    state: State,
    { houseId, purchases }: { houseId: HousePurchases['houseId']; purchases: Purchase[] },
  ) {
    const housePurchases = {
      houseId,
      purchases,
    };
    state.purchases.push(housePurchases);
  },
  setSelectedPurchase(state: State, purchase: Purchase) {
    state.selectedPurchase = purchase;
  },
  setFormDate(state: State, date: Date) {
    state.formData.date = date;
  },
  setFormDescription(state: State, description: string) {
    state.formData.description = description;
  },
  setFormValue(state: State, value: number) {
    state.formData.value = value;
  },
};

export default mutations;
