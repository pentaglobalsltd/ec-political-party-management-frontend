import { useState } from 'react';

import { fetchPollingCenterResultSummaryForOp } from '@api/result-management/submit-results/polling-center-result-summary-for-op';
import { fetchPollingCenterResultSummaryForOpAdmin } from '@api/result-management/submit-results/polling-center-result-summary-for-op-admin';

export interface GetPollingCenterResultSummaryForOp {
  scheduleId: number | string;
  userId?: string;
}

const mappedData = (dataArray: any) => {
  const mappedResponseData = {
    totalPollingCenterCount: dataArray?.totalPollingCenterCount,

    pollingCenterCount: dataArray?.candidateTypeWiseSubmittedPollingCenterCount,

    resubmittedPollingCenters: dataArray?.resubmittedPollingCenters,
  };

  return mappedResponseData;
};

export const usePollingCenterResultSummaryForOp = ({
  setContextData,
  isAdmin = false,
}: {
  setContextData?: (x: any) => void;
  isAdmin?: boolean;
}) => {
  const [resultSummaryOp, setResultSummaryOp] = useState<any>([]);

  const getPollingCenterResultSummaryForOp = async ({
    scheduleId,
    userId,
  }: GetPollingCenterResultSummaryForOp) => {
    try {
      if (isAdmin && userId) {
        callApiForAdmin({ scheduleId, userId });
      } else if (!isAdmin) {
        callApiForElectionUser(scheduleId);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const callApiForAdmin = async ({
    scheduleId,
    userId,
  }: {
    scheduleId: number | string;
    userId: string;
  }) => {
    const response = await fetchPollingCenterResultSummaryForOpAdmin({
      scheduleId,
      userId,
    });
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data;

      const newData: any = mappedData(dataArray);
      setResultSummaryOp(newData);
      setDataInContext(newData);
    }
  };

  const callApiForElectionUser = async (scheduleId: number | string) => {
    const response = await fetchPollingCenterResultSummaryForOp({
      scheduleId,
    });
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data;
      const newData: any = mappedData(dataArray);
      setResultSummaryOp(newData);
      setDataInContext(newData);
    }
  };

  const setDataInContext = (newData: any) => {
    if (setContextData) {
      setContextData((prev: any) => {
        return {
          ...prev,
          contextResultSummaryOp: newData,
        };
      });
    }
  };

  return {
    resultSummaryOp,
    getPollingCenterResultSummaryForOp,
  };
};
