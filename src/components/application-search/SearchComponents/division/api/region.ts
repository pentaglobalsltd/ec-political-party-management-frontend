import axios from 'axios';
import { masterApi } from '@helpers/interceptors/master-data';
import { RegionsRes } from '@type/election-declaration-management/election/possible-election/possible-election';

export const getRegions = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (params: {
    [key: string]: string | number;
  }): Promise<{ data: RegionsRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/regions`;

    isRequestInProcess = true;

    try {
      const response = await masterApi.get(apiEndPoint);

      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
