import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getUnionOrWardsByMunicipalitiesZillas } from '@api/miscellaneous/core-api/union-or-ward/unions-by-schedule-zilla-municipality';
import {
  SelectOptionType,
  UnionOrWardsType,
} from '@type/union-or-wards-by-municipalities-zillas-type';

interface Props {
  electionScheduleId: string | number;
  zillaId: string | number;
  municipalityId: string | number;
}

export const useUnionOrWardsByMunicipalitiesZilla = () => {
  const { language } = useLanguage();
  const [unionsOrWards, setUnionsOrWards] = useState<SelectOptionType[]>([]);
  const [success, setSuccess] = useState(false);

  const getUnionsOrWardsData = async ({
    electionScheduleId,
    zillaId,
    municipalityId,
  }: Props) => {
    try {
      setSuccess(false);

      const response = await getUnionOrWardsByMunicipalitiesZillas(
        electionScheduleId,
        zillaId,
        municipalityId,
      );
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.unionsOrWards?.map(
          (item: UnionOrWardsType) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        ) as SelectOptionType[];
        setUnionsOrWards(dataArray);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    unionsOrWards,
    getUnionsOrWardsData,
    success,
  };
};
