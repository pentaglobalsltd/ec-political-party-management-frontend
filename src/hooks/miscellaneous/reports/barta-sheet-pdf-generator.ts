import { useState } from 'react';

import { generateBartaSheetPdf } from '@api/miscellaneous/documents/pdf-generator';
import { USER_TYPES } from '@constants/user-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import {
  IBartaSheetData,
  IBartaSheetError,
  IBartaSheetParams,
} from '@type/reports/reports-types';
import { USER_ROLE_TYPE } from '@containers/user-management/controller-list/constants';

export const useBartaSheetPdfGenerator = () => {
  const [pdfBuffer, setPdfBuffer] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IBartaSheetError | null>(null);

  const { keycloak } = useAuthWrapper();
  const userType = keycloak.tokenParsed?.userType;

  const downloadFileName =
    userType === USER_TYPES.RETURNING_OFFICER
      ? 'RO_barta_sheet.pdf'
      : userType === USER_TYPES.ASSISTANT_RETURNING_OFFICER
      ? 'ARO_barta_sheet.pdf'
      : 'barta_sheet.pdf';

  const downloadFileNameForAdmin = (userTypeCodeFromAdmin?: string) => {
    return userTypeCodeFromAdmin === USER_ROLE_TYPE.RETURNING_OFFICER
      ? 'RO_barta_sheet.pdf'
      : 'ARO_barta_sheet.pdf';
  };

  const getBufferData = async (
    params: IBartaSheetParams,
    data: IBartaSheetData,
  ) => {
    setLoading(true);
    try {
      const response = await generateBartaSheetPdf(
        params,
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

  const downloadBartaSheet = (userTypeCodeFromAdmin?: string) => {
    if (!pdfBuffer) return;

    if (pdfBuffer instanceof Blob) {
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      if (userTypeCodeFromAdmin) {
        a.download = downloadFileNameForAdmin(userTypeCodeFromAdmin);
      } else {
        a.download = downloadFileName;
      }
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
    downloadBartaSheet,
    getBufferData,
  };
};
