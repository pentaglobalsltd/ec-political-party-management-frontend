import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateSubDistrict } from '@api/election-schedule-management/main-list/sub-district/sub-districts';
import { useTranslation } from 'react-i18next';

export const useUpdateSubdistrict = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const editSubdistrict = async (id: string | number, data: any) => {
    setLoading(true);
    try {
      const response = await updateSubDistrict(id, data);
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { editSubdistrict, loading, success };
};
