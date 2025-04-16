import { useToast } from './use-toast';
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAxios = () => {
  const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    withCredentials: true,
  });

  const Toast = useToast();

  const errorHandler = (error, toast: boolean) => {
    let titleMessage = '';
    if (axios.isAxiosError(error)) {
      console.log(error);
      titleMessage = error.message;
    } else {
      console.log('에러 메세지 분기 처리 필요');
      console.log('하단 에러 메세지를 확인해주세요.');
      console.log(error);
    }
    if (toast) {
      Toast.toast({
        title: titleMessage,
        variant: 'destructive',
      });
    }
  };

  async function Get(path: string, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.get(path, config);
      return response;
    } catch (err) {
      console.log('Get error');
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
  async function Patch(path: string, data: object, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.patch(path, { ...data }, config);
      return response;
    } catch (err) {
      errorHandler(err, toast);
    }
  }

  async function TypedGet<T>(path: string, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.get<T>(path, config);
      return response.data;
    } catch (err) {
      errorHandler(err, toast);
    }
  }

  async function PostText(path: string, data: string, config: AxiosRequestConfig, toast: boolean) {
    try {
      const response = await apiInstance.post(path, data, { headers: { 'Content-Type': 'text/plain' }, ...config });
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
    TypedGet,
    PostText,
    Patch,
  };
};
