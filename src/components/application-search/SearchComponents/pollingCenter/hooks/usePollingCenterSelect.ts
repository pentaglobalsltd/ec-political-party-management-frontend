import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getPollingCentersApi } from '../api/polling-center';

export const usePollingCenter = () => {
  const [pollingCenter, setPollingCenter] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();
  const getPollingCenterData = async ({
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
      const response = await getPollingCentersApi({ params, filter });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.pollingCenters?.map(
          (item: any) => ({
            label:
              language === LANGUAGE.BANGLA
                ? `${item?.serial} - ${item?.nameBn}, ${item?.descriptionBn}`
                : `${item?.serial} - ${item?.nameEn}, ${item?.descriptionEn}`,
            value: item.id,
          }),
        );
        setPollingCenter(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pollingCenter,
    getPollingCenterData,
  };
};
