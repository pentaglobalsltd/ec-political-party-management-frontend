import { getConstituenciesByElectionScheduleCandidateTypesZillaUpazilasUnionOrWardsApi } from '@api/miscellaneous/core-api/constituency/constituencies-by-election-schedule-candidate-types-zillas-upazillas-union-or-wards';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { useState } from 'react';

export const useConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards =
  () => {
    const { language } = useLanguage();
    const [constituencies, setConstituencies] = useState<SelectOptionArray[]>(
      [],
    );

    const getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards =
      async ({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        upazilaId,
        unionOrWardsId,
        isActive = true,
        getElectionSettings,
      }: {
        candidateTypeId: string | number;
        electionScheduleId: string | number;
        zillaId: string | number;
        upazilaId: string | number;
        unionOrWardsId: string | number;
        isActive: boolean;
        getElectionSettings?: boolean;
      }) => {
        try {
          const response =
            await getConstituenciesByElectionScheduleCandidateTypesZillaUpazilasUnionOrWardsApi(
              {
                electionScheduleId,
                candidateTypeId,
                zillaId,
                upazilaId,
                unionOrWardsId,
                isActive,
              },
            );
          if (response?.data?.status === 200) {
            const dataArray =
              response?.data?.data?.constituencies?.map((item: any) => ({
                label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
                value: getElectionSettings ? item.electionSettingsId : item.id,
              })) || [];

            setConstituencies(dataArray);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return {
      constituencies,
      getConstituenciesByElectionScheduleCandidateTypeZillaUpazilaUnionOrWards,
    };
  };
