import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { PotentialPollingCentersTypeRes } from '@type/vote-center-management/potential-polling-centers-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface QueryParamsPotentialPollingCentersNew {
  pollingInstituteId?: number | string;
  unionOrWardIds: string;
  unionWardIds?: string;
  nameBn?: string;
}

export interface GetPollingPotentialPollingCentersApiNew {
  electionSettingsId: number | string;
  unionOrWardId: number | string;
  queryParams: QueryParamsPotentialPollingCentersNew;
  getVoterAreOnly?: boolean;
}

export const getPotentialPollingCentersApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    unionOrWardId,
    queryParams,
  }: GetPollingPotentialPollingCentersApiNew): Promise<{
    data: PotentialPollingCentersTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_POTENTIAL_POLLING_CENTER({ electionSettingsId, unionOrWardId }),
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
