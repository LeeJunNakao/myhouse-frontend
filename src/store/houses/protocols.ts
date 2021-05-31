import { House } from '@/protocols/domain/House';

interface StateType {
  houses: House[];
  selectedHouse: House | null;
  formData: {
    name: House['name'];
  };
}

export { House, StateType };
