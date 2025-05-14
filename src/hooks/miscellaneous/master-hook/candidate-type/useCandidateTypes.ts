import { useState } from 'react';
import { getCandidateTypes } from '@api/miscellaneous/master-api/candidate-type/candidate-types';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

export const useCandidateTypes = () => {
  const [candidateTypes, setCandidateTypes] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();

  const getCandidateType = async (electionTypeId?: string | number) => {
    const response = await getCandidateTypes(electionTypeId);
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.candidateTypes?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setCandidateTypes(dataArray);
    }
  };

  return {
    candidateTypes,
    getCandidateType,
  };
};
