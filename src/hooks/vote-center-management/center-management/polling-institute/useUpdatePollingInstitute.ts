import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updatePollingInstitute } from '@api/vote-center-management/center-management/polling-institute/update-polling-institute';

const useUpdatePollingInstitute = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updatePollingInstituteById = async (id: string | number, data: any) => {
    try {
      setUpdateLoading(true);
      const response = await updatePollingInstitute(id, data);
      if (response?.data?.status !== 200) {
        setUpdateLoading(false);
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

  return { updatePollingInstituteById, updateLoading, updateSuccess };
};

export default useUpdatePollingInstitute;
