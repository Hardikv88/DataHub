import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById } from '../../services/userService';
import type { User } from '../../modals/user';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedRole: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedRole: null,
};

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUsers();
      console.log('loadUsers data:', data);
      const dataAny = data as any;
      
      // Check if data is already an array
      if (Array.isArray(dataAny)) {
        console.log('data is array, returning it');
        return dataAny;
      }
      
      // Check if data.success exists and data.data.users exists
      if (dataAny.success && dataAny.data?.users) {
        console.log('found data.data.users, returning');
        return dataAny.data.users;
      }
      
      // Check if data.users exists directly
      if (dataAny.users) {
        console.log('found data.users directly, returning');
        return dataAny.users;
      }
      
      // Check if data.data exists and is an array
      if (Array.isArray(dataAny.data)) {
        console.log('data.data is array, returning');
        return dataAny.data;
      }
      
      // Otherwise return empty array
      console.log('no valid user data found, returning empty array');
      return [];
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Make sure payload is an array, else default to empty
        state.users = Array.isArray(action.payload) ? action.payload : [];
        console.log('loadUsers.fulfilled - state.users set to:', state.users);
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

export const { setSearchTerm, setSelectedRole, clearCurrentUser, addUserToList } = userSlice.actions;

export default userSlice.reducer;