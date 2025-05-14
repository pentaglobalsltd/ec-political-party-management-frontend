import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { AgenciesListGetProps } from '@type/center-officer-management/organization-list';
import { CenterOfficerManagementSearchProps } from '@type/search-types';

export const getAgencyList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: CenterOfficerManagementSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: AgenciesListGetProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_AGENCY_LIST, {
      page: page as number,
      size: size as number,
      zillaId: searchItems?.zillaId as number,
      upazilaId: searchItems?.upazilaId as number,
      municipalityId: searchItems?.municipalityId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      isActive: searchItems?.isActive as boolean,
      nameBn: searchItems?.nameBn as string,
      ...(searchItems?.agencyTypeIds && {
        agencyTypeIds: `${searchItems?.agencyTypeIds}`,
      }),
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
