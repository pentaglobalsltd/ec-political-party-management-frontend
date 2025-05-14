import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { createPollingInstitute } from '@api/vote-center-management/center-management/polling-institute/create-polling-institute';

const useCreatePollingInstitute = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const { t } = useTranslation();

  const pollingInstituteCreate = async (data: any) => {
    try {
      setCreateLoading(true);
      const response = await createPollingInstitute(data);
      if (response?.data?.status === 201) {
        setCreateLoading(false);
        setCreateSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setCreateLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setCreateLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return { pollingInstituteCreate, createLoading, createSuccess };
};

export default useCreatePollingInstitute;
