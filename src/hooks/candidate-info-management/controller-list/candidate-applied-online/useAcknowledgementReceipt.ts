import { useState } from 'react';
import { AcknowledgementPdfType } from '@type/reports/reports-types';
import { getAcknowledgementReceiptApi } from '@api/candidate-info-management/acknowledgemnet-receipt-pdf';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

interface Props {
  getAcknowledgementReceiptData: ({
    electionSettingsId,
    electionDetailsId,
    serialNo,
    proposedBy,
    proposedDate,
    proposedTime,
    roSelectedDate,
    roSelectedTime,
    roSelectedPlace,
  }: AcknowledgementPdfType) => void;
  downloadLoading: boolean;
}

export const useAcknowledgementReceipt = (): Props => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const {
    keycloak: { token },
  } = useAuthWrapper();

  const getAcknowledgementReceiptData = async ({
    electionSettingsId,
    electionDetailsId,
    serialNo,
    proposedBy,
    proposedDate,
    proposedTime,
    roSelectedDate,
    roSelectedTime,
    roSelectedPlace,
  }: AcknowledgementPdfType) => {
    try {
      setDownloadLoading(true);

      const response = await getAcknowledgementReceiptApi({
        electionSettingsId,
        electionDetailsId,
        serialNo,
        proposedBy,
        proposedDate,
        proposedTime,
        roSelectedDate,
        roSelectedTime,
        roSelectedPlace,
        token,
      });
      if (response?.data?.status === 200) {
        setDownloadLoading(false);
        const url = window.URL.createObjectURL(response?.data?.data);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'acknowledgement-receipt.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        setDownloadLoading(false);
      }
    } catch (error) {
      setDownloadLoading(false);
    }
  };

  return {
    getAcknowledgementReceiptData,
    downloadLoading,
  };
};
