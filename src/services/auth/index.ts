import { post } from './config';
import { LoginRequest, TokenResponse, RegisterRequest } from './protocols';

export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await post('/signin', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<TokenResponse> => {
  const response = await post('/signup', data);
  return response.data;
};
