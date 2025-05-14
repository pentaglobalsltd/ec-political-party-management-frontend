import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export interface PublishToDashboardRequestType {
  electionScheduleId?: string | number;
  electionSettingsId?: string | number;
  data?: object;
}

export const createPublishToDashboard = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    electionSettingsId,
    data,
  }: PublishToDashboardRequestType): Promise<{ data: object }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.PUBLISH_TO_DASHBOARD({
          electionScheduleId,
          electionSettingsId,
        }),
        { ...data },
      );

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
