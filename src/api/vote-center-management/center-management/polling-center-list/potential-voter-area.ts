import axios from 'axios';
import { URLS } from '@constants/urls';
import { VoterAreasTypeRes } from '@type/vote-center-management/potential-polling-centers-types';
import { encodeQuery } from '@pentabd/ui';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface GetPollingPotentialVoterAreaApiNew {
  electionSettingsId: number | string;
  unionOrWardId: number | string;
}

export const getPotentialVoterAreaApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    unionOrWardId,
  }: GetPollingPotentialVoterAreaApiNew): Promise<{
    data: VoterAreasTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_POTENTIAL_VOTER_AREA({ electionSettingsId }),
      {
        unionOrWardIds: unionOrWardId,
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
