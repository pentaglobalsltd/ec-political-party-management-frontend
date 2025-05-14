import { useState } from 'react';
import { toast } from 'react-toastify';

import { fetchOverallSummary } from '@api/result-management/electoral-process/results-and-situation-review/result/overall-summary';
import { OverallSummary } from '@type/result-management/electoral-process/result-and-situation-analysis/result-and-situation-analysis';

export const useOverallSummary = () => {
  const [overallSummaryLoading, setOverallSummaryLoading] =
    useState<boolean>(false);
  const [overallSummary, setOverallSummary] = useState<OverallSummary>({});

  const getOverallSummary = async ({
    electionScheduleId,
    electionSettingsId,
  }: {
    electionScheduleId: string | number;
    electionSettingsId: string | number;
  }) => {
    setOverallSummaryLoading(true);
    try {
      const response = await fetchOverallSummary({
        electionScheduleId,
        electionSettingsId,
      });
      if (response?.data?.status === 200) {
        setOverallSummary(response?.data?.data);
        setOverallSummaryLoading(false);
      } else {
        setOverallSummaryLoading(false);
        setOverallSummary({});
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setOverallSummary({});
      setOverallSummaryLoading(false);
    }
  };

  return {
    overallSummaryLoading,
    overallSummary,
    getOverallSummary,
  };
};
