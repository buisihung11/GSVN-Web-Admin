export type BaseReponse<T> = {
  items: T[];
  nextPage: number;
  totalPage: number;
  currentPage: number;
  totalItems: number;
};

export type TRequestPaging = {
  pageSize?: number;
  pageNumber?: number;
  [key: string]: any;
};

export type ErrorResponse = {
  error: {
    message: string;
    reason: string;
  };
};
