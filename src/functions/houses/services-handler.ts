import { House } from '@/protocols/domain/House';
import * as houseService from '@/services/house';
import StorageManager from '../StorageManager';

export class ServiceHandler extends StorageManager {
  async getHouses(): Promise<House[]> {
    try {
      const response = await houseService.getHouse();
      this.store.dispatch('houses/setHouses', response);
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'success',
        message: 'Casas carregadas com êxito',
      });
      return response;
    } catch {
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'error',
        message: 'Erro ao buscar casas',
      });
      return [];
    }
  }

  async createHouse(name: string): Promise<House | undefined> {
    try {
      const response = await houseService.createHouse({ name });
      this.store.dispatch('houses/insertHouse', response);
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'success',
        message: 'Casa criada com successo',
      });
      return response;
    } catch {
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'error',
        message: 'Erro ao criar casa',
      });
      return undefined;
    }
  }

  async updateHouse(house: House): Promise<House | undefined> {
    try {
      const response = await houseService.updateHouse(house.id, house);
      this.store.dispatch('houses/updateHouse', response);
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'success',
        message: 'Casa atualizada com successo',
      });
      return response;
    } catch {
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'error',
        message: 'Erro ao atualizar casa',
      });
      return undefined;
    }
  }

  async deleteHouse(): Promise<void> {
    try {
      const { id } = this.store.getters['houses/getSelectedHouse'];
      await houseService.deleteHouse(id);
      this.store.dispatch('houses/deleteHouse', id);
      this.store.dispatch('houses/selectHouse', null);
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'success',
        message: 'Casa deletada com successo',
      });
    } catch {
      this.store.dispatch('houses/setFormDataResponseMessage', {
        type: 'error',
        message: 'Erro ao deletar casa',
      });
    }
  }
}
