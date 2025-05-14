import { generatePdf } from '@api/miscellaneous/documents/pdf-generator';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { NominationAffidavitPdf } from '@type/reports/reports-types';
import { useState } from 'react';

export const usePdfGenerator = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { keycloak } = useAuthWrapper();

  const generateNominationAffidavitPdf = ({
    electionSettingsId,
    candidateElectionDetailsId,
    reportType,
  }: NominationAffidavitPdf) => {
    setLoading(true);

    generatePdf(
      {
        electionSettingsId,
        candidateElectionDetailsId,
        reportType,
      },
      keycloak.token,
    ).finally(() => {
      setLoading(false);
    });
  };

  return {
    generateNominationAffidavitPdf,
    loading,
  };
};
