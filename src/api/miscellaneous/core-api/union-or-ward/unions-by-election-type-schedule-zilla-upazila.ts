import axios from 'axios';

import { URLS } from '@constants/urls';
import { UnionOrWardsDataType } from '@type/union-or-wards-by-municipalities-zillas-type';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const getUnionOrWardsByElectionTypeScheduleZillaUpazila = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
  }: {
    electionTypeId: string | number;
    electionScheduleId: string | number;
    zillaId: string | number;
    upazilaId: string | number;
  }): Promise<{ data: UnionOrWardsDataType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        URLS.GET_UNION_OR_WARDS_BY_ELECTION_TYPE_SCHEDULE_ZILLA_UPAZILA(
          electionTypeId,
          electionScheduleId,
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
