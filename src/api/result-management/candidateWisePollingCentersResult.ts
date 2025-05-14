import axios from 'axios';
import { URLS } from '@constants/urls';
import { CandidateTypeWisePollingCenterDetailsListRes } from '@type/result-management/electoral-process/submit-results/submitResults';
import { encodeQuery } from '@pentabd/ui';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export const fetchCandidateWisePolingCenterResult = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    candidateTypeId,
    electionSettingsId,
    page,
    size,
    status,
    pollingCenterName,
    isActive,
  }: {
    electionScheduleId?: string | number;
    candidateTypeId?: string | number;
    electionSettingsId?: string | number;
    pollingCenterName?: string;
    status?: string[];
    page?: string | number;
    size?: number;
    isActive?: string;
  }): Promise<{ data: CandidateTypeWisePollingCenterDetailsListRes }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GET_CANDIDATE_WISE_POLLING_CENTER_RESULTS({
        electionScheduleId,
        candidateTypeId,
      }),
      {
        ...(page && { page: page }),
        ...(size && { size: size }),
        ...(status && { status: status.toString() }),
        ...(electionSettingsId && { electionSettingsId: electionSettingsId }),
        ...(pollingCenterName && { pollingCenterName: pollingCenterName }),
        ...(isActive && { isActive: isActive }),
      },
    );

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
