import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { deleteDynamicReportById } from '@api/candidate-info-management/dynamic-report/dynamic-report-delete-by-id';

interface HookReturnType {
  isSuccess: boolean;
  isLoading: boolean;
  deleteDynamicReportByIdData: (reportId: number) => void;
}

const useDynamicReportDeleteById = (): HookReturnType => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteDynamicReportByIdData = async (reportId: number) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const response = await deleteDynamicReportById(reportId);

      if (response?.data?.status === 204) {
        setIsSuccess(true);
        setIsLoading(false);
        toast.success(t('TOAST_MESSAGE.DELETE_SUCCESS_MESSAGE'));
      } else {
        setIsLoading(false);
        toast.error(t('TOAST_MESSAGE.DELETE_ERROR_MESSAGE'));
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSuccess,
    isLoading,
    deleteDynamicReportByIdData,
  };
};

export default useDynamicReportDeleteById;
