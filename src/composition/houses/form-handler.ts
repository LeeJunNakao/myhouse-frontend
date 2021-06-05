import { State } from '@/store/houses/protocols';
import StorageManager from '../StorageManager';
import { FormHandler as IFormHandler } from '../protocols';

export class FormHandler extends StorageManager implements IFormHandler {
  handleBack?: () => void;

  clearSelect?: () => void;

  selectItem(house: State['selectedHouse']) {
    this.store.dispatch('houses/selectHouse', house);
  }

  getSelectedItem(): State['selectedHouse'] {
    return this.store.getters['houses/getSelectedHouse'];
  }

  getItems(): State['houses'] {
    return this.store.getters['houses/getHouses'];
  }

  getResponseMessage(): State['formData']['responseMessage'] {
    return this.store.getters['houses/formData'].responseMessage;
  }

  getFormData(): State['formData'] {
    return this.store.getters['houses/formData'];
  }
}
