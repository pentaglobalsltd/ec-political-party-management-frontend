import { useEffect, useState } from 'react';
import { getImage } from '@api/miscellaneous/documents/get-image';

interface UseDownloadAttachFilePropType {
  documentId?: string;
  fileId?: string;
  formatId?: string | number;
  filePath?: string | number;
}

export const useImage = ({
  documentId,
  fileId,
  formatId,
  filePath,
}: UseDownloadAttachFilePropType) => {
  const [document, setDocument] = useState<string>();

  useEffect(() => {
    if (documentId) {
      getImage({ documentId, fileId, formatId, filePath }).then((res) => {
        if (res?.data?.status === 200) {
          setDocument(res?.data?.data);
        }
      });
    }
  }, [documentId, fileId, formatId, filePath]);

  return {
    document,
  };
};
