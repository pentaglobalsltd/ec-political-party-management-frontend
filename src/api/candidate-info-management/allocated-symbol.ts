import { encodeQuery } from '@pentabd/ui';
import axios from 'axios';
import { URLS } from '@constants/urls';
import { noAuthMasterApi } from '@helpers/interceptors/master-data-no-auth';
import { AllocatedSymbolListTypeRes } from '@type/candidate-info-management/allocated-symbol-list-type';

export const getAllocatedSymbolList = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    candidateTypeId: number | string,
    isPolitical?: boolean,
  ): Promise<{ data: AllocatedSymbolListTypeRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await noAuthMasterApi.get(
        encodeQuery(URLS.ALLOCATED_SYMBOL_LIST(candidateTypeId), {
          page: '0',
          size: 100,
          ...(isPolitical !== undefined && { isPolitical: isPolitical }),
        }),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
