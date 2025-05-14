import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { masterApi } from '@helpers/interceptors/master-data';
import {
  SubDistrictResponseType,
  SubDistrictSearchProps,
} from '@type/election-declaration-management/main-list/sub-district/sub-district-types';
import { ElectionSchedulesSubDistrictsRes } from '@type/election-schedule-sub-district-types';

export interface PropsApiGetSubDistrict {
  searchItems: SubDistrictSearchProps;
  page?: number;
  size?: number;
}

export const getSubDistrictListFromZilla = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (zillaId: number | string): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        URLS.GET_UPAZILLAS_FROM_ZILLA(zillaId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getUpalizaByMunicipality = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ municipality, district }: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(
        encodeQuery(URLS.GET_SUB_DISTRICT_LIST, {
          ...{ page: 0 },
          ...{ size: 1000 },
          ...{ municipalityId: municipality },
          ...{ zillaId: district },
        }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const getSubDistricts = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    searchItems,
    page,
    size,
  }: PropsApiGetSubDistrict): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_SUB_DISTRICT_LIST, {
      page: page as number,
      size: size as number,
      regionId: searchItems?.regionId as number,
      zillaId: searchItems?.zillaId as number,
      upazilaIds: searchItems?.upazilaId as number,
    });

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(url);
      return { data: response.data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createSubdistrict = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
  }: any): Promise<{ data: ElectionSchedulesSubDistrictsRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.post(URLS.CREATE_UPAZILLA, {
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

export const updateSubDistrict = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
    data: any,
  ): Promise<{ data: SubDistrictResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.put(URLS.UPDATE_UPAZILLA(id), {
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

export const fetchSubDistrict = (() => {
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
      const response = await noAuthMasterApi.get(URLS.GET_SUB_DISTRICT(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
