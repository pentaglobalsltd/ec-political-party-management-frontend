import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { masterApi } from '@helpers/interceptors/master-data';
import { MunicipalitiesFilter } from '@type/election-declaration-management/main-list/municipality/municipality-type';

export const fetchMunicipalities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    districtId,
    rmoEn,
    municipalityIds,
    page,
    size,
  }: MunicipalitiesFilter): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        encodeQuery(URLS.GET_MUNICIPALITIES, {
          ...(page && { page: page }),
          ...(size && { size: size }),
          ...(districtId && { zillaId: districtId }),
          ...(rmoEn && { rmoEn: rmoEn }),
          ...(municipalityIds && { municipalityIds: municipalityIds }),
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

export const fetchMunicipality = (() => {
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
      const response = await noAuthMasterApi.get(URLS.GET_MUNICIPALITY(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const municipalityUpdate = (() => {
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
      const response = await masterApi.put(URLS.UPDATE_MUNICIPALITY(id), {
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

export const createNewMunicipality = (() => {
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
      const response = await masterApi.post(URLS.CREATE_MUNICIPALITY, {
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
