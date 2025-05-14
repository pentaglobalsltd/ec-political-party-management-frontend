import { useState, useEffect } from 'react';
import { useResults } from '@hooks/result-management/electoral-process/result-and-situation-review/result/useResults';
import { useOverallSummary } from '@hooks/result-management/electoral-process/result-and-situation-review/result/useOverallSummary';

export interface ResultType {
  results: any;
  overallSummary: any;
  overallSummaryLoading: boolean;
  resultsLoading: boolean;
}

const useResult = () => {
  const [resultDetails, setResultDetails] = useState<ResultType>();

  const { results, getResults, resultsLoading } = useResults();
  const { overallSummary, getOverallSummary, overallSummaryLoading } =
    useOverallSummary();

  const getResult = async ({
    electionScheduleId,
    electionSettingsId,
  }: {
    electionScheduleId: string | number;
    electionSettingsId: string | number;
  }) => {
    try {
      await getOverallSummary({
        electionScheduleId,
        electionSettingsId,
      });

      await getResults({
        electionScheduleId,
        electionSettingsId,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (results && overallSummary) {
      setResultDetails({
        resultsLoading,
        results,
        overallSummaryLoading,
        overallSummary,
      });
    }
    // eslint-disable-next-line
  }, [resultsLoading, results, overallSummaryLoading, overallSummary]);

  return {
    resultDetails,
    getResult,
  };
};

export default useResult;
