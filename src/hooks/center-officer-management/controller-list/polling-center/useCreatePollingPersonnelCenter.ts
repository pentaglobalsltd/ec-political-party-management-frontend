import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { PollingPersonnelAllocate } from '@type/center-officer-management/polling-center/polling-personnel-allocate';
import { createPollingPersonnelAllocateApi } from '@api/center-officer-management/controller-list/polling-center/create-polling-personnel-allocate';

export const useCreatePollingPersonnelCenter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createPollingPersonnelCenterData = async (
    data: PollingPersonnelAllocate,
  ) => {
    setLoading(true);
    try {
      const response = await createPollingPersonnelAllocateApi(data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setIsSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        const {
          response: { data },
        } = response as any;
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return {
    createPollingPersonnelCenterData,
    loading,
    isSuccess,
    setIsSuccess,
  };
};
