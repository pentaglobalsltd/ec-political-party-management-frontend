import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getUpalizaByMunicipality } from '@api/election-schedule-management/main-list/sub-district/sub-districts';

export const useUpalizaByMunicipalityListSelect = () => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState([]);

  const getUpalizaByMunicipalityListSelect = async (
    municipality: string | number,
    district: string | number,
  ) => {
    try {
      const response = await getUpalizaByMunicipality({
        municipality,
        district,
      });
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
    getUpalizaByMunicipalityListSelect,
  };
};
