import { useState } from 'react';
import { getDownloadCredentialsApi } from '@api/user-management-service/download-credentials-user-profile';

interface GetUserProfileList {
  userTypeCode: string;
  electionScheduleId?: number | string;
}

interface Props {
  getUserProfilesDownloadCredentialsData: any;
  downloadLoading: boolean;
}

export const useUserProfilesDownloadCredentials = (): Props => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const getUserProfilesDownloadCredentialsData = async ({
    userTypeCode,
    electionScheduleId,
  }: GetUserProfileList) => {
    try {
      setDownloadLoading(true);
      const response = await getDownloadCredentialsApi(
        userTypeCode,
        electionScheduleId,
      );
      if (response?.data?.status === 200) {
        setDownloadLoading(false);
        const url = window.URL.createObjectURL(response?.data?.data);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'user.zip';
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
    getUserProfilesDownloadCredentialsData,
    downloadLoading,
  };
};
