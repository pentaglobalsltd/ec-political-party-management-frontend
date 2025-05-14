import axios from 'axios';
import { URLS } from '@constants/urls';
import { masterApi } from '@helpers/interceptors/master-data';
import { VoterAreaGetResponseType } from '@type/vote-center-management/voter-area-type';
import { VoterAreaCodeValidateProps } from '@type/search-types';

export const voterAreaCodeFromZillaApi = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    zillaId,
    areaCode,
  }: VoterAreaCodeValidateProps): Promise<{
    data: VoterAreaGetResponseType;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(
        URLS.GET_VOTER_AREA_CODE_FROM_ZILLA({ zillaId, areaCode }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
