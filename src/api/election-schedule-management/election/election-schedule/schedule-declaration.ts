import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { ElectionSearchProps } from '@type/search-types';
import { GetElectionDetailsListProps } from '@type/election-declaration-management/election/schedule-declaration-types';

export const getElectionScheduleList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    searchItems?: ElectionSearchProps,
    page?: number,
    size?: number,
  ): Promise<{ data: GetElectionDetailsListProps }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_ELECTION_SCHEDULE, {
      page: page as number,
      size: size as number,
      electionTypeId: searchItems?.electionTypeId as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
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

export const createElectionSchedule = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
  }: any): Promise<{
    data: GetElectionDetailsListProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.post(
        URLS.CREATE_ELECTION_SCHEDULE,
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

export const updateElectionSchedule = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    data,
    id,
  }: any): Promise<{
    data: GetElectionDetailsListProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.put(
        URLS.UPDATE_ELECTION_SCHEDULE(id),
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
