export interface User {
  userId?: number;
  id?: number;
  userName?: string;
  name?: string;
  userEmail?: string;
  email?: string;
  userRole?: 'admin' | 'moderator' | 'user' | 'User';
  role?: 'admin' | 'moderator' | 'user' | 'User';
  created_at?: string;
  updated_at?: string;
  city?: string;
  address?: string;
  profileImage?: string;
  image?: string;
  gender?: string;
  [key: string]: any; // Allow any other properties for flexibility
}

// Make UsersResponse flexible to handle different formats
export interface UsersResponse {
  success?: boolean;
  message?: string;
  data?: {
    users?: User[];
  } | User[];
  users?: User[];
  [key: string]: any; // Allow any other properties
}
