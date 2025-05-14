import { fetchUnionsOrWardsAuth } from '@api/miscellaneous/master-api/union-or-ward/unions-master-auth';
import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
interface props {
  upazilaIds?: string;
  upazilaId?: number | string;
  regionId?: number | string;
  municipalityId?: number | string;
  rmoEn?: string;
}
export const useUnionsOrWards = () => {
  const [unionsOrWards, setUnionsOrWards] = useState([]);
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);
  const getUnionsOrWardsData = async ({
    upazilaIds,
    upazilaId,
    regionId,
    municipalityId,
    rmoEn,
  }: props) => {
    try {
      setSuccess(false);
      const response = await fetchUnionsOrWardsAuth({
        upazilaIds,
        upazilaId,
        regionId,
        municipalityId,
        rmoEn,
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

  return {
    unionsOrWards,
    getUnionsOrWardsData,
    success,
  };
};
