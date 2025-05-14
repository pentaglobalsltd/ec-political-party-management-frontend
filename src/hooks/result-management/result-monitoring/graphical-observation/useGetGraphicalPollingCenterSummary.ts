import { fetchGraphicalPollingCenterSummary } from '@api/result-management/results-monitoring/graphical-observation/graphical-observation';
import { useState } from 'react';
import { GraphicalAnalysis } from './useGetGraphicalAnalysis';

interface GraphicalPollingCenterSummary extends GraphicalAnalysis {
  centerResultStatus?: any;
}

function mapGraphicalPollingCenterSummary(data: any, chartColors3: string[]) {
  const results = data?.pollingCenterSummaryDomainModelList?.map(
    (item: any) => {
      return {
        title: `${item.constituencyNameBn}`,
        match: item.constituencyId,
        centerResultStatus: {
          labels: ['নিষ্পন্ন', 'অনিষ্পন্ন', 'পাঠানো হয় নি'],
          datasets: [
            {
              label: `${item.constituencyNameBn}`,
              data: [
                item.approvedByAroCount,
                item.forwardedByOpCount,
                item.createdByOpCount,
              ],
              backgroundColor: chartColors3,
              borderColor: chartColors3,
              borderWidth: 1,
            },
          ],
        },
      };
    },
  );

  return results;
}

export const useGetGraphicalPollingCenterSummary = (chartColors3: string[]) => {
  const [graphicalPollingCenterSummary, setGraphicalPollingCenterSummary] =
    useState<GraphicalPollingCenterSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getGraphicalPollingCenterSummary = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    upazilaId,
    unionOrWardId,
  }: {
    electionScheduleId: number | string;
    candidateTypeId: number | string;
    zillaId?: number | string;
    municipalityId?: number | string;
    upazilaId?: number | string;
    unionOrWardId?: number | string;
  }) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await fetchGraphicalPollingCenterSummary({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });
      if (response?.data?.status === 200) {
        const _graphicalPollingCenterSummary = mapGraphicalPollingCenterSummary(
          response?.data?.data,
          chartColors3,
        );
        setIsLoading(false);
        setIsSuccess(true);
        setGraphicalPollingCenterSummary(_graphicalPollingCenterSummary);
      }
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);
      console.log(error);
    }
  };

  return {
    isSuccess,
    isLoading,
    graphicalPollingCenterSummary,
    getGraphicalPollingCenterSummary,
  };
};
