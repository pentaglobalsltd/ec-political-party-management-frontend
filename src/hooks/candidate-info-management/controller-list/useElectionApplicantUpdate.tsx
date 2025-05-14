import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { updateElectionApplicant } from '@api/candidate-info-management/election-applicant';
import { ElectionApplicantUpdateTypes } from '@type/candidate-info-management/election-applicant-types';

export const useElectionApplicantUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const electionApplicantUpdate = async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: ElectionApplicantUpdateTypes) => {
    setLoading(true);
    setSuccess(false);
    try {
      const response = await updateElectionApplicant({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      });
      if (response?.data?.status === 200) {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      } else {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      }
    } catch (error) {
      setLoading(false);
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };
  return { electionApplicantUpdate, loading, success };
};
