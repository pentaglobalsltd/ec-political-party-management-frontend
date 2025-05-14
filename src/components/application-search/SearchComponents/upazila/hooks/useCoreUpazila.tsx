import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getCoreUpazilasApi } from '../../upazila/api/coreUpazila';

const useCoreUpazila = () => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState<SelectOptionArray[]>([]);

  const getUpazilasData = async ({
    params,

    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await getCoreUpazilasApi(params, filter);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.upazilas?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setUpazilas(dataArray);
      } else {
        setUpazilas([]);
      }
    } catch (error) {
      console.log(error);
      setUpazilas([]);
    }
  };

  return {
    upazilas,

    getUpazilasData,
  };
};

export default useCoreUpazila;
