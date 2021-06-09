import { State, HousePurchases } from '@/store/purchases/protocols';
import { FormHandler as IFormHandler } from '../protocols';
import StorageManager from '../StorageManager';

export class FormHandler extends StorageManager implements IFormHandler {
  handleBack?: () => void;

  clearSelect?: () => void;

  selectItem(purchase: State['selectedPurchase']) {
    this.store.dispatch('purchases/setSelectedPurchase', purchase);
  }

  getSelectedItem(): State['selectedPurchase'] {
    return this.store.getters['purchases/getSelectedPurchase'];
  }

  getItems(houseId: number): HousePurchases['purchases'] {
    return this.store.getters['purchases/getPurchasesByHouse'](houseId)[0]?.purchases || [];
  }

  getResponseMessage(): State['formData']['responseMessage'] {
    return this.store.getters['purchases/getFormData'].responseMessage;
  }

  getFormData(): State['formData'] {
    return this.store.getters['purchases/getFormData'];
  }

  clearForm(): void {
    this.store.dispatch('purchases/clearForm');
  }
}
