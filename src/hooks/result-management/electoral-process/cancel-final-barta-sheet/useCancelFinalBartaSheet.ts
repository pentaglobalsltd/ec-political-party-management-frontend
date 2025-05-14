import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateCancelFinalBartaSheet } from '@api/result-management/electoral-process/cancel-final-barta-sheet/cancel-final-barta-sheet';

interface Props {
  id: string | number;
  scheduleId: string | number;
  data: any;
}

const useCancelFinalBartaSheet = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { t } = useTranslation();

  const updateCancelFinalBartaSheetData = async ({
    id,
    scheduleId,
    data: string,
  }: Props) => {
    setUpdateSuccess(false);
    setUpdateLoading(false);
    try {
      const response = await updateCancelFinalBartaSheet({
        id,
        scheduleId,
        data: string,
      });
      if (response?.data?.status !== 200) {
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
        setUpdateLoading(true);
      } else {
        setUpdateLoading(false);
        setUpdateSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch {
      setUpdateLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };

  return {
    updateCancelFinalBartaSheetData,
    updateLoading,
    updateSuccess,
  };
};

export default useCancelFinalBartaSheet;
