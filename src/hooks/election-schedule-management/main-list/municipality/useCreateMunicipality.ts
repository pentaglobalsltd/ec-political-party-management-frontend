import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createNewMunicipality } from '@api/election-schedule-management/main-list/municipality/municipalities';
import { CreateMunicipalityType } from '@type/election-declaration-management/main-list/municipality/municipality-type';

export const useCreateMunicipality = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const createMunicipality = async (data: CreateMunicipalityType) => {
    setLoading(true);
    try {
      const response = await createNewMunicipality({
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
  return { createMunicipality, loading, success };
};
