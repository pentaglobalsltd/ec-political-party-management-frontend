import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { ElectionSettingsResponseType } from '@type/election-declaration-management/election/election-settings/election-settings-types';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface PropsApiGetElectionSettings {
  params: {
    [key: string]: string | number;
  };
  page?: number;
  size?: number;
}

export const apiGetElectionSettingsAggregated = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    params,
    page,
    size,
  }: PropsApiGetElectionSettings): Promise<{
    data: ElectionSettingsResponseType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_ELECTION_SETTINGS_AGGREGATED, {
      page: page as number,
      size: size as number,
      electionTypeId: params?.['election-types'] as number,
      electionScheduleId: params?.['election-schedules'] as number,
      candidateTypeId: params?.['candidate-types'] as number,
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
