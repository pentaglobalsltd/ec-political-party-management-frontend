import { useState } from 'react';
import { getSubDistrictListFromZilla } from '@api/election-schedule-management/main-list/sub-district/sub-districts';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export const useSubDistrictListSelect = () => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState([]);

  const getSubDistrictListSelect = async (zillaId: string | number) => {
    try {
      const response = await getSubDistrictListFromZilla(zillaId);
      const dataArray = response?.data?.data?.upazilas?.map(
        (item: { nameBn: string; nameEn: string; id: string | number }) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setUpazilas(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    upazilas,
    getSubDistrictListSelect,
  };
};
