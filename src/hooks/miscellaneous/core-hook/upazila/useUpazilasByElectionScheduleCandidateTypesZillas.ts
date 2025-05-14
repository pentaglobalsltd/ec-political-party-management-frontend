import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getUpazilasByElectionScheduleCandidateTypesZillasApi } from '@api/miscellaneous/core-api/upazila/upazilas-by-election-schedule-candidate-types-zilla';

interface HookReturnType {
  upazilas: SelectOptionArray[];
  getUpazilasByElectionScheduleCandidateTypesZillas: ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: {
    candidateTypeId: string | number;
    electionScheduleId: string | number;
    zillaId: string | number;
  }) => void;
}

export const useUpazilasByElectionScheduleCandidateTypesZillas = (
  isCallApi = true,
): HookReturnType => {
  const { language } = useLanguage();
  const [upazilas, setUpazilas] = useState<SelectOptionArray[]>([]);

  const getUpazilasByElectionScheduleCandidateTypesZillas = async ({
    electionScheduleId,
    candidateTypeId,
    zillaId,
  }: {
    candidateTypeId: string | number;
    electionScheduleId: string | number;
    zillaId: string | number;
  }) => {
    try {
      if (!isCallApi) return;

      const response =
        await getUpazilasByElectionScheduleCandidateTypesZillasApi({
          electionScheduleId,
          candidateTypeId,
          zillaId,
        });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.upazilas?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        setUpazilas(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    upazilas,
    getUpazilasByElectionScheduleCandidateTypesZillas,
  };
};
