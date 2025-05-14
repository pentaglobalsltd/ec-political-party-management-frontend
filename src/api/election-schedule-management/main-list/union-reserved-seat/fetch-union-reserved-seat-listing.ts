import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { GetUnionReservedSeatListingResponseType } from '@type/election-declaration-management/main-list/union-reserved-seat/get-union-reserved-seat-listing-types';
import { encodeQuery } from '@pentabd/ui';

export interface ReserveUnionWardQueryParams {
  regionId?: number;
  zillaId?: number;
  upazilaId?: number;
  unionId?: number;
  page?: number;
  size?: number;
  code?: number;
  nameBn?: string;
  nameEn?: string;
}

export const fetchReserveUnionWardList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: ReserveUnionWardQueryParams,
  ): Promise<{ data: GetUnionReservedSeatListingResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const url = encodeQuery(URLS.GET_UNION_RESERVED_WARD, {
        ...params,
      });

      const response = await masterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
