import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getQuotes, type Quote } from '../../services/quoteService';

interface QuoteState {
  quotes: Quote[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  pageSize: number;
}

const initialState: QuoteState = {
  quotes: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  pageSize: 30,
};

export const loadQuotes = createAsyncThunk(
  'quotes/loadQuotes',
  async ({ limit, skip }: { limit: number; skip: number }, { rejectWithValue }) => {
    try {
      const data = await getQuotes(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch quotes');
    }
  }
);

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    addQuoteLocal: (state, action: PayloadAction<Quote>) => {
      state.quotes = [action.payload, ...state.quotes];
      state.total += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload.quotes;
        state.total = action.payload.total;
      })
      .addCase(loadQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setPageSize, addQuoteLocal } = quoteSlice.actions;

export default quoteSlice.reducer;
