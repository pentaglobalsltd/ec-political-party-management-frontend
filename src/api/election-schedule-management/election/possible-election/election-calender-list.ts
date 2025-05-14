import axios from 'axios';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { encodeQuery } from '@pentabd/ui';
import {
  ElectionCalenderParams,
  ElectionCalenderListRes,
} from '@type/election-declaration-management/election/possible-election/possible-election';

export const fetchElectionCalenderList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionTypeId,
    candidateTypeId,
    regionId,
    zillaId,
    upazilaId,
    unionOrWardId,
    fromDate,
    toDate,
  }: ElectionCalenderParams): Promise<{
    data: ElectionCalenderListRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_ELECTION_CALENDER_LIST, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(electionTypeId && { electionTypeId: electionTypeId }),
      ...(candidateTypeId && { candidateTypeId: candidateTypeId }),
      ...(regionId && { regionId: regionId }),
      ...(zillaId && { zillaId: zillaId }),
      ...(upazilaId && { upazilaId: upazilaId }),
      ...(unionOrWardId && { unionOrWardId: unionOrWardId }),
      ...(fromDate && { fromDate: fromDate }),
      ...(toDate && { toDate: toDate }),
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
