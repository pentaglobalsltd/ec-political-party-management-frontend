import axios from 'axios';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { encodeQuery } from '@pentabd/ui';
import { PollingInstitutesTypeRes } from '@type/vote-center-management/polling-institutes-types';

export interface QueryParamsPollingInstitutes {
  electionTypeId?: string | number;
  electionScheduleId?: string | number;
  settingsId?: string | number;
  regionId?: string | number;
  zillaId?: number | string;
  upazilaId?: number | string;
  unionOrWardId?: number | string;
  municipalityId?: string | number;
  reservedWardId?: number | string;
  candidateTypeId?: number | string;
  nameBn?: string;
}

export interface GetPollingPollingInstitutes {
  page?: number;
  size?: number;
  queryParams?: QueryParamsPollingInstitutes;
}

export const getPollingInstitutesApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page = 0,
    size = 10,
    queryParams,
  }: GetPollingPollingInstitutes): Promise<{
    data: PollingInstitutesTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.POLLING_INSTITUTES, {
      page: page as number,
      size: size as number,
      nameBn: queryParams?.nameBn as string,
      regionId: queryParams?.regionId as string,
      upazilaId: queryParams?.upazilaId as number,
      unionOrWardId: queryParams?.unionOrWardId as number,
      municipalityId: queryParams?.municipalityId as number,
      reservedWardId: queryParams?.reservedWardId as number,
      zillaId: queryParams?.zillaId as number,
    });

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
