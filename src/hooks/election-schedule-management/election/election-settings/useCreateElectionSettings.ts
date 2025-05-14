import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createElectionSettings } from '@api/election-schedule-management/election/election-settings/election-settings';
import { CreateElectionSettingsType } from '@type/election-declaration-management/election/election-settings';

export const useCreateElectionSettings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createSettings = async (data: CreateElectionSettingsType[]) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await createElectionSettings(data);
      if (response?.data?.status !== 201) {
        setLoading(false);
        setSuccess(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
    }
  };
  return {
    createSettings,
    loading,
    success,
  };
};
