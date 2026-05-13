import apiHelper from "./ApiHelper";

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export interface QuotesResponse {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
}

export const getQuotes = async (limit: number = 30, skip: number = 0): Promise<QuotesResponse> => {
  const response = await apiHelper.get<QuotesResponse>(`/quotes?limit=${limit}&skip=${skip}`);
  return response.data;
};
