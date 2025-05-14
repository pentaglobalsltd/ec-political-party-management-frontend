import axios from 'axios';
import { URLS } from '@constants/urls';
import { ecUserManagementApi } from '@helpers/interceptors/user-management';
import { UserTypesProps } from '@type/user-types';

interface Props {
  electionScheduleId: string | number;
}

export const getElectionScheduleUserTypesApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
  }: Props): Promise<{ data: UserTypesProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await ecUserManagementApi.get(
        URLS.GET_ELECTION_SCHEDULE_USER_TYPES(electionScheduleId),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
