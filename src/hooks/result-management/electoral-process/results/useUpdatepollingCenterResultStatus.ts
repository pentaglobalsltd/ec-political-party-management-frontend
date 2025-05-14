import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updatePollingCenterResultStatusAPI } from '@api/result-management/electoral-process/results/update-polling-center-reult-status';
import { POLLING_CENTER_RESULT_STATUS } from '@constants/polling-center-results';

interface PollingCenterResultStatusProps {
  data: { comment?: string; status: string };
  resultId: number | string;
  centerId: number | string;
}

export const useUpdatePollingCenterResultStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const updatePollingCenterResultStatus = async ({
    data,
    resultId,
    centerId,
  }: PollingCenterResultStatusProps) => {
    try {
      setLoading(true);
      setIsSuccess(false);
      const response = await updatePollingCenterResultStatusAPI(
        data,
        resultId,
        centerId,
      );
      if (response?.data?.status === 200) {
        setLoading(false);
        setIsSuccess(true);

        if (data?.status === POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ARO) {
          toast.success(t('RESULTS.SUCCESS_TOAST_REJECT_BUTTON'));
        } else if (
          data?.status === POLLING_CENTER_RESULT_STATUS.APPROVED_BY_ARO
        ) {
          toast.success(t('RESULTS.SUCCESS_TOAST_APPROVE_BUTTON'));
        } else if (
          data?.status === POLLING_CENTER_RESULT_STATUS.RETURNED_BY_ADMIN
        ) {
          toast.success(t('RESULTS.SUCCESS_TOAST_REJECT_BUTTON'));
        } else if (
          data?.status === POLLING_CENTER_RESULT_STATUS.REQUESTED_BY_RO
        ) {
          toast.success(t('RESULTS.SUCCESS_TOAST_RO_REQUEST_BUTTON'));
        }
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
    updatePollingCenterResultStatus,
    loading,
    isSuccess,
    setIsSuccess,
  };
};
