import axios from 'axios';
import { ConstituencyTypeByScheduleCandidateZillaMunicipalityRes } from '@type/constituencies-by-schedule-candidate-zilla-municipality';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface ApiGetConstituenciesByScheduleCandidateZillaMunicipalities {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId: string | number;
  municipalityId: string | number;
}

export const apiGetConstituenciesByScheduleCandidateZillaMunicipalities =
  (() => {
    const cancelToken = axios.CancelToken;
    let source = cancelToken.source();
    let isRequestInProcess = false;

    return async (params: {
      [key: string]: string | number;
    }): Promise<{
      data: ConstituencyTypeByScheduleCandidateZillaMunicipalityRes;
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

      apiEndPoint = `${apiEndPoint}/constituencies`;

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
