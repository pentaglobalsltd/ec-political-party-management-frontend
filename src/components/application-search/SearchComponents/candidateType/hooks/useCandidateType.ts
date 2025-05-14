import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  useLanguage,
  LANGUAGE,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getElectionCandidateTypes } from '../api/candidate-types';

interface UseElectionCandidateTypesPropsTypes {
  electionCandidateTypes: SelectOptionArray[];
  getElectionCandidateTypesData: (
    params: {
      [key: string]: string | number;
    },
    nonVisibleCandidateType?: number[],
  ) => void;
  resetElectionCandidateTypes: () => void;
}

const useCandidateTypes = (): UseElectionCandidateTypesPropsTypes => {
  const { language } = useLanguage();
  const [electionCandidateTypes, setElectionCandidateTypes] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionCandidateTypesData = async (
    params: {
      [key: string]: string | number;
    },
    nonVisibleCandidateType?: number[],
  ) => {
    try {
      const response = await getElectionCandidateTypes(params);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.candidateTypes
            ?.filter(
              (item: any) => !nonVisibleCandidateType?.includes(item?.id),
            )
            ?.map((item: any) => ({
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            })) || [];
        setElectionCandidateTypes(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetElectionCandidateTypes = () => setElectionCandidateTypes([]);

  return {
    electionCandidateTypes,
    getElectionCandidateTypesData,
    resetElectionCandidateTypes,
  };
};

export default useCandidateTypes;
