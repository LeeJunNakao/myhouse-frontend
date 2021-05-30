import StateType from '@/store/houses/protocols';
import StorageManager from '../StorageManager';

class FormHandler extends StorageManager {
  selectHouse(house: StateType['selectedHouse']) {
    this.store.dispatch('houses/selectHouse', house);
  }

  getSelectedHouse() {
    return this.store.getters['houses/getSelectedHouse'];
  }
}

export default FormHandler;
