import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  UpazilaThanaConstituenciesParams,
  fetchUpazilaThanaConstituencies,
} from '@api/miscellaneous/core-api/constituency/constituencies-by-upazila-thana';
import { SelectOptionArray } from '@type/selection-option-type';

export const useUpazilaThanaConstituenciesSelect = () => {
  const { language } = useLanguage();
  const [upazilaOrThanaConstituencies, setUpazilaOrThanaConstituencies] =
    useState<SelectOptionArray[]>([]);

  const getUpazilaOrThanaConstituenciesSelect = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    upazilaThanaId,
    getElectionSettings,
    isActive,
  }: UpazilaThanaConstituenciesParams) => {
    try {
      const response = await fetchUpazilaThanaConstituencies({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
        upazilaThanaId,
        isActive,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.constituencies?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: getElectionSettings ? item.electionSettingsId : item.id,
          })) || [];

        setUpazilaOrThanaConstituencies(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    upazilaOrThanaConstituencies,
    getUpazilaOrThanaConstituenciesSelect,
  };
};
