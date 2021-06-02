import { House } from '@/protocols/domain/House';

export interface StateType {
  houses: House[];
  selectedHouse: House | null;
  formData: {
    name: House['name'];
    responseMessage: {
      type: string;
      message: string;
    };
  };
}

export { House };
