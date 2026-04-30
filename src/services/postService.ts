
import type { PostsResponse } from '../modals/post';
import apiHelper from './ApiHelper';


export const fetchPosts = async (limit: number = 10, skip: number = 0): Promise<PostsResponse> => {
  const response = await apiHelper.get<PostsResponse>('/posts', {
    params: {
      limit,
      skip
    }
  });
  return response.data;
};

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await apiHelper.get<PostsResponse>(`/posts/search`, {
    params: {
      q: query
    }
  });
  return response.data;
};
