import { StateType as UserState } from '@/store/user/protocols';
import StorageManager from '../StorageManager';

class UserStore extends StorageManager {
  setUserData(userData: UserState): void {
    this.store.dispatch('user/setUserData', userData);
  }
}

export default UserStore;
