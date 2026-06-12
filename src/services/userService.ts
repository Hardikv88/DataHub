
import type { User, UsersResponse, GetUsersParams } from '../modals/user';
import { apiHelperOne } from './ApiHelper';

export interface RegisterRequest {
  userName: string;
  userEmail: string;
  userPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    userRole: string;
    userId: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    updated_at: string;
    created_at: string;
  };
}

export const fetchUsers = async (params: GetUsersParams = { page: 1, limit: 10 }): Promise<UsersResponse> => {
  console.log('fetchUsers called with params:', params);
  const response = await apiHelperOne.post<UsersResponse>('/users', params);
  console.log('fetchUsers response:', response);
  console.log('fetchUsers response.data:', response.data);
  return response.data;
};

export const fetchUserById = async (id: number | string): Promise<User> => {
  console.log('fetchUserById called with id:', id);
  const response = await apiHelperOne.get<User>(`/users/${id}`);
  console.log('fetchUserById response:', response);
  console.log('fetchUserById response.data:', response.data);
  return response.data;
};

export const addUser = async (payload: Partial<User>): Promise<User> => {
  const response = await apiHelperOne.post<User>(`/users/add`, payload);
  return response.data;
};

export const registerUser = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const response = await apiHelperOne.post<RegisterResponse>('/users', payload);
  return response.data;
};