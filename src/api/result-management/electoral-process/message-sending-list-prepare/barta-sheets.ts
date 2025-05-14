import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const createBartaSheet = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ data }: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.CREATE_BARTA_SHEET({
          electionScheduleId: data?.electionScheduleId,
          electionSettingsId: data?.electionSettingsId,
          userId: data?.userId,
        }),
        { file: data?.file },
      );

      return {
        data: {
          data: response.data,
          status: response.status,
        },
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const createBartaSheetForUnion = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ data }: any): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.post(
        URLS.CREATE_BARTA_SHEET_FOR_UNION({
          electionScheduleId: data?.electionScheduleId,
          electionSettingsId: data?.electionSettingsId,
          userId: data?.userId,
        }),
        { file: data?.file },
      );

      return {
        data: {
          data: response.data,
          status: response.status,
        },
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
