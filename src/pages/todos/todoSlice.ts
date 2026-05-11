import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getTodos, type Todo } from '../../services/todoService';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  pageSize: number;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
};

export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async ({ limit, skip }: { limit: number; skip: number }, { rejectWithValue }) => {
    try {
      const data = await getTodos(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch todos');
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.total = action.payload.total;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setPageSize } = todoSlice.actions;

export default todoSlice.reducer;
