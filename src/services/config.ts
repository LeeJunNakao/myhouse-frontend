/* eslint-disable max-len */
import Axios, { AxiosResponse, AxiosInstance } from 'axios';

const makeService = (client: AxiosInstance) => ({ async get(url: string): Promise<AxiosResponse> {
  return client.get(url);
},
async post(url: string, data: any): Promise<AxiosResponse> {
  return client.post(url, data);
},
async put(url: string, data: any): Promise<AxiosResponse> {
  return client.put(url, data);
},
async del(url: string): Promise<AxiosResponse> {
  return client.delete(url);
} });

const authAxios = Axios.create({ baseURL: process.env.VUE_APP_AUTH_URL });

const axios = Axios.create({ baseURL: process.env.VUE_APP_SERVER_URL,
  headers: { token: localStorage.getItem('token') } });

export const authService = makeService(authAxios);
export const service = makeService(axios);
