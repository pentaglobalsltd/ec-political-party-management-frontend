import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchReservedUnionWardList } from '@api/election-schedule-management/main-list/reserved-union-word/reserved-union-ward-list';

interface Props {
  municipality: number | string;
}

export const useInclusionListSelect = () => {
  const { language } = useLanguage();
  const [inclusions, setInclusions] = useState([]);

  const getInclusionListSelect = async ({ municipality }: Props) => {
    try {
      await fetchReservedUnionWardList({ municipality }).then((response) => {
        const dataArray = response?.data?.data?.unionsOrWardsForReserved?.map(
          (item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.municipalityWardId,
          }),
        );
        setInclusions(dataArray);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    inclusions,
    getInclusionListSelect,
  };
};
