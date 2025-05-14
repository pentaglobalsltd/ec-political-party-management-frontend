import axios from 'axios';
import { MunicipalitiesTypeByScheduleCandidateZillaRes } from '@type/municipalities-by-schedule-candidate-zilla';
import { encodeQuery } from '@pentabd/ui';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export const apiGetCoreMunicipalities = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    params,
    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }): Promise<{
    data: MunicipalitiesTypeByScheduleCandidateZillaRes;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );

    apiEndPoint = `${apiEndPoint}/municipalities`;
    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        ...filter,
      });
    }

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
