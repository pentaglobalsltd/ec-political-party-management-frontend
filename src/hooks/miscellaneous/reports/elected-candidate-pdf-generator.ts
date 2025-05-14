import { useState } from 'react';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { generateElectedCandidatePdf } from '@api/miscellaneous/documents/pdf-generator';
import { IReportElectedCandidateRequestPdfData } from '@type/reports/reports-types';

export const useElectedCandidatePdfGenerator = () => {
  const { keycloak } = useAuthWrapper();
  const [generatePdfLoading, setGeneratePdfLoading] = useState<boolean>(false);

  const generatePdf = ({
    electionTypeId,
    electionSettingsId,
    electionScheduleId,
    candidateTypeId,
    candidateSerialOrder,
    nominationStatusCodes,
  }: IReportElectedCandidateRequestPdfData) => {
    setGeneratePdfLoading(true);

    generateElectedCandidatePdf(
      {
        electionTypeId,
        electionSettingsId,
        electionScheduleId,
        candidateTypeId,
        candidateSerialOrder,
        nominationStatusCodes,
      },
      keycloak.token,
    ).finally(() => setGeneratePdfLoading(false));
  };

  return {
    generatePdf,
    generatePdfLoading,
  };
};
