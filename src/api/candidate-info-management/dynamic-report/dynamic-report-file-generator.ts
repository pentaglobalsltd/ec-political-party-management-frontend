import { toast } from 'react-toastify';
import axios, { AxiosError, CancelTokenSource } from 'axios';

import { URLS } from '@constants/urls';
import { extractDataFromBlob } from '@utils/file';

interface Error {
  isError: boolean;
  message: string | null;
}

let cancelTokenSource: CancelTokenSource | null = null;

export const generateDynamicReportFile = async ({
  data,
  reportType,
  token,
}: {
  data: any;
  reportType: string;
  token: string | undefined;
}): Promise<Blob | Error | null> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_REPORT_VIEWER_SERVICE_URL
      }${URLS.GENERATE_DYNAMIC_REPORT({
        reportId: data?.reportId,
        reportType,
      })}`,
      { ...data?.mappedData },
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return null; // Return null to handle canceled request
    } else {
      console.error('Error fetching PDF data:', error);
      if (error instanceof AxiosError) {
        const errorBlobData = error?.response?.data;
        const extractError = await extractDataFromBlob(errorBlobData)
          .then((extractedData) => {
            const errorMessage = JSON.parse(extractedData);
            return {
              isError: true,
              message: errorMessage?.message,
            };
          })
          .catch((error) => {
            console.error('Error extracting data:', error);
            return null;
          });
        toast.error(extractError?.message);
        return extractError;
      }
      return null;
    }
  } finally {
    cancelTokenSource = null;
  }
};
