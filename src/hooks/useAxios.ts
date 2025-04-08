import { useToast } from './use-toast';
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAxios = () => {
  const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    withCredentials: true,
  });

  const Toast = useToast();
  const errorHandler = (error, toast: boolean) => {
    if (toast) {
      Toast.toast({
        title: 'Hello World!',
        description: error.response.data,
      });
    }
  };

  async function Get(path: string, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.get(path, config);
      return response;
    } catch (err) {
      errorHandler(err, toast);
    }
  }
  async function Delete(path: string, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.delete(path, config);
      return response;
    } catch (err) {
      errorHandler(err, toast);
    }
  }
  async function Post(path: string, data: object, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.post(path, { ...data }, config);
      return response;
    } catch (err) {
      errorHandler(err, toast);
    }
  }
  async function Put(path: string, data: object, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.put(path, { ...data }, config);
      return response;
    } catch (err) {
      errorHandler(err, toast);
    }
  }

  return {
    Get,
    Delete,
    Post,
    Put,
  };
};
