import axios, { AxiosError, CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';

import { URLS } from '@constants/urls';
import {
  IBartaSheetData,
  IBartaSheetError,
  IBartaSheetParams,
  IReportElectedCandidateRequestPdfData,
  IReportsRequestPdfData,
  NSCReportsRequestPdfData,
  NominationAffidavitPdf,
  PollingCenterDetailsParams,
} from '@type/reports/reports-types';
import { extractDataFromBlob } from '@utils/file';
import { encodeQuery } from '@pentabd/ui';

let cancelTokenSource: CancelTokenSource | null = null;

export const generatePdf = async (
  data: NominationAffidavitPdf,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
    toast.error('Error fetching PDF data');
  } finally {
    cancelTokenSource = null;
  }
};

// প্রার্থীর যোগাযোগ সংক্রান্ত তথ্য
export const generateCandidatesCommunicationPdf = async (
  data: IReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_CANDIDATES_COMMUNICATION_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// মনোনয়ন পত্র দাখিলকারীদের তথ্য
export const generateNominationPaperInformationPdf = async (
  data: IReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_NOMINATION_PAPER_INFORMATION_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// বৈধভাবে মনোনীত প্রার্থীগণের তালিকা
export const generateValidNominatedCandidatePdf = async (
  data: IReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_VALID_NOMINATED_CANDIDATE_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// বিনা প্রতিদ্বন্দ্বিতায় নির্বাচিত প্রার্থীর বিবরণী
export const generateElectedCandidatePdf = async (
  data: IReportElectedCandidateRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_ELECTED_CANDIDATES_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// প্রতিদ্বন্দ্বী প্রার্থীগণের তালিকা
export const generateContestingCandidatesPdf = async (
  data: IReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_CONTESTING_CANDIDATES_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// সি আই বি রিপোর্ট
export const generateCIBReportPdf = async (
  data: IReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_CIB_REPORT_PDF_DATA
      }`,
      data,
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// নির্বাচনী এলাকা ভিত্তিক মনোনয়নের স্ট্যাটাস গণনা প্রতিবেদন
export const generateCWNSCReportPdf = async (
  data: NSCReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_ELECTION_SCHEDULE_REPORT
      }/${data.electionScheduleId}${URLS.GET_CWNSC_REPORT_PDF_DATA}`,
      '',
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// রাজনৈতিক দল ভিত্তিক মনোনয়নের স্ট্যাটাস গণনা প্রতিবেদন
export const generatePPWNSCReportPdf = async (
  data: NSCReportsRequestPdfData,
  token: string | undefined,
): Promise<void> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${URLS.GET_PDF_DATA}${
        URLS.GET_ELECTION_SCHEDULE_REPORT
      }/${data.electionScheduleId}${URLS.GET_PPWNSC_REPORT_PDF_DATA}`,
      '',
      {
        responseType: 'blob',
        cancelToken: cancelTokenSource.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const file = new Blob([response.data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);

    const pdfWindow = window.open(fileURL, '_blank');

    if (!pdfWindow) {
      console.error('Failed to open PDF window.');
    }
  } catch (error) {
    console.error('Error fetching PDF data:', error);
  } finally {
    cancelTokenSource = null;
  }
};

// বার্তা প্রেরণ শীট প্রস্তুত
export const generateBartaSheetPdf = async (
  params: IBartaSheetParams,
  data: IBartaSheetData,
  token: string | undefined,
): Promise<Blob | IBartaSheetError | null> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${
        URLS.GET_PDF_DATA
      }${URLS.GET_BARTA_SHEET_PDF_DATA(params)}`,
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

// polling center list
export const generatePollingCenterDetailsPdf = async (
  params: PollingCenterDetailsParams,
  token: string | undefined,
): Promise<Blob | IBartaSheetError | null> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${
        URLS.GET_PDF_DATA
      }${encodeQuery(URLS.GET_POLLING_CENTER_DETAILS_PDF_DATA(params), {
        electionSettingsId: params.electionSettingsId as number,
      })}`,
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

// polling center summary
export const generatePollingCenterDetailsSummaryPdf = async (
  params: PollingCenterDetailsParams,
  token: string | undefined,
): Promise<Blob | IBartaSheetError | null> => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Request canceled');
  }
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_PDF_GENERATOR_URL}${
        URLS.GET_PDF_DATA
      }${encodeQuery(URLS.GET_POLLING_CENTER_DETAILS_SUMMARY_PDF_DATA(params), {
        electionSettingsId: params.electionSettingsId as number,
      })}`,
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
