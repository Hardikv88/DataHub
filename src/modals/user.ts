export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userRole: 'admin' | 'moderator' | 'user' | 'User';
  gender: string;
  city: string;
  address: string;
  profileImage: string;
  created_at: string;
  updated_at: string;
  id?: number;
  name?: string;
  email?: string;
  role?: 'admin' | 'moderator' | 'user' | 'User';
  image?: string;
  [key: string]: any;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: PaginationInfo;
  message?: string;
  [key: string]: any;
}

export interface GetUsersParams {
  page: number;
  limit: number;
}
