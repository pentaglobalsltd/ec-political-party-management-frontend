import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getMunicipalitiesBySchedulesZillas } from '@api/miscellaneous/core-api/municipality/municipalities-by-schedules-zillas';
import {
  MunicipalityBySchedulesZillasSelectOptionsType,
  MunicipalityBySchedulesZillasType,
} from '@type/municipalities-by-schedules-zillas-types';

interface Props {
  electionScheduleId: string | number;
  zillaId: string | number;
}

const useMunicipalitiesBySchedulesZillas = () => {
  const { language } = useLanguage();
  const [municipalities, setMunicipalities] = useState<
    MunicipalityBySchedulesZillasSelectOptionsType[]
  >([]);

  const getMunicipalityBySchedulesZillasData = async ({
    electionScheduleId,
    zillaId,
  }: Props) => {
    try {
      const response = await getMunicipalitiesBySchedulesZillas(
        electionScheduleId,
        zillaId,
      );
      if (response?.data?.status === 200) {
        const dataArray = (response?.data?.data?.municipalities?.map(
          (item: MunicipalityBySchedulesZillasType) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        ) || []) as MunicipalityBySchedulesZillasSelectOptionsType[];

        setMunicipalities(dataArray);
      } else {
        setMunicipalities([]);
      }
    } catch (error) {
      console.log(error);
      setMunicipalities([]);
    }
  };

  return {
    municipalities,
    getMunicipalityBySchedulesZillasData,
  };
};

export default useMunicipalitiesBySchedulesZillas;
