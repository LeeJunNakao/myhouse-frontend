import { Purchase } from '@/protocols/domain/Purchase';

export interface HousePurchases {
  houseId: number;
  purchases: Purchase[];
}

export interface State {
  purchases: HousePurchases[];
  selectedPurchase: Purchase | null;
  formData: {
    date: string;
    description: string;
    value: string;
    responseMessage: {
      type: string;
      message: string;
    };
  };
}

export { Purchase };
