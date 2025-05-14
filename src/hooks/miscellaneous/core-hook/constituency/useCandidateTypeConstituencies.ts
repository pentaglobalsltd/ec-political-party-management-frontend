import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionSchedulesCandidateTypeConstituencies } from '@api/miscellaneous/core-api/constituency/constituencies-by-schedule-candidate-zilla';

interface props {
  electionSchedulesId: string | number;
  electionSchedulesZillaId: string | number;
  candidateTypeId: string | number;
  getElectionSettings?: true;
  upazillaId?: string | number;
  isActive?: boolean;
}
const useElectionSchedulesCandidateTypeConstituencies = () => {
  const { language } = useLanguage();
  const [constituencies, setConstituencies] = useState<SelectOptionArray[]>([]);

  const getElectionSchedulesCandidateTypeConstituenciesData = async ({
    electionSchedulesId,
    electionSchedulesZillaId,
    candidateTypeId,
    getElectionSettings,
    upazillaId,
    isActive,
  }: props) => {
    try {
      const response = await getElectionSchedulesCandidateTypeConstituencies(
        electionSchedulesId,
        electionSchedulesZillaId,
        candidateTypeId,
        upazillaId,
        isActive,
      );
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.constituencies?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: getElectionSettings ? item.electionSettingsId : item.id,
            extra: {
              constituencyId: item?.id,
              electionSettingsId: item?.electionSettingsId,
            },
          })) || [];

        setConstituencies(dataArray);
      } else {
        setConstituencies([]);
      }
    } catch (error) {
      console.log(error);
      setConstituencies([]);
    }
  };

  const resetConstituencies = () => setConstituencies([]);

  return {
    constituencies,
    resetConstituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  };
};

export default useElectionSchedulesCandidateTypeConstituencies;
