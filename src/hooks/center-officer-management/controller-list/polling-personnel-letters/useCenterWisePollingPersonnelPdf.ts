import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { createCenterWisePollingPersonnelPdfApi } from '@api/center-officer-management/controller-list/polling-personnel-letters/center-wise-polling-personnel-pdf';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useTranslation } from 'react-i18next';

interface Props {
  getCenterWisePollingPersonnelPdfData: ({
    searchItems,
  }: {
    searchItems: CenterOfficerManagementSearchProps;
  }) => void;
  downloadLoading: boolean;
  allDownloadLoading: boolean;
}

export const useCenterWisePollingPersonnelPdf = (): Props => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [allDownloadLoading, setAllDownloadLoading] = useState(false);

  const {
    keycloak: { token },
  } = useAuthWrapper();
  const { isAdmin, electionTypes } = useFiltersRedux();
  const { t } = useTranslation();
  const getCenterWisePollingPersonnelPdfData = async ({
    searchItems,
  }: {
    searchItems: CenterOfficerManagementSearchProps;
  }) => {
    try {
      if (searchItems?.pollingCenterIds) setDownloadLoading(true);
      else setAllDownloadLoading(true);

      if (
        isAdmin &&
        Number(searchItems?.electionTypeId) === ELECTION_INFO.UPAZILLA.ID
      ) {
        const {
          goodsDistributionDateTime,
          goodsReceiptDateTime,
          trainingDateTime,
          trainingPlace,
          trainingRoom,
          ...remainingData
        } = searchItems;

        searchItems = remainingData;
      } else if (!isAdmin) {
        const {
          goodsDistributionDateTime,
          goodsReceiptDateTime,
          trainingDateTime,
          trainingPlace,
          trainingRoom,

          ...remainingData
        } = searchItems;
        if (electionTypes?.[0]?.value === ELECTION_INFO.UPAZILLA.ID) {
          searchItems = {
            ...remainingData,
            electionTypeId: electionTypes?.[0]?.value,
          };
        }
        searchItems = {
          ...searchItems,
          electionTypeId: electionTypes?.[0]?.value,
        };
      }

      const response = await createCenterWisePollingPersonnelPdfApi({
        searchItems,
        token,
      });

      if (response?.data?.status === 200) {
        setDownloadLoading(false);
        setAllDownloadLoading(false);
        const url = window.URL.createObjectURL(response?.data?.data);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'center-wise-polling-personnel-details.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        setDownloadLoading(false);
        setAllDownloadLoading(false);
      }
    } catch (error) {
      setAllDownloadLoading(false);
      setDownloadLoading(false);
      toast.error(t('CENTER_BASED_OFFICER_LIST.DOWNLOAD_ERROR'));
    }
  };

  return {
    getCenterWisePollingPersonnelPdfData,
    downloadLoading,
    allDownloadLoading,
  };
};
