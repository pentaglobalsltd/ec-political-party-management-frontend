import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DeletePollingCenterApi } from '@type/vote-center-management/delete-polling-center-types';
import { deletePollingCenterApi } from '@api/vote-center-management/center-management/polling-center-list/delete-polling-center';

interface HookReturnType {
  deletePollingCenter: ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: DeletePollingCenterApi) => void;

  loading: boolean;
  success: boolean;
}

const useDeletePollingCenter = (): HookReturnType => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const deletePollingCenter = async ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
  }: DeletePollingCenterApi) => {
    try {
      setLoading(true);
      setSuccess(false);

      const response = await deletePollingCenterApi({
        electionSettingsId,
        unionOrWardId,
        pollingCenterId,
      });
      if (response?.data?.status === 204) {
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      setLoading(false);
    }
  };

  return { deletePollingCenter, loading, success };
};

export default useDeletePollingCenter;
