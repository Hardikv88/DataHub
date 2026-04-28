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
      return data.users;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  }
);

export const loadUserById = createAsyncThunk(
  'users/loadUserById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const data = await fetchUserById(id);
      return data;
    } catch (error: any) {
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
      console.log('data',action.payload)
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
        state.users = action.payload;
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
