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
  ): void {
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
  setSelectedPurchase(state: State, purchase: Purchase): void {
    state.selectedPurchase = purchase;
  },
  setFormDate(state: State, date: string): void {
    state.formData.date = date;
  },
  setFormDescription(state: State, description: string): void {
    state.formData.description = description;
  },
  setFormValue(state: State, value: string): void {
    state.formData.value = value;
  },
  setFormResponseMessage(
    state: State,
    responseMessage: State['formData']['responseMessage'],
  ): void {
    state.formData.responseMessage = responseMessage;
  },
  updatePurchase(
    state: State,
    { houseId, purchase }: { houseId: HousePurchases['houseId']; purchase: Purchase },
  ): void {
    const housePurchases = state.purchases.find((h) => Number(h.houseId) === Number(houseId));
    if (housePurchases) {
      const purchaseIndex = housePurchases.purchases.findIndex(
        (p) => Number(p.id) === Number(purchase.id),
      );
      housePurchases.purchases.splice(purchaseIndex, 1, purchase);
    }
  },
  removePurchase(
    state: State,
    { houseId, purchaseId }: { houseId: HousePurchases['houseId']; purchaseId: Purchase['id'] },
  ): void {
    const housePurchases = state.purchases.find(
      (h: HousePurchases) => Number(h.houseId) === Number(houseId),
    );
    if (housePurchases) {
      const purchaseIndex = housePurchases.purchases.findIndex((p) => Number(p.id) === purchaseId);
      housePurchases.purchases.splice(purchaseIndex, 1);
    }
  },
};

export default mutations;
