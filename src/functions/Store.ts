import { Store } from '@/protocols/composition';

class StorageManager {
    protected store: Store;

    constructor(store: Store) {
      this.store = store;
    }
}

export default StorageManager;
