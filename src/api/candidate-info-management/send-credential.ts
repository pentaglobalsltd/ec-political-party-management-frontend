import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
// import onsApi from '@helpers/interceptors/ec-online-nomination-service';
import { SendCredentialResponseType } from '@type/candidate-info-management/send-credential-types';
import onsApi from '@helpers/interceptors/ons';

interface Props {
  candidateElectionDetailsId?: string | number;
  newPassword?: string;
}

export const getSendCredentialApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    candidateElectionDetailsId,
    newPassword,
  }: Props): Promise<{ data: SendCredentialResponseType }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GET_SEND_CREDENTIALS({ candidateElectionDetailsId }),
      { newPassword: newPassword ?? '' },
    );

    try {
      const response = await onsApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
