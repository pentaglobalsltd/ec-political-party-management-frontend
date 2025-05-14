import { useState } from 'react';
import { fetchAllCandidateTypeList } from '@api/election-schedule-management/others/candidate-types';
import {
  useLanguage,
  LANGUAGE,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export interface AllCandidateType {
  label: string;
  value: string | number;
  electionTypeId: number;
}

export const useGetAllCandidateType = () => {
  const [allCandidateTypes, setAllCandidateTypes] = useState<
    AllCandidateType[]
  >([]);
  const { language } = useLanguage();

  const getAllCandidateType = async () => {
    try {
      const response = await fetchAllCandidateTypeList();
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.candidateTypes?.map(
          (item: any) => {
            const electionType =
              language === LANGUAGE.BANGLA
                ? item.electionTypeNameBn
                : item.electionTypeNameEn;
            const candidateType =
              language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn;

            return {
              ...item,
              label: `${candidateType} (${electionType})`,
              value: item.id,
            };
          },
        );
        setAllCandidateTypes(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    allCandidateTypes,
    getAllCandidateType,
  };
};
