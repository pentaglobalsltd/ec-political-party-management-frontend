import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  ApiGetUpazilasOrThanas,
  fetchUpazilasOrThanas,
} from '@api/miscellaneous/core-api/upazila/upazilas-or-thanas';
import { SelectOptionArray } from '@type/selection-option-type';

type Props = ApiGetUpazilasOrThanas;

interface HookReturnType {
  upazilasOrThanas: SelectOptionArray[];
  getUpazilasOrThanas: (params: ApiGetUpazilasOrThanas) => void;
}

export const useUpazilasOrThanas = (): HookReturnType => {
  const { language } = useLanguage();
  const [upazilasOrThanas, setUpazilasOrThanas] = useState<SelectOptionArray[]>(
    [],
  );

  const getUpazilasOrThanas = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
  }: Props) => {
    try {
      const response = await fetchUpazilasOrThanas({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.upazilas?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setUpazilasOrThanas(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    upazilasOrThanas,
    getUpazilasOrThanas,
  };
};
