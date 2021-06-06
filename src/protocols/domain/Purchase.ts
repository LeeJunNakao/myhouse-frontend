type Timestamp = number;

export interface Purchase {
  id: number;
  date: Timestamp;
  description: string;
  value: number;
}

export interface PurchaseCreateDto {
  date: Timestamp;
  description: string;
  value: number;
}
