import axios from 'axios';
import { UpazilasOrThanasRes } from '@type/candidate-info-management/operator-view/upazilas-or-thanas';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const apiGetUpazilasOrThanas = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (params: {
    [key: string]: string | number;
  }): Promise<{
    data: UpazilasOrThanasRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/upazilas-or-thanas`;

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(apiEndPoint);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
