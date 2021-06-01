import { StateType } from '@/store/houses/protocols';
import StorageManager from '../StorageManager';

export class FormHandler extends StorageManager {
  handleBack?: () => void;

  clearSelect?: () => void;

  selectHouse(house: StateType['selectedHouse']) {
    this.store.dispatch('houses/selectHouse', house);
  }

  getSelectedHouse() {
    return this.store.getters['houses/getSelectedHouse'];
  }

  getHouses() {
    return this.store.getters['houses/getHouses'];
  }
}
