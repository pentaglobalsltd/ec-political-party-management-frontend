import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionSchedulesCandidateTypeZillas } from '@api/miscellaneous/core-api/zilla/zillas-by-schedule-candidate';

interface useElectionSchedulesZillasTypes {
  candidateTypeDistrict: SelectOptionArray[];
  isSuccess: boolean;
  getElectionSchedulesCandidateTypeDistrictData: (
    electionSchedulesId: string | number,
    candidateTypeId: string | number,
    regionId?: string | number,
  ) => void;

  resetCandidateTypeDistrict: () => void;
}

const useElectionSchedulesCandidateTypeZillas =
  (): useElectionSchedulesZillasTypes => {
    const { language } = useLanguage();
    const [candidateTypeDistrict, setCandidateTypeDistrict] = useState<
      SelectOptionArray[]
    >([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const getElectionSchedulesCandidateTypeDistrictData = async (
      electionSchedulesId: string | number,
      candidateTypeId: string | number,
      regionId?: string | number,
    ) => {
      setIsSuccess(false);
      try {
        const response = await getElectionSchedulesCandidateTypeZillas(
          electionSchedulesId,
          candidateTypeId,
          regionId,
        );
        if (response?.data?.status === 200) {
          const dataArray =
            response?.data?.data?.zillas?.map((item: any) => ({
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            })) || [];

          setIsSuccess(true);
          setCandidateTypeDistrict(dataArray);
        } else {
          setCandidateTypeDistrict([]);
          setIsSuccess(false);
        }
      } catch (error) {
        console.log(error);
        setCandidateTypeDistrict([]);
        setIsSuccess(false);
      }
    };

    const resetCandidateTypeDistrict = () => setCandidateTypeDistrict([]);

    return {
      candidateTypeDistrict,
      isSuccess,
      getElectionSchedulesCandidateTypeDistrictData,
      resetCandidateTypeDistrict,
    };
  };

export default useElectionSchedulesCandidateTypeZillas;
