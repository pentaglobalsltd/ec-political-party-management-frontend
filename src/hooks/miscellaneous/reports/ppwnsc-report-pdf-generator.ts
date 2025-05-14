import { generatePPWNSCReportPdf } from '@api/miscellaneous/documents/pdf-generator';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { NSCReportsRequestPdfData } from '@type/reports/reports-types';
import { useState } from 'react';

export const usePPWNSCReportPdfGenerator = () => {
  const [currentPdfGeneratorData, setCurrentPdfGeneratorData] =
    useState<NSCReportsRequestPdfData | null>(null);

  const [generatePdfLoading, setGeneratePdfLoading] = useState<boolean>(false);

  const { keycloak } = useAuthWrapper();

  const setGeneratePPWNSCReportPdfRequestData = ({
    electionScheduleId,
  }: NSCReportsRequestPdfData) => {
    setCurrentPdfGeneratorData({
      electionScheduleId,
    });
  };

  const generatePdf = () => {
    setGeneratePdfLoading(true);
    currentPdfGeneratorData &&
      generatePPWNSCReportPdf(currentPdfGeneratorData, keycloak.token).finally(
        () => setGeneratePdfLoading(false),
      );
  };

  return {
    generatePdf,
    setGeneratePPWNSCReportPdfRequestData,
    currentPdfGeneratorData,
    generatePdfLoading,
  };
};
