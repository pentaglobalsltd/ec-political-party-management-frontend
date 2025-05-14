import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetConstituenciesByScheduleCandidateZillaMunicipalities } from '../api/constituencies-by-schedule-candidate-zilla-municipality';

interface HookReturnType {
  constituencies: SelectOptionArray[];
  getConstituenciesByScheduleCandidateZillaMunicipalities: (params: {
    [key: string]: string | number;
  }) => void;
}

export const useConstituenciesByScheduleCandidateZillaMunicipalities =
  (): HookReturnType => {
    const { language } = useLanguage();
    const [constituencies, setConstituencies] = useState<SelectOptionArray[]>(
      [],
    );

    const getConstituenciesByScheduleCandidateZillaMunicipalities =
      async (params: { [key: string]: string | number }) => {
        try {
          const response =
            await apiGetConstituenciesByScheduleCandidateZillaMunicipalities(
              params,
            );
          if (response?.data?.status === 200) {
            const dataArray =
              response?.data?.data?.constituencies?.map((item: any) => ({
                label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
                value: item.id,
                extra: {
                  electionSettingsId: item?.electionSettingsId,
                  constituencyId: item?.id,
                },
              })) || [];

            setConstituencies(dataArray);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return {
      constituencies,
      getConstituenciesByScheduleCandidateZillaMunicipalities,
    };
  };
