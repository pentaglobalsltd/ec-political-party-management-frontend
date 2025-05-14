import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  SelectOptionType,
  UnionOrWardsType,
} from '@type/union-or-wards-by-municipalities-zillas-type';
import { getUnionOrWardsByElectionTypeScheduleZillaUpazila } from '@api/miscellaneous/core-api/union-or-ward/unions-by-election-type-schedule-zilla-upazila';

interface Props {
  getOnlyIds?: boolean;
  electionTypeId: string | number;
  electionScheduleId: string | number;
  zillaId: string | number;
  upazilaId: string | number;
}

export const useUnionOrWardsByElectionTypeScheduleZillaUpazila = () => {
  const { language } = useLanguage();
  const [unionsOrWards, setUnionsOrWards] = useState<SelectOptionType[]>([]);
  const [unionsOrWardsIds, setUnionsOrWardsIds] = useState<number[]>([]);

  const [success, setSuccess] = useState(false);

  const getUnionsOrWardsData = async ({
    getOnlyIds = false,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
  }: Props) => {
    try {
      setSuccess(false);
      const response = await getUnionOrWardsByElectionTypeScheduleZillaUpazila({
        electionTypeId,
        electionScheduleId,
        zillaId,
        upazilaId,
      });

      if (response?.data?.status === 200) {
        if (getOnlyIds) {
          const dataArray = response?.data?.data?.unionsOrWards?.map(
            (item: UnionOrWardsType) => item.id,
          ) as number[];
          setUnionsOrWardsIds(dataArray);
        } else {
          const dataArray = response?.data?.data?.unionsOrWards?.map(
            (item: UnionOrWardsType) => ({
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            }),
          ) as SelectOptionType[];
          setUnionsOrWards(dataArray);
        }
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    unionsOrWards,
    unionsOrWardsIds,
    getUnionsOrWardsData,
    success,
  };
};
