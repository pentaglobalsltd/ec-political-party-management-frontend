import axios from 'axios';
import { URLS } from '@constants/urls';
import { UpazilasOrThanasRes } from '@type/candidate-info-management/operator-view/upazilas-or-thanas';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface ApiGetUpazilasOrThanas {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId: string | number;
  municipalityId: string | number;
}

export const fetchUpazilasOrThanas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
  }: ApiGetUpazilasOrThanas): Promise<{
    data: UpazilasOrThanasRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_UPAZILAS_OR_THANAS({
          electionScheduleId,
          candidateTypeId,
          zillaId,
          municipalityId,
        }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
