import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById } from '../../services/userService';
import type { User, PaginationInfo, GetUsersParams } from '../../modals/user';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedRole: string | null;
  pagination: PaginationInfo;
}

const initialPagination: PaginationInfo = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedRole: null,
  pagination: initialPagination,
};

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async (params: GetUsersParams = { page: 1, limit: 10 }, { rejectWithValue }) => {
    try {
      const data = await fetchUsers(params);
      console.log('loadUsers data:', data);
      
      // Return the whole response so we can get users AND pagination
      return data;
    } catch (error: any) {
      console.error('loadUsers error:', error);
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const loadUserById = createAsyncThunk(
  'users/loadUserById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const data = await fetchUserById(id);
      console.log('loadUserById data:', data);
      const dataAny = data as any;
      
      // Handle different response structures
      if (dataAny.success && dataAny.data) {
        return dataAny.data;
      }
      return data;
    } catch (error: any) {
      console.error('loadUserById error:', error);
      return rejectWithValue(error.message || 'Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<string | null>) => {
      console.log('data', action.payload);
      state.selectedRole = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addUserToList: (state, action: PayloadAction<User>) => {
      state.users = [action.payload, ...state.users];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        
        console.log('loadUsers.fulfilled action.payload:', action.payload);
        
        const payload: any = action.payload;
        
        let usersList: any[] = [];
        
        if (Array.isArray(payload)) {
          usersList = payload;
        } else if (payload?.success && Array.isArray(payload?.data)) {
          usersList = payload.data;
        } else if (payload?.success && payload?.data?.users && Array.isArray(payload.data.users)) {
          usersList = payload.data.users;
        } else if (Array.isArray(payload?.data)) {
          usersList = payload.data;
        }
        
        state.users = usersList;
        
        let paginationData: any = initialPagination;
        
        if (payload?.pagination) {
          paginationData = payload.pagination;
        }
        
        state.pagination = paginationData;
        
        console.log('loadUsers.fulfilled - state.users set to:', state.users);
        console.log('loadUsers.fulfilled - state.pagination set to:', state.pagination);
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loadUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setSelectedRole, clearCurrentUser, addUserToList, setCurrentPage } = userSlice.actions;

export default userSlice.reducer;