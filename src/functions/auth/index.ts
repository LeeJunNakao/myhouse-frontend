import StorageManager from '../Store';

class AuthStore extends StorageManager {
  setToken(token: string | null): void {
    this.store.dispatch('auth/setToken', token);
  }

  authenticate(): void {
    this.store.dispatch('auth/setAuthentication', true);
  }

  logout(): void {
    this.store.dispatch('auth/setAuthentication', false);
    this.store.dispatch('auth/removeToken');
  }

  getToken(): string {
    return this.store.getters['auth/getToken'];
  }

  getIsAuthenticated(): boolean {
    return this.store.getters['auth/isAuthenticated'];
  }
}

export default AuthStore;
