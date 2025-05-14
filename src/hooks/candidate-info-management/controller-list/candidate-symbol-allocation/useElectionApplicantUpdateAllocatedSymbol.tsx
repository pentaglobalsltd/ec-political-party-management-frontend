import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ElectionApplicantUpdateTypes } from '@type/candidate-info-management/election-applicant-types';
import { updateElectionApplicantAllocatedSymbol } from '@api/candidate-info-management/election-applicant';

export const useElectionApplicantUpdateCandidateSymbol = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const electionApplicantUpdateAllocatedSymbol = async ({
    electionSettingsId,
    candidateElectionDetailsId,
    data,
  }: ElectionApplicantUpdateTypes) => {
    setLoading(true);
    try {
      const response = await updateElectionApplicantAllocatedSymbol({
        electionSettingsId,
        candidateElectionDetailsId,
        data,
      });
      if (response?.data?.status !== 200) {
        setLoading(false);
        toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
      } else {
        setLoading(false);
        setSuccess(true);
        toast.success(t('TOAST_MESSAGE.UPDATE_SUCCESS_MESSAGE'));
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.UPDATE_ERROR_MESSAGE'));
    }
  };
  return { electionApplicantUpdateAllocatedSymbol, loading, success };
};
