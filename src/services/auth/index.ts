import { post } from './config';
import {
  LoginRequest, TokenResponse, RegisterRequest, TokenRequest, UserInfo,
} from './protocols';

export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await post('/signin', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<TokenResponse> => {
  const response = await post('/signup', data);
  return response.data;
};

export const validateToken = async (data: TokenRequest): Promise<UserInfo> => {
  const response = await post('/validate-token', data);
  return response.data;
};
