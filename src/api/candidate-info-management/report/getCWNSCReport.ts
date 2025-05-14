import axios from 'axios';

import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';

import { NominationListSearchProps } from '@type/candidate-info-management/nomination-list-type';
import { encodeQuery } from '@pentabd/ui';

export interface Props {
  page?: number;
  size?: number;
  bengaliAlphabetOrder?: boolean;
  searchItems: NominationListSearchProps;
}

export const getCWNSCReport = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({ searchItems, page, size }: Props): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_CWNSC_REPORT_LIST(searchItems?.electionScheduleId || ''),
      {
        page: page as number,
        size: size as number,
        // electionTypeId: searchItems?.electionTypeId as number,
        // electionScheduleId: searchItems?.electionScheduleId as number,
        // bengaliAlphabetOrder: searchItems?.bengaliAlphabetOrder as boolean,
      },
    );

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
