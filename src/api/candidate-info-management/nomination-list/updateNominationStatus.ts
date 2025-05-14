import axios from 'axios';
import { URLS } from '@constants/urls';
import { candidateManagementServiceApi } from '@helpers/interceptors/cms';
import { NominationStatusUpdateValueType } from '@containers/candidate-info-management/controller-list/candidate-management/constants';

export interface Props {
  nominationStatusId: number;
}

export const updateNominationStatusApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    nominationStatusUpdate: NominationStatusUpdateValueType,
  ): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await candidateManagementServiceApi.put(
        URLS.GET_CANDIDATE_NOMINATION_STATUS_UPDATE(nominationStatusUpdate),
      );
      return {
        data: response,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
