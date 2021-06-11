import { House } from '@/protocols/domain/House';
import { Purchase, PurchaseCreateDto } from '@/protocols/domain/Purchase';
import * as service from '@/services/purchase';
import StorageManager from '../StorageManager';

export class ServiceHandler extends StorageManager {
  async getPurchases(): Promise<void> {
    try {
      const houses: House[] = this.store.getters['houses/getHouses'];
      const housesIds = houses.map((i) => i.id);
      if (housesIds.length) await this.requestPurchase(housesIds[0], housesIds);
    } catch (error) {
      this.store.dispatch('purchases/setFormResponseMessage', {
        status: 'error',
        message: 'Erro ao buscar compras.',
      });
    }
  }

  async createPurchase(
    houseId: House['id'],
    data: PurchaseCreateDto,
  ): Promise<Purchase | undefined> {
    try {
      const purchase = await service.createPurchase(houseId, data);
      this.store.dispatch('purchases/insertPurchase', { houseId, purchase });
      return purchase;
    } catch (error) {
      this.store.dispatch('purchases/setFormResponseMessage', {
        status: 'error',
        message: 'Erro ao inserir compra.',
      });
      return undefined;
    }
  }

  async editPurchase(houseId: House['id'], data: Purchase): Promise<boolean> {
    try {
      const purchase = await service.updatePurchase(houseId, data.id, data);
      this.store.dispatch('purchases/updatePurchase', { houseId, purchase });
      return true;
    } catch (error) {
      this.store.dispatch('purchases/setFormResponseMessage', {
        status: 'error',
        message: 'Erro ao atualizar compra.',
      });
      return false;
    }
  }

  async deletePurchase(houseId: number, purchaseId: number): Promise<boolean> {
    try {
      await service.deletePurchase(houseId, purchaseId);
      this.store.dispatch('purchases/removePurchase', { houseId, purchaseId });
      return true;
    } catch {
      return false;
    }
  }

  private async requestPurchase(houseId: House['id'], housesIds: Array<House['id']>) {
    const currentIndex = housesIds.indexOf(houseId);
    const response = await service.getPurchase(houseId);
    this.store.dispatch('purchases/setPurchases', { houseId, purchases: response });
    if (currentIndex < housesIds.length - 1) {
      const nextIndex = currentIndex + 1;
      await this.requestPurchase(housesIds[nextIndex], housesIds);
    }
  }
}
