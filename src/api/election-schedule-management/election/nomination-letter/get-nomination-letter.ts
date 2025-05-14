import { URLS } from '@constants/urls';
import { specApi } from '@helpers/interceptors';
import { encodeQuery } from '@pentabd/ui';
import {
  NominationLetterListParams,
  NominationLetterListResponse,
} from '@type/election-declaration-management/election/nomination-letter/nomination-letter';
import axios from 'axios';

export const fetchNominationLetterList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionTypeId,
    candidateTypeId,
  }: NominationLetterListParams): Promise<{
    data: NominationLetterListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(URLS.GET_NOMINATION_LETTER_LIST, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(electionTypeId && { electionTypeId: electionTypeId }),
      ...(candidateTypeId && { candidateTypeId: candidateTypeId }),
    });

    isRequestInProcess = true;

    try {
      const response = await specApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
