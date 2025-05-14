import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getUpazilasByZillas } from '@api/miscellaneous/core-api/upazila/upazilas-by-elec-type-schedules-zillas';
import {
  UpazilasByZillasSelectOptionsType,
  UpazilaByZillasType,
} from '@type/upazilas-by-zillas-types';

interface Props {
  electionTypeId: string | number;
  electionScheduleId: string | number;
  zillaId: string | number;
}

const useUpazilasByZillas = () => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState<UpazilasByZillasSelectOptionsType[]>(
    [],
  );

  const getUpazilasByZillasData = async ({
    electionTypeId,
    electionScheduleId,
    zillaId,
  }: Props) => {
    try {
      const response = await getUpazilasByZillas(
        electionTypeId,
        electionScheduleId,
        zillaId,
      );
      if (response?.data?.status === 200) {
        const dataArray = (response?.data?.data?.upazilas?.map(
          (item: UpazilaByZillasType) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        ) || []) as UpazilasByZillasSelectOptionsType[];

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
    getUpazilasByZillasData,
  };
};

export default useUpazilasByZillas;
