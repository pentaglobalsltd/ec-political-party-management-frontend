import { toast } from 'react-toastify';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { URLS } from '@constants/urls';
import { extractDataFromBlob } from '@utils/file';

let cancelTokenSource: CancelTokenSource | null = null;

export const generateConsolidatedStatementPdf = async (
  electionScheduleId: string | number,
  candidateTypeId: string | number,
  data: any,
  token: string | undefined,
): Promise<any> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${
        URLS.GET_PDF_DATA
      }${URLS.GET_CONSOLIDATED_STATEMENT_PDF_DATA(
        electionScheduleId,
        candidateTypeId,
      )}`,
      data,
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
      return null;
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
