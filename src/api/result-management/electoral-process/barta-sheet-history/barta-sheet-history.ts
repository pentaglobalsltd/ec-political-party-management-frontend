import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

interface Props {
  scheduleId: string | number;
  bartaSheetId: string | number;
  page?: string | number;
  size?: number;
}
export const fetchBartaSheetHistory = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    bartaSheetId,
    page,
    size,
  }: Props): Promise<{
    data: any;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.BARTA_SHEET_HISTORY(scheduleId, bartaSheetId),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
      },
    );

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
