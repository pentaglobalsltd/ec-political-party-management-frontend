import { useEffect, useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getZillas } from '@api/election-schedule-management/main-list/district/district';
export interface ZillasProps {
  notCallOnMount?: boolean;
}
export const useZillas = ({ notCallOnMount }: ZillasProps) => {
  const { language } = useLanguage();
  const [zillas, setZillas] = useState([]);

  const getZillasData = async (division?: number | string) => {
    const response = await getZillas({ division });
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.zillas?.map(
        (item: { nameBn: string; nameEn: string; id: string }) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setZillas(dataArray);
    }
  };
  useEffect(() => {
    if (!notCallOnMount) {
      getZillasData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, notCallOnMount]);

  return {
    zillas,
    getZillasData,
  };
};
