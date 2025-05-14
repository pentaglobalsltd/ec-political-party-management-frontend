import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchUnionsByDoubleConstituenciesAuth } from '@api/miscellaneous/master-api/union-or-ward/unions-by-constituencies-constituencies-auth';

interface Props {
  constituencyId: number | string;
  upazilaId?: number | string;
  upazilaIds?: string;
}

export const useUnionsOrWardsSelectByConstituencyUpazilla = () => {
  const [unionsOrWards, setUnionsOrWards] = useState([]);
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const getUnionsOrWardsData = async ({
    constituencyId,
    upazilaId,
    upazilaIds,
  }: Props) => {
    try {
      setSuccess(false);

      const response = await fetchUnionsByDoubleConstituenciesAuth({
        constituencyId,
        upazilaId,
        upazilaIds,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.unionsOrWards?.map(
          (item: { nameBn: string; nameEn: string; id: string }) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        );

        setUnionsOrWards(dataArray);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetUnionsOrWards = () => setUnionsOrWards([]);

  return {
    unionsOrWards,
    getUnionsOrWardsData,
    resetUnionsOrWards,
    success,
  };
};
