import axios from 'axios';
import { masterApi } from '@helpers/interceptors/master-data';
import { encodeQuery } from '@pentabd/ui';

export const apiGetUnionsOrWards = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async (
    params: {
      [key: string]: string | number;
    },

    filter?: {
      [key: string]: string | number;
    },
  ): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const keys = Object.keys(params);
    let apiEndPoint = [...keys].reduce(
      (prev: any, curr: string) => prev + `/${curr}/${params[curr]}`,
      '',
    );
    if (filter?.constituencyId) {
      apiEndPoint = `/constituencies${apiEndPoint}`;
    }
    apiEndPoint = `${apiEndPoint}/unions-or-wards`;

    if (filter) {
      apiEndPoint = encodeQuery(apiEndPoint, {
        upazilaId: filter?.upazilaId as number,
        constituencyIds: filter?.constituencyId as number,
        municipalityId: filter?.municipalityId as number,
        municipalityWardIds: filter?.municipalityWardIds as number,
      });
    }
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
