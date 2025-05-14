import axios from 'axios';
import { URLS } from '@constants/urls';
import { encodeQuery } from '@pentabd/ui';
import { Response } from '@type/index';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

export interface ResultObservationProps {
  electionTypeId?: number | string;
  electionScheduleId?: number | string;
  zillaId?: number | string;
  constituencyId?: number | string;
  municipalityId?: number | string;
  upazilaId?: number | string;
  unionOrWardId?: number | string;
}

interface Item {
  candidateTypeId: number;
  candidateTypeNameBn: string;
  count: number;
}

interface ResultObservation {
  totalPollingCenterCount: number;
  totalCancelledPollingCenterCount: number;
  totalSubmittedPollingCenterResultCount: Item[];
  totalApprovedPollingCenterResultCount: Item[];
  totalCreatedBartaSheetCount: Item[];
  totalApprovedBartaSheetCount: Item[];
  totalFinalizedBartaSheetCount: Item[];
}

export const fetchResultObservation = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    zillaId,
    constituencyId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  }: ResultObservationProps): Promise<{
    data: Response<ResultObservation>;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GET_RESULT_OBSERVATION({ electionScheduleId, zillaId }),
      {
        ...(constituencyId && { constituencyId: constituencyId }),
        ...(municipalityId && { municipalityId: municipalityId }),
        ...(upazilaId && { upazilaId: upazilaId }),
        ...(unionOrWardId && { unionOrWardId: unionOrWardId }),
      },
    );

    try {
      const response = await ecRmsService.get(url);

      const data = {
        data: response.data,
        status: response.status,
      };
      return { data };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();
