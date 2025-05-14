import { useState } from 'react';
import { ElectionSettingsDetailsGet } from '@type/election-declaration-management/election-process/election-settings-details';
import { apiGetElectionSettingsDetails } from '@api/election-schedule-management/election-process/election-settings-details/get-election-settings-details';

export const useGetElectionSettingsDetails = () => {
  const [electionSettingsDetails, setElectionSettingsDetails] = useState<
    ElectionSettingsDetailsGet[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getElectionSettingsDetailsData = async ({
    page = 0,
    size = 10,
    searchItems,
  }: {
    page?: number;
    size?: number;
    searchItems?: {
      electionSettingsId?: string | number;
      electionScheduleId?: string | number;
      candidateTypeId?: string | number;
      zillaId?: string | number;
      upazilaId?: string | number;
      municipalityId?: string | number;
      unionOrWardId?: string | number;
      electionAreaReorganized?: string;
      isCaseAvailable?: string;
      isActive?: string;
    };
  }) => {
    try {
      setLoading(true);

      const response = await apiGetElectionSettingsDetails({
        searchItems,
        page,
        size,
      });
      const dataArray: any[] = response.data?.data?.electionSettingsDetails;
      if (response?.data?.status === 200) {
        setElectionSettingsDetails(dataArray);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return {
    electionSettingsDetails,
    getElectionSettingsDetailsData,
    loading,
    activePage,
    totalPage,
  };
};
