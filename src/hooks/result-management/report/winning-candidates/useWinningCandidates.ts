import { useState } from 'react';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import {
  GenerateWinningCandidatesPdf,
  generateWinningCandidatesPdf,
} from '@api/result-management/report/winning-candidates/winning-candidate';

export const useWinningCandidatesPdfGenerator = () => {
  const [pdfBuffer, setPdfBuffer] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { keycloak } = useAuthWrapper();
  const downloadFileName = 'winning-candidates.pdf';

  const getBufferData = async ({
    electionTypeId,
    electionScheduleId,
    queryParams,
  }: GenerateWinningCandidatesPdf) => {
    setLoading(true);
    try {
      const response = await generateWinningCandidatesPdf({
        electionTypeId,
        electionScheduleId,
        queryParams,
        token: keycloak?.token,
      });
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
        message: 'PDF তৈরি করতে ব্যর্থ হয়েছে৷',
      });
    }
    setLoading(false);
  };

  const downloadWinningCandidates = () => {
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
    downloadWinningCandidates,
  };
};
