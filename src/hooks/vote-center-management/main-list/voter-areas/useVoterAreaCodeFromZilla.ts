import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { voterAreaCodeFromZillaApi } from '@api/vote-center-management/main-list/voter-area/voter-area-code-from-zilla';

interface VoterAreaCodeFromZillaProps {
  zillaId: string | number;
  areaCode: string | number;
}

interface Props {
  getVoterAreaCodeFromZillaData: ({
    zillaId,
    areaCode,
  }: VoterAreaCodeFromZillaProps) => void;
  loading: boolean;
  success: boolean;
  setSuccess: (data: boolean) => void;
}

export const useVoterAreaCodeFromZilla = (): Props => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getVoterAreaCodeFromZillaData = async ({
    zillaId,
    areaCode,
  }: VoterAreaCodeFromZillaProps) => {
    try {
      setLoading(true);
      setSuccess(true);
      const response = await voterAreaCodeFromZillaApi({ areaCode, zillaId });
      if (response?.data?.status === 200) {
        const existingVoterAreaCodeLength =
          response?.data?.data?.voterAreas.length;
        if (existingVoterAreaCodeLength !== 0) {
          toast.error(t('TOAST_MESSAGE.VOTER_AREA_CODE_EXISTS'));
        } else {
          setSuccess(false);
        }
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getVoterAreaCodeFromZillaData,
    loading,
    success,
    setSuccess,
  };
};
