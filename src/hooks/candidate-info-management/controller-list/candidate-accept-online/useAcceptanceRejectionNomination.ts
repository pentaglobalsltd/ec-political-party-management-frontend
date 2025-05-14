import { useState } from 'react';
import { getAcceptanceRejectionNominationPdfApi } from '@api/candidate-info-management/acceptance-rejection-nomination-pdf';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

interface Props {
  getAcceptanceRejectionNominationPdfData: (obj: {
    electionTypeId: number;
    candidateTypeId: number;
    upazilaNameBn?: string;
    candidateName?: string;
  }) => void;
  downloadLoading: boolean;
}

export const useAcceptanceRejectionNominationPdf = (): Props => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const {
    keycloak: { token },
  } = useAuthWrapper();

  const getAcceptanceRejectionNominationPdfData = async ({
    electionTypeId,
    candidateTypeId,
    upazilaNameBn,
    candidateName,
  }: {
    electionTypeId: number;
    candidateTypeId: number;
    upazilaNameBn?: string;
    candidateName?: string;
  }) => {
    try {
      setDownloadLoading(true);
      const response = await getAcceptanceRejectionNominationPdfApi({
        token,
        electionTypeId,
        candidateTypeId,
        upazilaNameBn,
        candidateName,
      });
      if (response?.data?.status === 200) {
        setDownloadLoading(false);
        const url = window.URL.createObjectURL(response?.data?.data);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'acceptance-rejection-nomination.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        setDownloadLoading(false);
      }
    } catch (error) {
      console.log('error');
      setDownloadLoading(false);
    }
  };

  return {
    getAcceptanceRejectionNominationPdfData,
    downloadLoading,
  };
};
