import axios from 'axios';
import { DeleteUnionWard } from '@type/election-declaration-management/main-list/union-ward/union-ward-type';
import { masterApi } from '@helpers/interceptors/master-data';
import { URLS } from '@constants/urls';

export const deleteUnionWard = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    id: string | number,
  ): Promise<{
    data: DeleteUnionWard;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await masterApi.delete(URLS.UPDATE_UNIONS_WARDS(id));
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
