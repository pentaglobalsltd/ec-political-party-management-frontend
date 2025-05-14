import axios from 'axios';
import { URLS } from '@constants/urls';
import { PotentialPollingInstituteTypeRes } from '@type/vote-center-management/potential-polling-centers-types';
import { ecPollingCenterService } from '@helpers/interceptors/ec-polling-center-service';

export interface GetPollingPotentialPollingInstitutionApi {
  electionSettingsId: number | string;
  pollingInstituteId: number | string;
}

export const getPotentialPollingInstitutionApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionSettingsId,
    pollingInstituteId,
  }: GetPollingPotentialPollingInstitutionApi): Promise<{
    data: PotentialPollingInstituteTypeRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = URLS.GET_POTENTIAL_POLLING_INSTITUTE({
      electionSettingsId,
      pollingInstituteId,
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
