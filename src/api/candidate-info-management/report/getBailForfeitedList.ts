import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';
import {
  BailForfeitedSearchPropsType,
  BailForfeitedListResponseType,
} from '@type/candidate-info-management/report/get-bail-forfeited-list-types';

export const getBailForfeitedList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
  }: BailForfeitedSearchPropsType): Promise<{
    data: BailForfeitedListResponseType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_BAIL_FORFEITED_LIST(electionScheduleId), {
      ...(page && { page }),
      ...(size && { size }),
      ...(candidateTypeId && { candidateTypeId }),
      ...(zillaId && { zillaId }),
      ...(constituencyId && { constituencyId }),
    });

    isRequestInProcess = true;

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
