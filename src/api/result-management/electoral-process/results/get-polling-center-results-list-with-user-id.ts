import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import { PollingCenterListFilterWithUserId } from '@type/result-management/electoral-process/results/results';
import { ELECTION_INFO } from '@constants/election-info';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterResultListWithUserIds = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    scheduleId,
    electionSettingsId,
    userId,
    status,
    page,
    size,
    constituencyId,
    candidateTypeId,
    zillaId,
    upazilaId,
    electionTypeId,
  }: PollingCenterListFilterWithUserId): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const path =
      Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID
        ? URLS.POLLING_CENTER_RESULT_LIST_WITH_USER_ID_RO(
            scheduleId,
            userId,
            electionSettingsId as string,
          )
        : URLS.POLLING_CENTER_RESULT_LIST_WITH_USER_ID_ARO(
            scheduleId,
            userId,
            electionSettingsId as string,
          );

    const url = encodeQuery(path, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(status && { status: status }),
      ...(constituencyId && { constituencyId: constituencyId }),
      ...(candidateTypeId && { candidateTypeId: candidateTypeId }),
      ...(zillaId && { zillaId: zillaId }),
      ...(upazilaId && { upazilaId: upazilaId }),
    });

    isRequestInProcess = true;

    try {
      const response = await ecRmsService.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
