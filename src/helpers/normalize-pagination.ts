import { ApiPagination, Pagination } from '@api/miscellaneous/types';

export const normalizePagination = (
  page: number,
  size: number,
  pagination: ApiPagination,
  results: Array<any>,
): Pagination => {
  return {
    page,
    size,
    hasMore: Boolean(pagination?.next),
    totalCount: pagination.count,
    currentCount: results.length,
    totalPages: pagination.count / size + (pagination.count % size),
  };
};
