import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts, searchPosts, fetchPostById } from '../../services/postService';
import type { Post } from '../../modals/post';

interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({ limit, skip }: { limit: number; skip: number }, { rejectWithValue }) => {
    try {
      const data = await fetchPosts(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const searchAllPosts = createAsyncThunk(
  'posts/searchAllPosts',
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await searchPosts(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search posts');
    }
  }
);

export const loadPostById = createAsyncThunk(
  'posts/loadPostById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const data = await fetchPostById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch post');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page on size change
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
    addPostToList: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
      state.total += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.total = action.payload.total;
        state.currentPage = 1;
      })
      .addCase(searchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(loadPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setPageSize, setSearchQuery, clearSelectedPost, addPostToList } = postSlice.actions;

export default postSlice.reducer;
