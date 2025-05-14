import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { UnionOrWardsTypeRes } from '@type/candidate-info-management/operator-view/union-or-wards';

export const fetchUnionsByDoubleConstituenciesNoAuth = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    constituencyId?: string | number,
    upazilaId?: string | number,
    rmo?: string | number,
    municiaplityId?: string | number,
  ): Promise<{ data: UnionOrWardsTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_UNION_WARDS_BY_CONSTITUENCY_UPAZILLA(constituencyId as string),
      {
        upazilaId: upazilaId as number,
        rmoEn: rmo as string,
        municipalityId: municiaplityId as number,
      },
    );

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
