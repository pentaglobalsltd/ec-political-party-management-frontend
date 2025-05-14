import { useState } from 'react';

import { fetchPollingCenterResultDashboardMetrics } from '@api/result-management/submit-results/polling-center-result-dashboard-metrics ';
import { SubmitResultSummary } from '@type/result-management/electoral-process/submit-results/submitResults';

export interface GetPollingCenterResultDashboard {
  electionScheduleId: number | string;
}

export const usePollingCenterResultDashboardMetrics = () => {
  const [resultDashboardMetrics, setResultDashboardMetrics] =
    useState<SubmitResultSummary>();

  const getPollingCenterResultDashboardMetrics = async ({
    electionScheduleId,
  }: GetPollingCenterResultDashboard) => {
    try {
      const response = await fetchPollingCenterResultDashboardMetrics({
        electionScheduleId,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data;

        setResultDashboardMetrics(dataArray);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    resultDashboardMetrics,
    getPollingCenterResultDashboardMetrics,
  };
};
