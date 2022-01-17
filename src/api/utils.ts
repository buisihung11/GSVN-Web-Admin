/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import { BaseReponse, TRequestPaging } from '@/type/response';
import request from '@/utils/axios';
import { SortOrder } from 'antd/lib/table/interface';

export const buildParamsWithPro = (
  {
    current = 1,
    pageSize = 10,
    ...keywords
  }: Record<string, any> & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  },
  sorter: Record<string, SortOrder> = {},
  filters: Record<string, React.ReactText[] | null> = {},
) => {
  // build filters
  const search = {};
  if (keywords) {
    Object.entries(keywords).forEach(([key, value]) => {
      if (value) {
        search[`${key}`] = value;
      }
    });
  }
  console.log(`sorter,filters`, sorter, filters);
  // build sort
  let sortBy;
  let sortDirection;
  if (sorter && Object.keys(sorter).length) {
    const key = Object.keys(sorter)[0];
    sortBy = `${key}`;
    sortDirection = `${sorter[key] === 'ascend' ? 'asc' : 'desc'}`;
  }

  const params = {
    current,
    pageSize,
    sortBy,
    sortDirection,
    ...search,
  };
  Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
  return params;
};

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
  get: (params?: any) => Promise<AxiosResponse<T[]>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
  getById: (id: any, params?: any) => Promise<AxiosResponse<T>>;
  delete: (id: any) => Promise<AxiosResponse<any>>;
  update: (id: any, data: T) => Promise<AxiosResponse<any>>;
}
export interface BaseApiWithPaging<T> {
  get: (params?: any) => Promise<AxiosResponse<BaseReponse<T>>>;
  create: (data: Partial<T>) => Promise<AxiosResponse<T>>;
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
    create: (data) => request.post<T>(`/${resource}`, data),
    update: (id, data) => request.put<T>(`/${resource}/${id}`, data),
  };
}
