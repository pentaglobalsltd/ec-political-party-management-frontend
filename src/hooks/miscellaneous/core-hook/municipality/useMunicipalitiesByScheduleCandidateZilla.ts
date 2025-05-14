import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  ApiGetMunicipalitiesByScheduleCandidateZilla,
  fetchMunicipalitiesByScheduleCandidateZilla,
} from '@api/miscellaneous/core-api/municipality/municipalities-by-schedule-candidate-zilla';
import { SelectOptionArray } from '@type/selection-option-type';

type Props = ApiGetMunicipalitiesByScheduleCandidateZilla;

interface HookReturnType {
  municipalities: SelectOptionArray[];
  getMunicipalitiesByScheduleCandidateZilla: (
    params: ApiGetMunicipalitiesByScheduleCandidateZilla,
  ) => void;
}

export const useMunicipalitiesByScheduleCandidateZilla = (): HookReturnType => {
  const { language } = useLanguage();
  const [municipalities, setMunicipalities] = useState<SelectOptionArray[]>([]);

  const getMunicipalitiesByScheduleCandidateZilla = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: Props) => {
    try {
      const response = await fetchMunicipalitiesByScheduleCandidateZilla({
        electionScheduleId,
        candidateTypeId,
        zillaId,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.municipalities?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setMunicipalities(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    municipalities,
    getMunicipalitiesByScheduleCandidateZilla,
  };
};
