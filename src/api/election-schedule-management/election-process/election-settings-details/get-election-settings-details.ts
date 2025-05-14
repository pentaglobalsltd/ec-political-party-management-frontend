import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { configurationServiceApi } from '@helpers/interceptors/configuration-service';
import { ElectionSettingsDetailsGetListProps } from '@type/election-declaration-management/election-process/election-settings-details';

export const apiGetElectionSettingsDetails = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    searchItems,
  }: {
    page?: number;
    size?: number;
    searchItems?: {
      electionSettingsId?: string | number;
      electionScheduleId?: string | number;
      candidateTypeId?: string | number;
      zillaId?: string | number;
      upazilaId?: string | number;
      municipalityId?: string | number;
      unionOrWardId?: string | number;
      electionAreaReorganized?: string;
      isCaseAvailable?: string;
      isActive?: string;
    };
  }): Promise<{
    data: ElectionSettingsDetailsGetListProps;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(URLS.GET_ELECTION_SETTINGS_DETAILS, {
      page: page as number,
      size: size as number,
      electionSettingsId: searchItems?.electionSettingsId as number,
      electionScheduleId: searchItems?.electionScheduleId as number,
      candidateTypeId: searchItems?.candidateTypeId as number,
      zillaId: searchItems?.zillaId as number,
      upazilaId: searchItems?.upazilaId as number,
      municipalityId: searchItems?.municipalityId as number,
      unionOrWardId: searchItems?.unionOrWardId as number,
      electionAreaReorganized: searchItems?.electionAreaReorganized as string,
      isCaseAvailable: searchItems?.isCaseAvailable as string,
      isActive: searchItems?.isActive as string,
    });

    try {
      const response = await configurationServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
