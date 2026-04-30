
import type { PostsResponse, Post } from '../modals/post';
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

export const fetchPostById = async (id: number | string): Promise<Post> => {
  const response = await apiHelper.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (payload: Partial<Post>): Promise<Post> => {
  const response = await apiHelper.post<Post>(`/posts/add`, payload);
  return {
    ...response.data,
    reactions: response.data.reactions || { likes: 0, dislikes: 0 },
    views: response.data.views || 0,
  };
};
