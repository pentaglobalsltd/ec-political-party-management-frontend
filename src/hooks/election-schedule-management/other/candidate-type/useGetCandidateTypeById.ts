import { useState } from 'react';
import { getCandidateTypeById } from '@api/election-schedule-management/others/get-candidate-type-by-id';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { CandidateTypeTypes } from '@type/candidate-type-types';

const mapCandidateType = (
  data?: CandidateTypeTypes,
  language?: string | null,
) => {
  return {
    ...data,
    name: language === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
  };
};

export const useGetCandidateTypeById = () => {
  const { language } = useLanguage();
  const [candidateType, setCandidateType] = useState<CandidateTypeTypes>();

  const getCandidateTypeData = async (id?: number) => {
    try {
      const response = await getCandidateTypeById(id);
      if (response?.data?.status === 200 && response?.data) {
        const data = mapCandidateType(response?.data.data, language);
        setCandidateType(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    candidateType,
    getCandidateTypeData,
  };
};
