import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { updateCandidateTypeApi } from '@api/candidate-info-management/nomination-list/updateCandidateType';
import { CandidateTypeUpdateValueType } from '@containers/candidate-info-management/controller-list/candidate-management/constants';

export const useUpdateCandidateType = () => {
  const { t } = useTranslation();
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);

  const updateCandidateType = async ({
    electionSettingsId,
    candidateElectionDetailsId,
    candidateTypeId,
  }: CandidateTypeUpdateValueType) => {
    try {
      setIsUpdateLoading(true);
      const response = await updateCandidateTypeApi({
        electionSettingsId,
        candidateElectionDetailsId,
        candidateTypeId,
      });
      setIsUpdateLoading(false);
      if (response?.data?.status === 204) {
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
        setIsUpdateSuccess(true);
      } else {
        setIsUpdateLoading(false);
      }
    } catch (err: any) {
      setIsUpdateLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };
  return {
    updateCandidateType,
    isUpdateLoading,
    isUpdateSuccess,
  };
};
