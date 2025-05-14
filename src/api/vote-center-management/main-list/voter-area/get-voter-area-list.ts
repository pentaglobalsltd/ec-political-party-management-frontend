import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { VoterAreaGetResponseType } from '@type/vote-center-management/voter-area-type';
import { VoterAreaSearchProps } from '@type/search-types';

export const fetchGetVoterArea = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: VoterAreaSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: VoterAreaGetResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_VOTER_AREAS, {
      page: page as number,
      size: size as number,
      zillaId: searchItems?.zillaId as number,
      upazilaId: searchItems?.upazilaId as number,
      municipalityId: searchItems?.municipalityId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      areaCode: searchItems?.areaCode as string,
      nameBn: searchItems?.nameBn as string,
    });

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
