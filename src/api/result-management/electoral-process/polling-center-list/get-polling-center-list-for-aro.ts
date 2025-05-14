import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';
import { URLS } from '@constants/urls';
import {
  PollingCenterListParamsForARO,
  PollingCenterListResponseForARO,
} from '@type/result-management/electoral-process/polling-center-list/polling-center-list-type';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchPollingCenterListForARO = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    electionSettingsIds,
    electionTypeId,
    electionScheduleId,
    unionOrWardId,
    unionWardId,
    zillaId,
    isActive,
  }: PollingCenterListParamsForARO): Promise<{
    data: PollingCenterListResponseForARO;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    let setIsActive;
    if (isActive === true || isActive === false) {
      setIsActive = true;
    }

    const url = encodeQuery(URLS.GET_POLLING_CENTER_LIST_FOR_ARO, {
      ...(page && { page: page }),
      ...(size && { size: size }),
      ...(electionSettingsIds && { electionSettingsIds }),
      ...(electionTypeId && { electionTypeId }),
      ...(electionScheduleId && { electionScheduleId }),
      ...(unionOrWardId && { unionOrWardIds: unionOrWardId }),
      ...(unionWardId && { unionWardIds: unionWardId }),
      ...(zillaId && { zillaId }),
      ...(setIsActive && { isActive }),
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
