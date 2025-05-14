import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createElectionSchedule } from '@api/election-schedule-management/election/election-schedule/schedule-declaration';
import { GetElectionDetailsList } from '@type/election-declaration-management/election/schedule-declaration-types';

export const useCreateScheduleDeclaration = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const scheduleDeclarationCreate = async (data: GetElectionDetailsList) => {
    try {
      const response = await createElectionSchedule({
        data,
      });
      if (response?.data?.status !== 201) {
        setLoading(true);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
    }
  };
  return { scheduleDeclarationCreate, loading, success };
};
