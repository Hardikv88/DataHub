import type { PostsResponse, Post } from '../modals/post';
import { apiHelperOne} from "./ApiHelper";


export const fetchPosts = async (page: number = 1, limit: number = 10): Promise<PostsResponse> => {
  const response = await apiHelperOne.post<PostsResponse>('/posts', {
    page,
    limit
  });
  return response.data;
};

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await apiHelperOne.get<PostsResponse>(`/posts/search`, {
    params: {
      q: query
    }
  });
  return response.data;
};

export const fetchPostById = async (id: number | string): Promise<Post> => {
  const response = await apiHelperOne.post<Post>('/posts/detail', { postId: id });
  console.log('fetchPostById response:', response);
  return response.data;
};

export const createPost = async (payload: Partial<Post>): Promise<Post> => {
  const response = await apiHelperOne.post<Post>(`/posts/create`, payload);
  console.log('createPost full response:', response);
  console.log('createPost response.data:', response.data);
  // Handle multiple response formats
  let postData: Post;
  if (response.data && response.data.data) {
    postData = response.data.data;
  } else if (response.data) {
    postData = response.data;
  } else {
    postData = response as any;
  }
  return {
    ...postData,
    reactions: postData.reactions || { likes: 0, dislikes: 0 },
    views: postData.views || 0,
    tags: postData.tags || [],
  };
};
