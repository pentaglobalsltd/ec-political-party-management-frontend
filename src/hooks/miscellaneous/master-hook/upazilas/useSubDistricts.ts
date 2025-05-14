import { fetchUpazilasAuth } from '@api/miscellaneous/master-api/upazilas/upazilas-master-auth';
import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface Props {
  zillaId?: string | number;
  regionId?: string | number;
}

export const useSubDistricts = () => {
  const { language } = useLanguage();
  const [upazilas, setUpaZilas] = useState([]);

  const getSubdistrictData = async ({ zillaId, regionId }: Props) => {
    const response = await fetchUpazilasAuth({ zillaId, regionId });
    if (response?.data?.status === 200) {
      const dataArray = response.data?.data?.upazilas?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
        value: item.id,
      }));
      setUpaZilas(dataArray);
    }
  };

  return {
    upazilas,
    getSubdistrictData,
  };
};
