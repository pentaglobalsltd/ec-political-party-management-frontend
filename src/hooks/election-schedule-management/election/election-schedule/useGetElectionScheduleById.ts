import { useState } from 'react';
import { getElectionScheduleAPI } from '@api/election-schedule-management/election/election-schedule/get-election-schedule';
import { ElectionScheduleType } from '@type/election-declaration-management/election/election-schedule/election-schedule';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { Convert24HrTo12Hr } from '@utils/time-converter';
import {
  removeTimeInDate,
  removeTimeInDateOfElection,
} from '@utils/date-converter';

function mapScheduleDeclaration(
  data?: ElectionScheduleType,
  language?: string | null,
) {
  return {
    ...data,
    name: language === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
    electionTypeId: parseInt(data?.electionTypeId as string),
    voteCastingStartTime: Convert24HrTo12Hr(
      data?.voteCastingStartTime as string,
    ),

    voteCastingEndTime: Convert24HrTo12Hr(data?.voteCastingEndTime as string),
    dateOfDeclaration: removeTimeInDate({
      dateFormat: data?.dateOfDeclaration as string,
    }),
    dateOfNominationSubmission: removeTimeInDate({
      dateFormat: data?.dateOfNominationSubmission as string,
    }),
    dateOfNominationSelectionStart: removeTimeInDate({
      dateFormat: data?.dateOfNominationSelectionStart as string,
    }),
    dateOfNominationSelectionEnd: removeTimeInDate({
      dateFormat: data?.dateOfNominationSelectionEnd as string,
    }),
    dateOfAppealSubmission: removeTimeInDate({
      dateFormat: data?.dateOfAppealSubmission as string,
    }),
    dateOfAppealJudgement: removeTimeInDate({
      dateFormat: data?.dateOfAppealJudgement as string,
    }),
    dateOfNominationWithdrawal: removeTimeInDate({
      dateFormat: data?.dateOfNominationWithdrawal as string,
    }),
    dateOfAssignedSymbol: removeTimeInDate({
      dateFormat: data?.dateOfAssignedSymbol as string,
    }),
    dateOfElection: removeTimeInDateOfElection({
      dateFormat: data?.dateOfElection as string,
    }),
    dateOfGazette: removeTimeInDate({
      dateFormat: data?.dateOfGazette as string,
    }),
    isOnlineNomination: data?.isOnlineNomination ? 'active' : 'inactive',
    isActive: data?.isActive ? 'isActive' : 'isInActive',
    parentElectionScheduleIds: data?.parentElectionSchedules?.map(
      (item) => item.id,
    ),
  };
}

export const useGetElectionScheduleById = () => {
  const { language } = useLanguage();
  const [electionSchedule, setElectionSchedule] =
    useState<ElectionScheduleType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const getElectionScheduleData = async (id?: string | number) => {
    try {
      const response = await getElectionScheduleAPI(id);
      setIsLoading(true);
      if (response?.data?.status === 200 && response?.data) {
        const data = mapScheduleDeclaration(response?.data.data, language);

        setElectionSchedule(data);
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    electionSchedule,
    isLoading,
    isSuccess,
    getElectionScheduleData,
  };
};
