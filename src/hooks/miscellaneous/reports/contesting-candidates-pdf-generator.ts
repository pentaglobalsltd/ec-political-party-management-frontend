import { useState } from 'react';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { IReportsRequestPdfData } from '@type/reports/reports-types';
import { generateContestingCandidatesPdf } from '@api/miscellaneous/documents/pdf-generator';

export const useContestingCandidatesPdfGenerator = () => {
  const { keycloak } = useAuthWrapper();

  const [generatePdfLoading, setGeneratePdfLoading] = useState<boolean>(false);

  const generatePdf = ({
    electionTypeId,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
    bengaliAlphabetOrder,
    candidateSerialOrder,
    nominationStatusCodes,
    voterCount,
  }: IReportsRequestPdfData) => {
    setGeneratePdfLoading(true);

    generateContestingCandidatesPdf(
      {
        electionTypeId,
        electionScheduleId,
        candidateTypeId,
        zillaId,
        constituencyId,
        bengaliAlphabetOrder,
        candidateSerialOrder,
        nominationStatusCodes,
        voterCount,
      },
      keycloak.token,
    ).finally(() => setGeneratePdfLoading(false));
  };

  return {
    generatePdf,
    generatePdfLoading,
  };
};
