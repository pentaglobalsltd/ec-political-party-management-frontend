import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { apiUpdateElectionSettingsDetailsById } from '@api/election-schedule-management/election-process/election-settings-details/update-election-settings-details';
import { ElectionSettingsDetailsById } from '@type/election-declaration-management/election-process/election-settings-details';

interface Props {
  data: ElectionSettingsDetailsById;
  electionSettingsDetailsId: string | number;
}

const useUpdateElectionSettingsDetailsById = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updateElectionSettingsDetailsById = async ({
    electionSettingsDetailsId,
    data,
  }: Props) => {
    try {
      const response = await apiUpdateElectionSettingsDetailsById({
        electionSettingsDetailsId,
        data,
      });
      if (response?.data?.status !== 200) {
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
        setUpdateLoading(true);
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

  return { updateElectionSettingsDetailsById, updateLoading, updateSuccess };
};

export default useUpdateElectionSettingsDetailsById;
