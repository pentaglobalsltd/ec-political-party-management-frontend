import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { fetchUpazilasByMunicipalities } from '@api/miscellaneous/master-api/upazilas/upazilas-by-municipalities';

export const useUpazillaMunicipalities = () => {
  const { language } = useLanguage();
  const [municipalities, setUpazillaMunicipalities] = useState<
    SelectOptionArray[]
  >([]);

  const getUpazillasMunicipalitiesList = async ({
    upazilasId,
    rmoEn,
  }: {
    upazilasId: number | string;
    rmoEn?: string;
  }) => {
    const response = await fetchUpazilasByMunicipalities({ upazilasId, rmoEn });
    if (response?.data?.status === 200) {
      const dataArray = response?.data?.data?.municipalities?.map(
        (item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }),
      );
      setUpazillaMunicipalities(dataArray);
    }
  };

  return {
    municipalities,
    getUpazillasMunicipalitiesList,
  };
};
