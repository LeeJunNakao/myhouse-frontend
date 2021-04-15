/* eslint-disable max-len */
import Axios, { AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
});

export const get = async (url: string): Promise<AxiosResponse> => axios.get(url);

export const post = async (url: string, data: any): Promise<AxiosResponse> => axios.post(url, data);

export const put = async (url: string, data: any): Promise<AxiosResponse> => axios.put(url, data);
