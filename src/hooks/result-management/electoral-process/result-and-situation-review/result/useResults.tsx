import { useState } from 'react';
import { toast } from 'react-toastify';
import { Text } from '@pentabd/ui';

import {
  FetchResultsParams,
  fetchResults,
} from '@api/result-management/electoral-process/results-and-situation-review/result/results';
import { LAST_ROW } from '@containers/result-management/electoral-process/results-and-situation-review/constants';
import { VOTER_TYPE } from '@constants/polling-center-results';
import { getDigitBanglaFromEnglish } from '@utils';

const mapPollingCenterList = (data: any) => {
  // creating and pushing the mappedCenterName into candidateResults
  data?.candidateResults?.forEach((candidateResult: any) => {
    const voterType =
      candidateResult?.pollingCenterVoterType === VOTER_TYPE.MALE_EN
        ? VOTER_TYPE.MALE_BN
        : candidateResult?.pollingCenterVoterType === VOTER_TYPE.FEMALE_EN
        ? VOTER_TYPE.FEMALE_BN
        : candidateResult?.pollingCenterVoterType === VOTER_TYPE.BOTH_EN
        ? VOTER_TYPE.BOTH_BN
        : '';

    candidateResult.mappedCenterName = `${
      candidateResult?.pollingCenterName
    }, ${candidateResult?.pollingCenterDescriptionBn} (${voterType}) (${
      candidateResult?.pollingCenterSerial
        ? getDigitBanglaFromEnglish(candidateResult?.pollingCenterSerial)
        : getDigitBanglaFromEnglish(0)
    })`;
  });

  // creating and pushing the dynamicCandidateVotes
  data?.candidateResults.forEach((result: any) => {
    result?.candidateInfos.forEach((candidate: any) => {
      result[candidate.candidateElectionDetailsId] = candidate?.receivedVote
        ? getDigitBanglaFromEnglish(candidate?.receivedVote)
        : getDigitBanglaFromEnglish(0);
    });
  });

  // creating and pushing the last row into candidateResults
  let dynamicRows = {};
  data?.candidatesReceivedVoteSum?.forEach((candidateInfo: any) => {
    dynamicRows = {
      ...dynamicRows,
      [candidateInfo.candidateElectionDetailsId]:
        candidateInfo?.totalReceivedVoteSum
          ? getDigitBanglaFromEnglish(candidateInfo?.totalReceivedVoteSum)
          : getDigitBanglaFromEnglish(0),
    };
    return {
      [candidateInfo.candidateElectionDetailsId]:
        candidateInfo?.totalReceivedVoteSum,
    };
  });
  const grandTotalLastRow = {
    id: data?.candidateResults?.length,
    mappedCenterName: LAST_ROW,
    ...dynamicRows,
    totalVoter: data?.totalVoterSum,
    totalLegalVote: data?.totalLegalVoteSum,
    totalIllegalVote: data?.totalIllegalVoteSum,
    totalGivenVote: data?.totalGivenVoteSum,
    attendancePercentage: data?.totalAttendancePercentage.toFixed(2),
  };
  data?.candidateResults?.push(grandTotalLastRow);

  return {
    ...data,
    dynamicColumns: data?.candidateResults?.[0]?.candidateInfos?.map(
      (item: any, index: number) => {
        return {
          id: index + 7,
          name: `${item?.name} (${item?.symbolName})`,
          key: item?.candidateElectionDetailsId,
          render: (data: any, row: any) => {
            if (row?.mappedCenterName === LAST_ROW) {
              return (
                <Text size="sm" weight="semibold">
                  {data
                    ? getDigitBanglaFromEnglish(data)
                    : getDigitBanglaFromEnglish(0)}
                </Text>
              );
            } else
              return (
                <Text size="sm">
                  {data
                    ? getDigitBanglaFromEnglish(data)
                    : getDigitBanglaFromEnglish(0)}
                </Text>
              );
          },
        };
      },
    ),
  };
};

export const useResults = () => {
  const [resultsLoading, setResultsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>({});

  const getResults = async ({
    page,
    size,
    electionScheduleId,
    electionSettingsId,
  }: FetchResultsParams) => {
    setResultsLoading(true);
    try {
      const response = await fetchResults({
        page,
        size,
        electionScheduleId,
        electionSettingsId,
      });
      if (response?.data?.status === 200) {
        setResults(mapPollingCenterList(response?.data?.data?.results));

        setResultsLoading(false);
      } else {
        setResultsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      setResults({});
      setResultsLoading(false);
    }
  };

  return {
    resultsLoading,
    results,
    getResults,
  };
};
