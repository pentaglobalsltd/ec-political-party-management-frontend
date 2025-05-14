import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

interface Props {
  scheduleId: string | number;
  electionSettingsId: string | number;
  userId: string;
}

export const fetchPollingCentersOpAroOpList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    electionSettingsId,
    userId,
  }: Props): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = URLS.GET_POLLING_CENTERS_OP_ARO_OP({
      scheduleId,
      electionSettingsId,
      userId,
    });

    try {
      const response = await ecRmsService.get(url);
      const data = {
        data: response.data,
        status: response.status,
      };

      return { data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
