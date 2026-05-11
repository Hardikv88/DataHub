import apiHelper from "./ApiHelper";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export const getTodos = async (limit: number = 10, skip: number = 0): Promise<TodosResponse> => {
  const response = await apiHelper.get<TodosResponse>(`/todos?limit=${limit}&skip=${skip}`);
  return response.data;
};
