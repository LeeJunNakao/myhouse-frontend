import { State } from '@/store/purchases/protocols';
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

  getItems(houseId: number): State['purchases'] {
    return this.store.getters['purchases/getPurchasesByHouse'](houseId);
  }

  getResponseMessage(): State['formData']['responseMessage'] {
    return this.store.getters['purchases/getFormData'].responseMessage;
  }

  getFormData(): State['formData'] {
    return this.store.getters['purchases/getFormData'];
  }
}
