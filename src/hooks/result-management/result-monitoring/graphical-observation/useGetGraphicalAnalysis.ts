import { fetchGraphicalAnalysis } from '@api/result-management/results-monitoring/graphical-observation/graphical-observation';
import { useState } from 'react';

export interface GraphicalAnalysis {
  title: String;
  match: number;
  candidateVotePercentage?: any;
  candidateVoteNumber?: any;
  voteCastStatus?: any;
}

function mapGraphicalAnalysis(
  data: any,
  chartColors1: string[],
  chartColors2: string[],
) {
  const results = data?.map(
    (item: { voterPercentage: any; candidateVotes: any[] }) => {
      let labels1: string[] = [];
      let percentages: number[] = [];
      let count: number[] = [];

      item?.candidateVotes?.forEach(
        (candidateVote: {
          candidateName: string;
          percentage: number;
          totalVote: number;
        }) => {
          labels1.push(candidateVote.candidateName);
          percentages.push(candidateVote.percentage);
          count.push(candidateVote.totalVote);
        },
      );

      return {
        title: `${item.voterPercentage.constituencyNameBn}-${item.voterPercentage.electionScheduleNameBn}`,
        match: item.voterPercentage.constituencyId,
        candidateVotePercentage: {
          labels: labels1,
          datasets: [
            {
              label: `${item.voterPercentage.constituencyNameBn}-${item.voterPercentage.electionScheduleNameBn}`,
              data: percentages,
              totalVote: count,
              backgroundColor: chartColors1,
              borderColor: chartColors1,
              borderWidth: 1,
            },
          ],
        },
        candidateVoteNumber: {
          labels: labels1,
          datasets: [
            {
              label: `${item.voterPercentage.constituencyNameBn}-${item.voterPercentage.electionScheduleNameBn}`,
              data: count,
              totalVote: count,
              backgroundColor: chartColors1,
              borderColor: chartColors1,
              borderWidth: 1,
            },
          ],
        },
        voteCastStatus: {
          labels: ['বৈধ ভোট', 'বাতিল ভোট', 'অনুপস্থিত ভোট'],
          datasets: [
            {
              label: `${item.voterPercentage.constituencyNameBn}-${item.voterPercentage.electionScheduleNameBn}`,
              data: [
                item.voterPercentage.totalLegalVoteCountPercentage,
                item.voterPercentage.totalIllegalVoteCountPercentage,
                item.voterPercentage.totalAbsentVoteCountPercentage,
              ],
              totalVote: [
                item.voterPercentage.totalLegalVoteCount,
                item.voterPercentage.totalIllegalVoteCount,
                item.voterPercentage.totalAbsentVoteCount,
              ],
              backgroundColor: chartColors2,
              borderColor: chartColors2,
              borderWidth: 1,
            },
          ],
        },
      };
    },
  );

  return results;
}

export const useGetGraphicalAnalysis = (
  chartColors1: string[],
  chartColors2: string[],
) => {
  const [graphicalAnalysis, setGraphicalAnalysis] = useState<
    GraphicalAnalysis[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const getGraphicalAnalysis = async ({
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
    unionOrWardId?: string | number;
  }) => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const response = await fetchGraphicalAnalysis({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
        upazilaId,
        unionOrWardId,
      });
      if (response?.data?.status === 200) {
        const _graphicalAnalysis = mapGraphicalAnalysis(
          response?.data?.data,
          chartColors1,
          chartColors2,
        );
        setIsLoading(false);
        setIsSuccess(true);
        setGraphicalAnalysis(_graphicalAnalysis);
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
    graphicalAnalysis,
    getGraphicalAnalysis,
  };
};
