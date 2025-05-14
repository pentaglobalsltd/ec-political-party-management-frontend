import { useState } from 'react';
import { getCandidateNominationStatistics } from '@api/candidate-info-management/candidate-nomination-statistics';
import { CandidateNominationStatistics } from '@type/candidate-info-management/candidate-nomination-statistics-types';
import { mappingCandidateElectionStats } from './mappingCandidateNominationStatistics';

interface Props {
  electionTypeId: number | string;
  scheduleId: number | string;
}

export const useCandidateNominationStatistics = () => {
  const [
    candidateNominationStatisticsDetails,
    setCandidateNominationStatistics,
  ] = useState<CandidateNominationStatistics[]>();
  const [loading, setLoading] = useState(false);

  const getCandidateNominationStatisticsData = async ({
    electionTypeId,
    scheduleId,
  }: Props) => {
    try {
      setLoading(true);
      const response = await getCandidateNominationStatistics({
        electionTypeId,
        scheduleId,
      });
      if (response?.data?.status === 200) {
        const mappedData = mappingCandidateElectionStats({
          data: response?.data?.data?.candidateElectionStats,
        });

        // console.log('HOOK mappedData:', mappedData);

        setCandidateNominationStatistics(mappedData);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getCandidateNominationStatisticsData,
    candidateNominationStatisticsDetails,
    loading,
  };
};
