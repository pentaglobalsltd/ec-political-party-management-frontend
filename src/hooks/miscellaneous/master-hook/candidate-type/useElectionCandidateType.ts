import { useState } from 'react';
import { getCandidateTypeByElecTypeAuth } from '@api/miscellaneous/master-api/candidate-type/candidate-types-by-elec-type-auth';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface UseElectionCandidateTypesPropsTypes {
  electionCandidateTypes: SelectOptionArray[];
  getElectionCandidateTypesData: (electionId: string | number) => void;
}

const useCandidateTypes = (): UseElectionCandidateTypesPropsTypes => {
  const { language } = useLanguage();
  const [electionCandidateTypes, setElectionCandidateTypes] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionCandidateTypesData = async (electionId: string | number) => {
    const response = await getCandidateTypeByElecTypeAuth(electionId);
    if (response?.data?.status === 200) {
      const dataArray =
        response?.data?.data?.candidateTypes?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        })) || [];
      setElectionCandidateTypes(dataArray);
    }
  };

  return {
    electionCandidateTypes,
    getElectionCandidateTypesData,
  };
};

export default useCandidateTypes;
