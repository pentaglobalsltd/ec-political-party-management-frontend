import { useState } from 'react';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { generateNineteenthFormPdf } from '@api/result-management/report/nineteenth-form/nineteenth-form';

export const useNineteenthFormPdfGenerator = () => {
  const [pdfBuffer, setPdfBuffer] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { keycloak } = useAuthWrapper();
  const downloadFileName = 'nineteenth-form.pdf';

  const getBufferData = async (
    electionScheduleId: string | number,
    candidateTypeId: string | number,
    data: any,
  ) => {
    setLoading(true);
    try {
      const response = await generateNineteenthFormPdf(
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
      console.error(error);
      setError({
        isError: true,
        message: 'Failed to generate PDF',
      });
    }
    setLoading(false);
  };

  const downloadNineteenthForm = () => {
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

  return {
    pdfBuffer,
    setPdfBuffer,
    loading,
    error,
    getBufferData,
    downloadNineteenthForm,
  };
};
