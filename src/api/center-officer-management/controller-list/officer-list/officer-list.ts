import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { PollingPersonnelSearchProps } from '@hooks/center-officer-management/controller-list/officer-list/useGetOfficerList';
import { pollingPersonnelApi } from '@helpers/interceptors/polling-personnel';

interface OfficerAPIProps {
  searchItems: PollingPersonnelSearchProps;
  page?: number;
  size?: number;
}

export const fetchOfficerList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    searchItems,
    page,
    size,
  }: OfficerAPIProps): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_OFFICERS, {
      page: page as number,
      size: size as number,
      zillaId: searchItems.zillaId as number,
      upzilaId: searchItems?.upazilaId as number,
      municipalityId: searchItems?.municipalityId as number,
      unionOrWardsId: searchItems?.unionOrWardId as number,
      agencyId: searchItems?.agencyId as number,
      nameNidPhoneParameter: searchItems?.nameNidPhoneParameter as string,
    });

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createOfficer = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
  }: any): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.post(URLS.CREATE_OFFICER, {
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

export const fetchOfficer = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: string | number): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.get(URLS.GET_OFFICER(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const fetchUpdateOfficer = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (id: string | number, data: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await pollingPersonnelApi.put(URLS.UPDATE_OFFICER(id), {
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
