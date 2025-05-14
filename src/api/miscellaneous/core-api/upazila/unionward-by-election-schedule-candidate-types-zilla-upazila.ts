import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilasApi =
  (() => {
    const cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    let isRequestInProcess = false;

    return async ({
      electionScheduleId,
      candidateTypeId,
      zillaId,
      upazilaId,
    }: {
      candidateTypeId: string | number;
      electionScheduleId: string | number;
      zillaId: string | number;
      upazilaId: string | number;
    }): Promise<{ data: any }> => {
      if (isRequestInProcess) {
        source.cancel();
        source = cancelToken.source();
      }

      isRequestInProcess = true;
      try {
        const response = await configurationServiceApi.get(
          URLS.GET_UNION_OR_WARDS_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLA_UPAZILLAS(
            electionScheduleId,
            candidateTypeId,
            zillaId,
            upazilaId,
          ),
        );
        return { data: response };
      } catch (error) {
        return Promise.reject(error);
      } finally {
        isRequestInProcess = false;
      }
    };
  })();
