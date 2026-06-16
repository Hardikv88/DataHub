export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: Reactions;
  views?: number;
  userId: number;
  [key: string]: any;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostsResponse {
  success: boolean;
  data: Post[];
  pagination: PaginationInfo;
  message?: string;
  [key: string]: any;
}

export interface GetPostsParams {
  page: number;
  limit: number;
}
