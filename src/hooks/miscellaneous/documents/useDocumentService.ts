import { useState } from 'react';
import { createDocumentService } from '@api/miscellaneous/documents/document-service';
import { DocumentServiceType } from '@type/documents/document-service-type';

export const useDocumentService = () => {
  const [document, setDocument] = useState<DocumentServiceType>({});
  const [percent, setPercent] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const onUploadProgress = (progressEvent: any) => {
    const { loaded, total } = progressEvent;
    const percent = Math.floor((loaded * 100) / total);
    setPercent(percent);
  };

  const createDocumentServiceHandler = async ({
    event,
    usePublicUrl = false,
    pathId,
    category,
  }: {
    event: any;
    usePublicUrl?: boolean;
    pathId?: string | number;
    category?: string;
  }) => {
    try {
      setLoading(true);
      setSuccess(false);
      setError(false);
      const response = await createDocumentService(
        event,
        onUploadProgress,
        usePublicUrl,
        pathId,
        category,
      );
      if (response?.data?.status === 200 && response?.data) {
        const data = response?.data.data;
        setSuccess(true);
        setDocument(data);
      } else {
        setError(true);
        setSuccess(false);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(true);
      setSuccess(false);
      setErrorMessage(err?.response?.data?.message);
    }
  };

  return {
    createDocumentServiceHandler,
    document,
    percent,
    success,
    error,
    errorMessage,
    loading,
  };
};
