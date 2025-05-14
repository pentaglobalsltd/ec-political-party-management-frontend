import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { ConstituenciesWithSettingsListByScheduleZillaRes } from '@type/constituencies-with-settings-list-by-schedule-zilla';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

interface Props {
  params: {
    [key: string]: string | number;
  };
  isActive?: boolean;
}

export const apiGetConstituenciesWithSettingsByScheduleZilla = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    params,
    isActive,
  }: Props): Promise<{
    data: ConstituenciesWithSettingsListByScheduleZillaRes;
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

    apiEndPoint = encodeQuery(
      `${apiEndPoint}/constituencies/and/settings-list`,
      {
        ...(isActive !== undefined && { isActive: isActive }),
      },
    );

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
