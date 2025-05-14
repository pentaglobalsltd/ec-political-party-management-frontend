import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { PotentialPollingCentersTypeRes } from '@type/vote-center-management/potential-polling-centers-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface QueryParamsGetPollingCenterByIdApiNew {
  unionOrWardIds: string;
  unionWardIds?: string;
  unionWardId?: string;
  nameBn?: string;
}

export interface GetPollingCenterByIdApiNew {
  electionSettingsId: number | string;
  unionOrWardId: number | string;
  pollingCenterId: string | number;
  queryParams: QueryParamsGetPollingCenterByIdApiNew;
  getVoterAreOnly?: boolean;
}

export const getPollingCenterByIdApiNew = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
    queryParams,
  }: GetPollingCenterByIdApiNew): Promise<{
    data: PotentialPollingCentersTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_POLLING_CENTER_BY_ID({
        electionSettingsId,
        unionOrWardId,
        pollingCenterId,
      }),
      {
        ...queryParams,
      },
    );

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
