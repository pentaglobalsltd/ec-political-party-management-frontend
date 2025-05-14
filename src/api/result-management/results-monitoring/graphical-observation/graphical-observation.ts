import axios from 'axios';
import { encodeQuery } from '@pentabd/ui';

import { URLS } from '@constants/urls';
import { reportViewerServiceApi } from '@helpers/interceptors/report-viewer';
import { MessageSendListResponse } from '@type/result-management/electoral-process/message-send-list/message-send-list-type';
import { ecRmsService } from '@helpers/interceptors/ec-rms-service';

interface GraphicalAnalysisProps {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId?: string | number;
  municipalityId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: string | number;
}

interface GraphicalPollingCenterSummaryProps {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId?: string | number;
  municipalityId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: string | number;
}

export interface MessageSendListFinalParams {
  electionScheduleId: string | number;
  candidateTypeId: string | number;
  zillaId?: string | number;
  municipalityId?: string | number;
  upazilaId?: string | number;
  unionOrWardId?: string | number;
  page?: string | number;
  size?: number;
}

export const fetchGraphicalAnalysis = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    zillaId,
    municipalityId,
    upazilaId,
    candidateTypeId,
    unionOrWardId,
  }: GraphicalAnalysisProps): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GRAPHICAL_ANALYSIS(electionScheduleId, candidateTypeId),
      {
        ...(zillaId && { zillaId: zillaId as number }),
        ...(municipalityId && { municipalityId: municipalityId as number }),
        ...(upazilaId && { upazilaId: upazilaId as number }),
        ...(unionOrWardId && { unionOrWardId: unionOrWardId as number }),
      },
    );

    isRequestInProcess = true;

    try {
      const response = await reportViewerServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const fetchGraphicalPollingCenterSummary = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    electionScheduleId,
    zillaId,
    municipalityId,
    upazilaId,
    candidateTypeId,
    unionOrWardId,
  }: GraphicalPollingCenterSummaryProps): Promise<{ data: any }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    isRequestInProcess = true;

    const url = encodeQuery(
      URLS.GRAPHICAL_POLLING_CENTER_SUMMARY(
        electionScheduleId,
        candidateTypeId,
      ),
      {
        ...(zillaId && { zillaId: zillaId as number }),
        ...(municipalityId && { municipalityId: municipalityId as number }),
        ...(upazilaId && { upazilaId: upazilaId as number }),
        ...(unionOrWardId && { unionOrWardId: unionOrWardId as number }),
      },
    );

    try {
      const response = await reportViewerServiceApi.get(url);
      return { data: response };
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isRequestInProcess = false;
    }
  };
})();

export const fetchMessageSendListFinal = (() => {
  const cancelToken = axios.CancelToken;
  let source = cancelToken.source();
  let isRequestInProcess = false;

  return async ({
    page,
    size,
    candidateTypeId,
    electionScheduleId,
    zillaId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  }: MessageSendListFinalParams): Promise<{
    data: MessageSendListResponse;
  }> => {
    if (isRequestInProcess) {
      source.cancel();
      source = cancelToken.source();
    }

    const url = encodeQuery(
      URLS.GET_MESSAGE_SEND_LIST_FINAL(electionScheduleId, candidateTypeId),
      {
        // ...(page && { page: page }),
        ...(page && { page: page }),
        ...(size && { size: size }),
        ...(zillaId && { zillaId: zillaId as number }),
        ...(municipalityId && { municipalityId: municipalityId as number }),
        ...(upazilaId && { upazilaId: upazilaId as number }),
        ...(unionOrWardId && { unionOrWardId: unionOrWardId as number }),
      },
    );

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
