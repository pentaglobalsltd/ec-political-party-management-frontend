import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getElectionScheduleUserTypesApi } from '@api/user-management-service/user-types/election-schedule-user-types';

interface Props {
  electionScheduleId: string | number;
}

interface UseUserTypes {
  electionScheduleUserTypes: SelectOptionArray[];
  getElectionScheduleUserTypesData: ({ electionScheduleId }: Props) => void;
}

const useElectionScheduleUserTypesList = (): UseUserTypes => {
  const { language } = useLanguage();
  const [electionScheduleUserTypes, setElectionScheduleUserTypes] = useState<
    SelectOptionArray[]
  >([]);

  const getElectionScheduleUserTypesData = async ({
    electionScheduleId,
  }: Props) => {
    try {
      const response = await getElectionScheduleUserTypesApi({
        electionScheduleId,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.userTypes?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.code,
          })) || [];
        setElectionScheduleUserTypes(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    electionScheduleUserTypes,
    getElectionScheduleUserTypesData,
  };
};

export default useElectionScheduleUserTypesList;
