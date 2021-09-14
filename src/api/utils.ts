import { AxiosResponse } from 'axios';
import { BaseReponse, TRequestPaging } from '@/type/response';
import request from '@/utils/axios';

export const transformParamFromProTable = (params: {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
  [key: string]: any;
}): TRequestPaging => {
  return {
    pageNumber: params?.current,
    pageSize: params?.pageSize,
    ...(params || {}),
  };
};

export interface BaseApi<T> {
  get: (params: any) => Promise<AxiosResponse<T[]>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  getById: (id: any, params?: any) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}
export interface BaseApiWithPaging<T> {
  get: (params?: any) => Promise<AxiosResponse<BaseReponse<T>>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<BaseReponse<T>>>;
  getById: (id: any, params?: any) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}

export function generateAPI<T>(resource: string): BaseApi<T> {
  return {
    get: (params) =>
      request.get<T[]>(`/${resource}`, {
        params,
      }),
    getById: (id, params) =>
      request.get<T>(`/${resource}/${id}`, {
        params,
      }),
    delete: (id) => request.delete<any>(`/${resource}/${id}`),
    create: (data) => request.post<T>(`/${resource}`, data),
    update: (id, data) => request.put<T>(`/${resource}/${id}`, data),
  };
}

export function generateAPIWithPaging<T>(resource: string): BaseApiWithPaging<T> {
  return {
    get: (params) =>
      request.get<BaseReponse<T>>(`/${resource}`, {
        params: transformParamFromProTable(params),
      }),
    getById: (id, params) =>
      request.get<T>(`/${resource}/${id}`, {
        params: transformParamFromProTable(params),
      }),
    delete: (id) => request.delete<any>(`/${resource}/${id}`),
    create: (data) => request.post<BaseReponse<T>>(`/${resource}`, data),
    update: (id, data) => request.put<T>(`/${resource}/${id}`, data),
  };
}