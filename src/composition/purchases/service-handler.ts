import { House } from '@/protocols/domain/House';
import { Purchase, PurchaseCreateDto } from '@/protocols/domain/Purchase';
import * as service from '@/services/purchase';
import StorageManager from '../StorageManager';

export class ServiceHandler extends StorageManager {
  async getPurchases(): Promise<void> {
    const houses: House[] = this.store.getters['houses/getHouses'];
    const housesIds = houses.map((i) => i.id);
    await this.requestPurchase(housesIds[0], housesIds);
  }

  async createPurchase(houseId: House['id'], data: PurchaseCreateDto): Promise<Purchase> {
    const purchase = await service.createPurchase(houseId, data);
    this.store.dispatch('purchases/insertPurchase', { houseId, purchase });
    console.log('purchase', purchase);
    return purchase;
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
