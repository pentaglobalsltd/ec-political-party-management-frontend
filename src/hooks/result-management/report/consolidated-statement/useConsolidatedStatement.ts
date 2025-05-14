import { useState } from 'react';

import { generateConsolidatedStatementPdf } from '@api/result-management/report/consolidated-statement/consolidated-statement';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

export const useConsolidatedStatementPdfGenerator = () => {
  const [pdfBuffer, setPdfBuffer] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { keycloak } = useAuthWrapper();
  const downloadFileName = 'center-wise-result.pdf';

  const getBufferData = async (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
    data: any,
  ) => {
    setLoading(true);
    try {
      const response = await generateConsolidatedStatementPdf(
        electionScheduleId,
        candidateTypeId,
        data,
        keycloak?.token,
      );
      if (response instanceof Blob) {
        setPdfBuffer(response);
        setError(null);
      } else {
        setPdfBuffer(null);
        setError(response);
      }
    } catch (error) {
      setError({
        isError: true,
        message: 'Failed to generate PDF',
      });
    }
    setLoading(false);
  };

  const downloadConsolidatedStatement = (downloadFrom = 'view') => {
    if (!pdfBuffer) return;

    if (pdfBuffer instanceof Blob) {
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = downloadFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  const downloadConsolidatedStatementFromModal = async (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
    data: any,
  ) => {
    setDownloadLoading(true);
    try {
      const response = await generateConsolidatedStatementPdf(
        electionScheduleId,
        candidateTypeId,
        data,
        keycloak?.token,
      );
      if (response instanceof Blob) {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setPdfBuffer(null);
        setError(response);
      }
    } catch (error) {
      setError({
        isError: true,
        message: 'Failed to generate PDF',
      });
    }
    setDownloadLoading(false);
  };

  return {
    pdfBuffer,
    setPdfBuffer,
    loading,
    downloadLoading,
    error,
    getBufferData,
    downloadConsolidatedStatement,
    downloadConsolidatedStatementFromModal,
  };
};
