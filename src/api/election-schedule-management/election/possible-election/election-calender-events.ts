import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { encodeQuery } from '@pentabd/ui';
import {
  ElectionCalenderParams,
  ElectionCalenderEventsRes,
} from '@type/election-declaration-management/election/possible-election/possible-election';

export const fetchElectionCalenderEvents = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionTypeId,
    candidateTypeId,
    regionId,
    zillaId,
    upazilaId,
    unionOrWardId,
    year,
    month,
  }: ElectionCalenderParams): Promise<{
    data: ElectionCalenderEventsRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_ELECTION_CALENDER_EVENTS, {
      ...(electionTypeId && { electionTypeId: electionTypeId }),
      ...(candidateTypeId && { candidateTypeId: candidateTypeId }),
      ...(regionId && { regionId: regionId }),
      ...(zillaId && { zillaId: zillaId }),
      ...(upazilaId && { upazilaId: upazilaId }),
      ...(unionOrWardId && { unionOrWardId: unionOrWardId }),
      ...(year && { year: year }),
      ...(month && { month: month }),
    });

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
