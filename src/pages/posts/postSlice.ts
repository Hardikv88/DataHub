import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchPosts, searchPosts, fetchPostById } from '../../services/postService';
import type { Post, PaginationInfo } from '../../modals/post';

interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      const data = await fetchPosts(page, limit);
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
  'posts/detail/loadPostById',
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
      state.pagination.totalItems += 1;
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
        // Handle multiple possible response formats
        if (action.payload.data && Array.isArray(action.payload.data)) {
          state.posts = action.payload.data;
        } else if (action.payload.posts && Array.isArray(action.payload.posts)) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [];
        }
        
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        } else if (typeof action.payload.total === 'number') {
          state.pagination.totalItems = action.payload.total;
        }
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
        // Handle multiple possible response formats
        if (action.payload.data && Array.isArray(action.payload.data)) {
          state.posts = action.payload.data;
        } else if (action.payload.posts && Array.isArray(action.payload.posts)) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [];
        }
        
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        } else if (typeof action.payload.total === 'number') {
          state.pagination.totalItems = action.payload.total;
        }
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
        console.log('loadPostById fulfilled - action.payload:', action.payload);
        // Handle multiple possible response formats
        if (action.payload.data) {
          state.selectedPost = action.payload.data;
        } else {
          state.selectedPost = action.payload;
        }
      })
      .addCase(loadPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setPageSize, setSearchQuery, clearSelectedPost, addPostToList } = postSlice.actions;

export default postSlice.reducer;
