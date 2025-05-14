import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getMasterElectionSchedulesZillas } from '../api/masterZillas';

interface useMasterElectionSchedulesZillasTypes {
  masterZillas: SelectOptionArray[];
  getMasterDistrictData: ({
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

const useMasterElectionSchedulesZillas =
  (): useMasterElectionSchedulesZillasTypes => {
    const { language } = useLanguage();
    const [masterZillas, setMasterElectionSchedulesZillas] = useState<
      SelectOptionArray[]
    >([]);

    const getMasterDistrictData = async ({
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
        const response = await getMasterElectionSchedulesZillas({
          params,
          filter,
        });
        if (response?.data?.status === 200) {
          const dataArray =
            response?.data?.data?.zillas?.map((item: any) => ({
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            })) || [];

          setMasterElectionSchedulesZillas(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      masterZillas,
      getMasterDistrictData,
    };
  };

export default useMasterElectionSchedulesZillas;
