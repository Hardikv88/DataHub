import { apiHelper} from './ApiHelper';
import type { RecipesResponse, Recipe } from '../modals/recipe';

export const fetchRecipes = async (limit: number = 10, skip: number = 0): Promise<RecipesResponse> => {
  const response = await apiHelper.get<RecipesResponse>('/recipes', {
    params: {
      limit,
      skip
    }
  });
  return response.data;
};

export const searchRecipes = async (query: string): Promise<RecipesResponse> => {
  const response = await apiHelper.get<RecipesResponse>(`/recipes/search`, {
    params: {
      q: query
    }
  });
  return response.data;
};

export const fetchRecipeById = async (id: number | string): Promise<Recipe> => {
  const response = await apiHelper.get<Recipe>(`/recipes/${id}`);
  return response.data;
};
