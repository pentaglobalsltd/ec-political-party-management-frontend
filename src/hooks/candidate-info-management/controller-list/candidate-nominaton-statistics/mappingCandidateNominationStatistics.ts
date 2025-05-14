import { candidateNameMapping } from '@helpers/candidate-type';
import {
  CandidateNominationStatistics,
  CandidateNominationStatisticsFrontend,
  SingleCandidateInfoStats,
} from '@type/candidate-info-management/candidate-nomination-statistics-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface Props {
  data: CandidateNominationStatistics[] | undefined;
}

export const mappingCandidateElectionStats = ({ data }: Props) => {
  if (!data) return [];

  const groupedData = data?.reduce(
    (
      prev: { [key: number]: CandidateNominationStatisticsFrontend },
      curr: CandidateNominationStatistics,
    ) => {
      let prevCandidateInfo: SingleCandidateInfoStats[] = [];

      if (!prev[curr.statusCode]) {
        prev[curr?.statusCode] = {} as CandidateNominationStatisticsFrontend;
      } else {
        prevCandidateInfo = prev[curr.statusCode]
          ?.candidateInfo as SingleCandidateInfoStats[];
      }

      prev[curr?.statusCode] = {
        statusCode: curr.statusCode,
        statusNameBn: curr.statusNameBn,

        candidateInfo: [
          ...prevCandidateInfo,
          {
            candidateTypeId: curr.candidateTypeId,
            candidateTypeNameBn: curr.candidateTypeNameBn,
            candidateCounts: curr.candidateCounts,
            lastUpdatedDateTime: curr.lastUpdatedDateTime,
          },
        ],
      };

      return prev;
    },
    {},
  );

  const result = Object.values(groupedData || {}).map((obj, indx) => {
    const sum = obj?.candidateInfo?.reduce((prev, curr) => {
      return prev + (curr?.candidateCounts || 0);
    }, 0);

    let temp = {};

    obj?.candidateInfo?.forEach((item) => {
      temp = {
        ...temp,
        [candidateNameMapping(item?.candidateTypeId) as string]:
          getDigitBanglaFromEnglish(item?.candidateCounts),
      };
    });

    return {
      ...obj,
      ...temp,
      id: indx + 1,
      totalCounts: getDigitBanglaFromEnglish(sum),
    };
  });

  // console.log('result', result);

  return result;
};
