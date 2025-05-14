import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { BulkEdit } from '@type/vote-center-management/voter-area-type';
import { updateBulkVoterAreaApi } from '@api/vote-center-management/main-list/voter-area/update-bulk-edit';

const useVoterAreaBulkUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const updateBulkVoterArea = async (data: BulkEdit) => {
    try {
      setSuccess(false);
      setLoading(false);
      const response = await updateBulkVoterAreaApi(data);
      if (response?.data?.status !== 204) {
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

  return { updateBulkVoterArea, loading, success, setSuccess };
};

export default useVoterAreaBulkUpdate;
