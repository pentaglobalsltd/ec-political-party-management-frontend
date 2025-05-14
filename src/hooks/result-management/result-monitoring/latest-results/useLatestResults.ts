import { useState } from 'react';
import { toast } from 'react-toastify';

import { fetchLatestResultsList } from '@api/result-management/results-monitoring/latest-results/latest-results';
import { getDigitBanglaFromEnglish } from '@utils';
import {
  BartaSheetCandidateVoteCountsType,
  LatestResultsPathParams,
  LatestResultsType,
} from '@type/result-management/result-monitoring/latest-results-obtained/latest-results-obtained-types';

interface HookReturnType {
  isLoading: boolean;
  isSuccess: boolean;
  latestResults: LatestResultsType[];
  getLatestResultsData: (obj: LatestResultsPathParams) => void;
}

const mappedResponse = (data: LatestResultsType) => {
  const lastRow = {
    idx: '',
    candidateName: '',
    symbolName: 'মোট =',
    totalLegalVoteCount: data?.totalLegalVoteCount,
  };

  const updatedCandidateVoteCounts = data?.bartaSheetCandidateVoteCounts?.map(
    (candidateVoteCount: BartaSheetCandidateVoteCountsType, index: number) => ({
      ...candidateVoteCount,
      idx: getDigitBanglaFromEnglish(index + 1),
    }),
  );
  updatedCandidateVoteCounts?.push(lastRow);

  return { ...data, bartaSheetCandidateVoteCounts: updatedCandidateVoteCounts };
};

const useLatestResults = (): HookReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [latestResults, setLatestResults] = useState<LatestResultsType[]>([]);

  const getLatestResultsData = async ({
    electionScheduleId,
    electionSettingsId,
    candidateTypeId,
  }: LatestResultsPathParams) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);

      const response = await fetchLatestResultsList({
        electionScheduleId,
        electionSettingsId,
        candidateTypeId,
      });

      if (response?.data?.status === 200) {
        const mappedData = response?.data?.data?.map((item) =>
          mappedResponse(item),
        );

        setLatestResults(mappedData as LatestResultsType[]);
        setIsLoading(false);
        setIsSuccess(true);
      } else {
        setIsLoading(false);
        setIsSuccess(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setIsSuccess(false);
      setLatestResults([]);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    isLoading,
    isSuccess,
    latestResults,
    getLatestResultsData,
  };
};

export default useLatestResults;
