import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';
import { DraftResultResponse } from '@type/result-management/result-monitoring/draft-result/draft-result-types';

interface DraftResultQueryParams {
  resultStatusEnums: string;
}

export interface DraftResultParams {
  page?: number;
  size?: number;
  electionScheduleId: string | number;
  settingsId: string | number;
  queryParams?: DraftResultQueryParams;
}

export const fetchDraftResultList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    settingsId,
    queryParams,
  }: DraftResultParams): Promise<{
    data: DraftResultResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GET_DRAFT_RESULT({ electionScheduleId, settingsId }),
      {
        ...queryParams,
      },
    );

    try {
      const response = await reportViewerServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
