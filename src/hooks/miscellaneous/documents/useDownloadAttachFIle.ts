import { useState } from 'react';
import { toast } from 'react-toastify';

import { downloadAttachFile } from '@api/miscellaneous/documents/attach-file';
import { DownloadFileIdType } from '@type/documents/attach-file';

export const useDownloadAttachFile = () => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();

  const downloadAttachFileHandler = async ({
    documentId,
    fileId,
    formatId,
    fileType,
    generateLinkOnly = false,
    filePath,
  }: DownloadFileIdType) => {
    setLoading(true);
    try {
      const res = await downloadAttachFile({
        documentId,
        fileId,
        formatId,
        filePath,
      });
      if (res?.data?.status === 200) {
        setLoading(false);

        // for previewing in new window
        if (formatId === 1) {
          const url = window.URL.createObjectURL(res?.data?.data);
          window.open(url, '_blank');
        }

        // for downloading and opening the pdf in a new window
        if (formatId === 2 && !generateLinkOnly) {
          if (fileType === 'application/pdf') {
            const file = new Blob([res?.data?.data], {
              type: 'application/pdf',
            });
            const fileURL = URL.createObjectURL(file);

            window.open(fileURL, '_blank');
          } else if (fileType === 'image/jpg' || fileType === 'image/png') {
            const file = URL.createObjectURL(res?.data?.data);
            const a = document.createElement('a');
            a.href = file;
            a.download = fileType === 'image/png' ? 'Image.png' : 'image/jpg';
            a.click();
          }
        }

        // for previewing the pdf in current window
        if (formatId === 2 && generateLinkOnly) {
          if (fileType === 'application/pdf') {
            const file = new Blob([res?.data?.data], {
              type: 'application/pdf',
            });
            const fileURL = URL.createObjectURL(file);

            setFileUrl(fileURL);
          }
        }
      } else {
        setLoading(false);
        toast.error('ফাইল ডাউনলোড সম্ভব হয়নি। কিছুক্ষন পর আবার চেষ্টা করুন।');
      }
    } catch (error) {
      setLoading(false);
      toast.error('ফাইল ডাউনলোড সম্ভব হয়নি। কিছুক্ষন পর আবার চেষ্টা করুন।');
    }
  };

  const resetFileUrl = () => setFileUrl(undefined);

  return {
    downloadAttachFileHandler,
    fileUrl,
    loading,
    resetFileUrl,
  };
};
