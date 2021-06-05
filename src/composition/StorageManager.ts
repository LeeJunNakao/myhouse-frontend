import { Store } from '@/protocols/composition';

class StorageManager {
  protected store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  callAction(action: string, value: any): void {
    this.store.dispatch(action, value);
  }
}

export default StorageManager;
