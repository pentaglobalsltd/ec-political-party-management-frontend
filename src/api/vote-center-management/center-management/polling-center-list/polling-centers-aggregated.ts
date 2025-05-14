import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { PollingCentersAggregatedTypeRes } from '@type/vote-center-management/polling-centers-aggregated-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface QueryParamsPollingCenterAggregated {
  electionTypeId?: number | string;
  electionScheduleId?: number | string;
  electionSettingsIds?: number | string;
  constituencyId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  unionOrWardIds?: number | string;
  unionOrWardId?: number | string; //it doesn't exist. has been handled in hooks
  reservedWardIds?: number | string;
  voterType?: string; // কেন্দ্রের ধরন -> confirm from backend team -
  pollingInstituteNameBn?: string;
  candidateTypeId?: number | string;
  isActive?: boolean;
  municipalityId?: string | number;
  rmoEn?: string;
}

export interface GetPollingCenterAggregated {
  page?: number;
  size?: number;
  queryParams?: QueryParamsPollingCenterAggregated;
}

export const getPollingCenterAggregatedApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page = 0,
    size = 10,
    queryParams,
  }: GetPollingCenterAggregated): Promise<{
    data: PollingCentersAggregatedTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.POLLING_CENTERS_AGGREGATED, {
      page: page as number,
      size: size as number,
      electionTypeId: queryParams?.electionTypeId as number,
      electionScheduleId: queryParams?.electionScheduleId as number,
      electionSettingsIds: queryParams?.electionSettingsIds as number,
      candidateTypeId: queryParams?.candidateTypeId as number,
      zillaId: queryParams?.zillaId as number,
      upazilaId: queryParams?.upazilaId as number,
      constituencyId: queryParams?.constituencyId as number,
      municipalityId: queryParams?.municipalityId as number,
      unionOrWardIds: queryParams?.unionOrWardIds as number,
      reservedWardIds: queryParams?.reservedWardIds as number,
      pollingInstituteNameBn: queryParams?.pollingInstituteNameBn as string,
      voterType: queryParams?.voterType as string,
      isActive: queryParams?.isActive as boolean,
      rmoEn: queryParams?.rmoEn as string,
    });

    isRequestInProcess = true;

    try {
      const response = await ecPollingCenterService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
