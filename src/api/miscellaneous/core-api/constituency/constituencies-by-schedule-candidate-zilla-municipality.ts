import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';

export interface MunicipalityConstituenciesParams {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId: string | number;
  municipalityId: string | number;
  getElectionSettings?: boolean;
  isActive?: boolean;
}

export const fetchMunicipalityConstituencies = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    isActive,
  }: MunicipalityConstituenciesParams): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    try {
      const response = await configurationServiceApi.get(
        encodeQuery(
          URLS.GET_MUNICIPALITY_CONSTITUENCIES({
            electionScheduleId,
            candidateTypeId,
            zillaId,
            municipalityId,
          }),
          {
            ...(isActive && { isActive }),
          },
        ),
      );
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
