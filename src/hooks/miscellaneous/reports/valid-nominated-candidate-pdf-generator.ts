import { generateValidNominatedCandidatePdf } from '@api/miscellaneous/documents/pdf-generator';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { IReportsRequestPdfData } from '@type/reports/reports-types';
import { useState } from 'react';

export const useValidNominatedCandidatePdfGenerator = () => {
  const [currentPdfGeneratorData, setCurrentPdfGeneratorData] =
    useState<IReportsRequestPdfData | null>(null);
  const [generatePdfLoading, setGeneratePdfLoading] = useState<boolean>(false);

  const { keycloak } = useAuthWrapper();

  const setGenerateValidNominatedCandidatePdfRequestData = ({
    electionTypeId,
    electionScheduleId,
    candidateTypeId,
    zillaId,
    constituencyId,
    bengaliAlphabetOrder,
    candidateSerialOrder,
    nominationStatusCodes,
  }: IReportsRequestPdfData) => {
    setCurrentPdfGeneratorData({
      electionTypeId,
      electionScheduleId,
      candidateTypeId,
      zillaId,
      constituencyId,
      bengaliAlphabetOrder,
      candidateSerialOrder,
      nominationStatusCodes,
    });
  };

  const generatePdf = () => {
    setGeneratePdfLoading(true);
    currentPdfGeneratorData &&
      generateValidNominatedCandidatePdf(
        currentPdfGeneratorData,
        keycloak.token,
      ).finally(() => setGeneratePdfLoading(false));
  };

  return {
    setGenerateValidNominatedCandidatePdfRequestData,
    generatePdf,
    currentPdfGeneratorData,
    generatePdfLoading,
  };
};
