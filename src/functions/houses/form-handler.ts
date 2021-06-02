import { StateType } from '@/store/houses/protocols';
import StorageManager from '../StorageManager';

export class FormHandler extends StorageManager {
  handleBack?: () => void;

  clearSelect?: () => void;

  selectHouse(house: StateType['selectedHouse']) {
    this.store.dispatch('houses/selectHouse', house);
  }

  getSelectedHouse(): StateType['selectedHouse'] {
    return this.store.getters['houses/getSelectedHouse'];
  }

  getHouses(): StateType['houses'] {
    return this.store.getters['houses/getHouses'];
  }

  getResponseMessage(): StateType['formData']['responseMessage'] {
    return this.store.getters['houses/formData'].responseMessage;
  }
}
