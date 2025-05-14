import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getConstituenciesByElectionScheduleCandidateTypesZillaUpazilasUnionOrWardsApi =
  (() => {
    const cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    let isRequestInProcess = false;

    return async ({
      electionScheduleId,
      candidateTypeId,
      zillaId,
      upazilaId,
      unionOrWardsId,
      isActive,
    }: {
      candidateTypeId: string | number;
      electionScheduleId: string | number;
      zillaId: string | number;
      upazilaId: string | number;
      unionOrWardsId: string | number;
      isActive: boolean;
    }): Promise<{ data: any }> => {
      if (isRequestInProcess) {
        source.cancel();
        source = cancelToken.source();
      }

      isRequestInProcess = true;
      try {
        const response = await configurationServiceApi.get(
          encodeQuery(
            URLS.GET_CONSTITUENCIES_BY_ELECTION_SCHEDULE_CANDIDATE_TYPES_ZILLA_UPAZILLA_UNION_OR_WARDS(
              electionScheduleId,
              candidateTypeId,
              zillaId,
              upazilaId,
              unionOrWardsId,
            ),
            { isActive },
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
