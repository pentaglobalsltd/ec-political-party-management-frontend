import { useState } from 'react';
import { updateElectionSchedule } from '@api/election-schedule-management/election/election-schedule/schedule-declaration';
import { GetElectionDetailsList } from '@type/election-declaration-management/election/schedule-declaration-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const useUpdateScheduleDeclaration = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const scheduleDeclarationUpdate = async (
    data: GetElectionDetailsList,
    id: string | number,
  ) => {
    try {
      const response = await updateElectionSchedule({ data, id });
      if (response?.data?.status !== 200) {
        setUpdateLoading(true);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setUpdateLoading(false);
        setUpdateSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      setUpdateLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };
  return { scheduleDeclarationUpdate, updateLoading, updateSuccess };
};
