import { House } from '@/protocols/domain/House';
import * as houseService from '@/services/house';
import StorageManager from '../StorageManager';

export class ServiceHandler extends StorageManager {
  async getHouses() {
    const response = await houseService.getHouse();
    this.store.dispatch('houses/setHouses', response);
  }

  async createHouse(name: string) {
    const response = await houseService.createHouse({ name });
    this.store.dispatch('houses/insertHouse', response);
  }

  async updateHouse(house: House) {
    const response = await houseService.updateHouse(house.id, house);
    this.store.dispatch('house/updateHouse', response);
  }
}
