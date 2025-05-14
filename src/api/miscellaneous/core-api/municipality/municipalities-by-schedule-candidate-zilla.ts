import axios from 'axios';
import { URLS } from '@constants/urls';
import { MunicipalitiesTypeByScheduleCandidateZillaRes } from '@type/municipalities-by-schedule-candidate-zilla';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface ApiGetMunicipalitiesByScheduleCandidateZilla {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId: string | number;
}

export const fetchMunicipalitiesByScheduleCandidateZilla = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: ApiGetMunicipalitiesByScheduleCandidateZilla): Promise<{
    data: MunicipalitiesTypeByScheduleCandidateZillaRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_MUNICIPALITIES_BY_SCHEDULE_CANDIDATE_ZILLA({
          electionScheduleId,
          candidateTypeId,
          zillaId,
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
