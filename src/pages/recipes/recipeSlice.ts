import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchRecipes, searchRecipes, fetchRecipeById } from '../../services/recipeService';
import type { Recipe } from '../../modals/recipe';

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  pageSize: 10,
  searchQuery: '',
};

export const loadRecipes = createAsyncThunk(
  'recipes/loadRecipes',
  async ({ limit, skip }: { limit: number; skip: number }, { rejectWithValue }) => {
    try {
      const data = await fetchRecipes(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recipes');
    }
  }
);

export const searchAllRecipes = createAsyncThunk(
  'recipes/searchAllRecipes',
  async (query: string, { rejectWithValue }) => {
    try {
      const data = await searchRecipes(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to search recipes');
    }
  }
);

export const loadRecipeById = createAsyncThunk(
  'recipes/loadRecipeById',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const data = await fetchRecipeById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch recipe details');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
        state.total = action.payload.total;
      })
      .addCase(loadRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchAllRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
        state.total = action.payload.total;
        state.currentPage = 1;
      })
      .addCase(searchAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(loadRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setPageSize, setSearchQuery, clearSelectedRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;