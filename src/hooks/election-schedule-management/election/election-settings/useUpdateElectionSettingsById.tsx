import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { apiUpdateElectionSettingsById } from '@api/election-schedule-management/election/election-settings/update-election-settings-by-id';
import { GetElectionSettingsByIdTypes } from '@type/election-declaration-management/election/election-settings/election-settings-types';

const useUpdateElectionSettingsById = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const updateElectionSettingsById = async ({
    electionSettingsId,
    data,
  }: GetElectionSettingsByIdTypes) => {
    try {
      const response = await apiUpdateElectionSettingsById({
        electionSettingsId,
        data,
      });
      if (response?.data?.status !== 200) {
        setLoading(true);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return { updateElectionSettingsById, loading, success };
};

export default useUpdateElectionSettingsById;
