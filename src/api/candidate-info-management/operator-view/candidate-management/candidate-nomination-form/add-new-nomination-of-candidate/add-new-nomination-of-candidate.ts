import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { TypeRegisterNewNomination } from '@hooks/candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/useAddCandidateNominationForm';
import { onsNoAuthApi } from '@helpers/interceptors/ons-no-auth';

export const postNewNomination = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (reqBody: TypeRegisterNewNomination): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await onsNoAuthApi.post(
        encodeQuery(URLS.ADD_NEW_CANDIDATE_NOMINATION, {
          isSelfNomination: 'false',
        }),
        reqBody,
      );

      return {
        data: response.data,
      };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
