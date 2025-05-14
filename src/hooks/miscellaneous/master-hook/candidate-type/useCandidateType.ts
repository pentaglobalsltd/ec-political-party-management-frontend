import { useState } from 'react';
import { getCandidateTypeByElecTypeNoAuth } from '@api/miscellaneous/master-api/candidate-type/candidate-types-by-elec-type-no-auth';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface UseElectionCandidateTypesPropsTypes {
  electionCandidateTypes: SelectOptionArray[];
  getElectionCandidateTypesData: (electionId: string | number) => void;
  resetElectionCandidateTypes: () => void;
}

const useCandidateTypes = (): UseElectionCandidateTypesPropsTypes => {
  const { language } = useLanguage();
  const [electionCandidateTypes, setElectionCandidateTypes] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionCandidateTypesData = async (electionId: string | number) => {
    try {
      const response = await getCandidateTypeByElecTypeNoAuth(electionId);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.candidateTypes?.map((item: any) => ({
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
