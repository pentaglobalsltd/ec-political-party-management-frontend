import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { electionExpensePdf } from '@api/result-management/report/electionExpense';

export const useElectionExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    keycloak: { token },
  } = useAuthWrapper();

  const { t } = useTranslation();

  const getElectionExpense = async ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: {
    electionSettingsId?: number;
    candidateElectionDetailsId?: number;
  }) => {
    try {
      setLoading(true);
      const response = await electionExpensePdf(
        token,
        electionSettingsId,
        candidateElectionDetailsId,
      );
      if (response?.data?.status === 200) {
        setLoading(false);

        const url = window.URL.createObjectURL(response?.data?.data);
        window.open(url, '_blank');
      }
    } catch (error) {
      toast.error(t('TOAST_MESSAGE.CREATE_ERROR_MESSAGE'));
      setLoading(false);
    }
  };

  return {
    getElectionExpense,
    loading,
  };
};
