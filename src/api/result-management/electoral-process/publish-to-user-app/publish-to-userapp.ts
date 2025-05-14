import axios from 'axios';
import { URLS } from '@constants/urls';
import { PublishToUserAppRequestType } from '@type/result-management/electoral-process/publish-to-user-app/publish-to-user-app-types';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const createPublishToUserApp = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    electionSettingsId,
    data,
  }: PublishToUserAppRequestType): Promise<{ data: object }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.PUBLISH_TO_USER_APP({
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
