export type APIResponse<T> = {
  result: T;
};

export type ApiPagination = {
  first: number;
  last: number;
  next?: number;
  prev?: number;
  count: number;
};

export type Pagination = {
  page?: number;
  size?: number;
  hasMore?: boolean;
  totalCount?: number;
  total?: number;
  currentCount?: number;
  totalPages?: number;
};

export type PaginatedAPIResponse<T> = {
  result: T[];
  meta: {
    pagination: ApiPagination;
  };
};
