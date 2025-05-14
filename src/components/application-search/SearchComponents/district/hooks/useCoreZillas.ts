import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getCoreElectionSchedulesZillas } from '../api/coreZillas';

interface useCoreElectionSchedulesZillasTypes {
  coreZillas: SelectOptionArray[];
  getCoreDistrictData: ({
    params,

    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => void;
}

const useCoreElectionSchedulesZillas =
  (): useCoreElectionSchedulesZillasTypes => {
    const { language } = useLanguage();
    const [coreZillas, setCoreElectionSchedulesZillas] = useState<
      SelectOptionArray[]
    >([]);

    const getCoreDistrictData = async ({
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
        const response = await getCoreElectionSchedulesZillas({
          params,
          filter,
        });
        if (response?.data?.status === 200) {
          const dataArray =
            response?.data?.data?.zillas?.map((item: any) => ({
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            })) || [];

          setCoreElectionSchedulesZillas(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      coreZillas,
      getCoreDistrictData,
    };
  };

export default useCoreElectionSchedulesZillas;
