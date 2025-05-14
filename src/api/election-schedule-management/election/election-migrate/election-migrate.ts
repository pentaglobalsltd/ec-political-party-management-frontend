import axios from 'axios';
import { URLS } from '@constants/urls';
import {
  ElectionMigrateCreateResponseTypes,
  ElectionMigrateCreateTypes,
} from '@type/election-declaration-management/election/election-migrate/election-migrate-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const createElectionMigrate = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    electionScheduleId,
  }: {
    data: ElectionMigrateCreateTypes;
    electionScheduleId: string | number;
  }): Promise<{
    data: ElectionMigrateCreateResponseTypes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.post(
        URLS.ELECTION_MIGRATE(electionScheduleId),
        {
          ...data,
        },
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
