import { toast } from 'react-toastify';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { URLS } from '@constants/urls';
import { extractDataFromBlob } from '@utils/file';

let cancelTokenSource: CancelTokenSource | null = null;

export interface GenerateWinningCandidatesPdf {
  electionTypeId: string | number;
  electionScheduleId: string | number;
  queryParams: {
    municipalityId?: string | number;
    upazilaId?: string | number;
    unionOrWardId?: string | number;
  };
}

interface Extras extends GenerateWinningCandidatesPdf {
  token: string | undefined;
}

export const generateWinningCandidatesPdf = async ({
  electionTypeId,
  electionScheduleId,
  queryParams,
  token,
}: Extras): Promise<any> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const url = `${import.meta.env.VITE_PDF_GENERATOR_URL}${
      URLS.GET_PDF_DATA
    }${URLS.GET_WINNING_CANDIDATES_REPORT(electionScheduleId)}`;

    const reqBody = {
      electionTypeId,
    };

    const response = await axios.post(url, reqBody, {
      responseType: 'blob',
      cancelToken: cancelTokenSource.token,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    });

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
