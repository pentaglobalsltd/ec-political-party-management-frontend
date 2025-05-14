import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  CreateAgencyProps,
  CreateAgencyPropsPagination,
} from '@type/center-officer-management/organization-list';

interface Props {
  data: CreateAgencyProps;
  id: string | number;
}

export const updateAgencyById = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    id,
  }: Props): Promise<{
    data: CreateAgencyPropsPagination;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(URLS.UPDATE_AGENCY_BY_ID(id), {
        ...data,
      });
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
