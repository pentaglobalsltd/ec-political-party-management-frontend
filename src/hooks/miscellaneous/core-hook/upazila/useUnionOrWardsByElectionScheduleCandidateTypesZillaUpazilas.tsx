import { getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilasApi } from '@api/miscellaneous/core-api/upazila/unionward-by-election-schedule-candidate-types-zilla-upazila';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { useState } from 'react';

export const useUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas =
  () => {
    const { language } = useLanguage();
    const [unionsOrWards, setUnionsOrWards] = useState<SelectOptionArray[]>([]);

    const getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas =
      async ({
        electionScheduleId,
        candidateTypeId,
        zillaId,
        upazilaId,
      }: {
        candidateTypeId: string | number;
        electionScheduleId: string | number;
        zillaId: string | number;
        upazilaId: string | number;
      }) => {
        try {
          const response =
            await getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilasApi(
              {
                electionScheduleId,
                candidateTypeId,
                zillaId,
                upazilaId,
              },
            );
          if (response?.data?.status === 200) {
            const dataArray =
              response?.data?.data?.unionsOrWards?.map((item: any) => ({
                label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
                value: item.id,
              })) || [];

            setUnionsOrWards(dataArray);
          }
        } catch (error) {
          console.error(error);
        }
      };

    return {
      unionsOrWards,
      getUnionOrWardsByElectionScheduleCandidateTypesZillaUpazilas,
    };
  };
