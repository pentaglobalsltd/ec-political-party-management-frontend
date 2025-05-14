import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  MunicipalityConstituenciesParams,
  fetchMunicipalityConstituencies,
} from '@api/miscellaneous/core-api/constituency/constituencies-by-schedule-candidate-zilla-municipality';

export const useMunicipalityConstituenciesSelect = () => {
  const { language } = useLanguage();
  const [municipalityConstituencies, setMunicipalityConstituencies] = useState<
    SelectOptionArray[]
  >([]);

  const getMunicipalityConstituenciesSelect = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
    municipalityId,
    getElectionSettings,
    isActive,
  }: MunicipalityConstituenciesParams) => {
    try {
      const response = await fetchMunicipalityConstituencies({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        municipalityId,
        isActive,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.constituencies?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: getElectionSettings ? item.electionSettingsId : item.id,
            extra: {
              electionSettingsId: item?.electionSettingsId,
              constituencyId: item?.id,
            },
          })) || [];

        setMunicipalityConstituencies(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    municipalityConstituencies,
    getMunicipalityConstituenciesSelect,
  };
};
