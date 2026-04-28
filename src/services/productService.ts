import type { Product } from '../modals/ProductResponseModal';
import apiHelper from './ApiHelper';


export const productService = {
  getProductById: async (id: string): Promise<Product> => {
    const response = await apiHelper.get<Product>(`/products/${id}`);
    return response.data;
  }
};
