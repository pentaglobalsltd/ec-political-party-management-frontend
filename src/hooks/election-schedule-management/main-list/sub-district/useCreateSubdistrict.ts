import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ElectionSchedulesSubDistrict } from '@type/election-schedule-sub-district-types';
import { createSubdistrict } from '@api/election-schedule-management/main-list/sub-district/sub-districts';

export const useCreateSubdistrict = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const subdistrictCreate = async (data: ElectionSchedulesSubDistrict) => {
    setLoading(true);
    try {
      const response = await createSubdistrict({
        data,
      });
      if (response?.data?.status === 201) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.CREATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch {
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };
  return { subdistrictCreate, loading, success };
};
