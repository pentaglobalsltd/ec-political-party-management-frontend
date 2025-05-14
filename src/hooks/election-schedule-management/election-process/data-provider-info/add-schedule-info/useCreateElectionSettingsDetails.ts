import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createElectionSettingsDetails } from '@api/election-schedule-management/election-process/election-settings-details/create-election-settings-details';
import { ElectionSettingsDetailsById } from '@type/election-declaration-management/election-process/election-settings-details';

export const useCreateElectionSettingsDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createElectionSettingsDetailsData = async (
    data: ElectionSettingsDetailsById,
  ) => {
    try {
      const response = await createElectionSettingsDetails(data);
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
  return {
    createElectionSettingsDetailsData,
    loading,
    success,
  };
};
