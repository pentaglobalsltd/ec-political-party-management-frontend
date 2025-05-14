import { useState } from 'react';

import { generatePollingCenterDetailsPdf } from '@api/miscellaneous/documents/pdf-generator';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import {
  PollingCenterDetailsError,
  PollingCenterDetailsParams,
} from '@type/reports/reports-types';

export const usePollingCenterDetailsPdfGenerator = () => {
  const [pdfBuffer, setPdfBuffer] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PollingCenterDetailsError | null>(null);

  const { keycloak } = useAuthWrapper();

  const downloadFileName = 'gazetted-center-list.pdf';

  const getBufferData = async (params: PollingCenterDetailsParams) => {
    setLoading(true);
    try {
      const response = await generatePollingCenterDetailsPdf(
        params,
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

  const downloadPollingCenterDetails = () => {
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
    downloadPollingCenterDetails,
    getBufferData,
  };
};
