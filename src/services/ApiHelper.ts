import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class ApiHelper {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL, // 👉 Change your base URL
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // Request Interceptor (Add token here if needed)
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor (Handle global errors)
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error?.response || error.message);
        return Promise.reject(error);
      }
    );
  }

  // GET
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // POST
  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // PUT
  public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  // PATCH
  public patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  // DELETE
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

// Export single instance (Singleton)
const apiHelper = new ApiHelper();
export default apiHelper;