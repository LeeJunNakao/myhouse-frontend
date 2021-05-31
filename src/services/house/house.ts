import { service } from '../config';

const { post, get, put, del } = service;

interface HouseRequest {
  name: string;
  members?: number[];
}

export const createHouse = async (data: HouseRequest) => {
  const response = await post('/house', data);
  return response.data;
};

export const getHouse = async () => {
  const response = await get('/house');
  return response.data;
};

export const updateHouse = async (id: number, data: HouseRequest) => {
  const response = await put(`/house/${id}`, data);
  return response.data;
};

export const deleteHouse = async (id: number) => {
  const response = await del(`/house/${id}`);
};
