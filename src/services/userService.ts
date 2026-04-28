
import type { User, UsersResponse } from '../modals/user';
import apiHelper from './ApiHelper';

export const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await apiHelper.get<UsersResponse>('/users');
  return response.data;
};

export const fetchUserById = async (id: number | string): Promise<User> => {
  const response = await apiHelper.get<User>(`/users/${id}`);
  return response.data;
};

export const addUser = async (payload: Partial<User>): Promise<User> => {
  const response = await apiHelper.post<User>(`/users/add`, payload);
  return response.data;
};
