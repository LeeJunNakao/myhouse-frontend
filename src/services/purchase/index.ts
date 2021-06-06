import { service } from '../config';

const { post, get, put, del } = service;

type Timestamp = number;
type Integer = number;

interface PurchaseRequest {
  date: Timestamp;
  description: string;
  value: Integer;
}

export const createPurchase = async (houseId: number, data: PurchaseRequest) => {
  const response = await post(`/house/${houseId}/purchase`, data);
  return response.data;
};

export const getPurchase = async (houseId: number) => {
  const response = await get(`/house/${houseId}/purchase`);
  return response.data;
};

export const updatePurchase = async (houseId: number, id: number, data: PurchaseRequest) => {
  const response = await put(`/house/${houseId}/purchase/${id}`, data);
  return response.data;
};

export const deletePurchase = async (houseId: number, id: number) => {
  const response = await del(`/house/${houseId}/purchase/${id}`);
};
