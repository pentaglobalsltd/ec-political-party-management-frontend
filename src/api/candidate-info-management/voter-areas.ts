import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { VoterAreasTypeRes } from '@type/candidate-info-management/operator-view/voter-areas';

export const getVoterAreas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    zillaId?: string | number,
    upazillaId?: string | number,
    unionOrWardId?: string | number,
  ): Promise<{ data: VoterAreasTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }
    const url = encodeQuery(URLS.GET_VOTER_AREA_ONS, {
      zillaId: zillaId as number,
      upazillaId: upazillaId as number,
      unionOrWardId: unionOrWardId as number,
    });

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
