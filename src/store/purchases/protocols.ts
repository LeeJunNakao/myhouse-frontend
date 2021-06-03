import { Purchase } from '@/protocols/domain/Purchase';

export interface HousePurchases {
  houseId: number;
  purchases: Purchase[];
}

export interface State {
  purchases: HousePurchases[];
  selectedPurchase: Purchase | null;
  formData: {
    date: Date | null;
    description: string;
    value: number;
    responseMessage: {
      type: string;
      message: string;
    };
  };
}

export { Purchase };
