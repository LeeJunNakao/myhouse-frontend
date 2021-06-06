import { State, HousePurchases, Purchase } from './protocols';

const mutations = {
  setPurchases(
    state: State,
    { houseId, purchases }: { houseId: HousePurchases['houseId']; purchases: Purchase[] },
  ): void {
    const housePurchases = {
      houseId,
      purchases,
    };
    state.purchases.push(housePurchases);
  },
  insertPurchase(
    state: State,
    { houseId, purchase }: { houseId: HousePurchases['houseId']; purchase: Purchase },
  ) {
    const housePurchase = state.purchases.find((i) => Number(i.houseId) === Number(houseId));

    if (housePurchase) housePurchase.purchases.push(purchase);
    else {
      const newHousePurchase: HousePurchases = {
        houseId,
        purchases: [purchase],
      };
      state.purchases.push(newHousePurchase);
    }
  },
  setSelectedPurchase(state: State, purchase: Purchase) {
    state.selectedPurchase = purchase;
  },
  setFormDate(state: State, date: string) {
    state.formData.date = date;
  },
  setFormDescription(state: State, description: string) {
    state.formData.description = description;
  },
  setFormValue(state: State, value: string) {
    state.formData.value = value;
  },
};

export default mutations;
