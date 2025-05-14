import { useState } from 'react';
import { apiGetElectionSettingsDetailsById } from '@api/election-schedule-management/election-process/election-settings-details/get-election-settings-details-byId';
import { ElectionSettingsDetailsById } from '@type/election-declaration-management/election-process/election-settings-details';

const useGetElectionSettingsDetailsById = () => {
  const [electionSettingsDetails, setElectionSettingsDetails] =
    useState<ElectionSettingsDetailsById>({} as ElectionSettingsDetailsById);

  const getElectionSettingsDetailsByIdData = async (
    electionSettingsDetailsId: string | number,
  ) => {
    if (electionSettingsDetailsId) {
      try {
        const response = await apiGetElectionSettingsDetailsById(
          electionSettingsDetailsId,
        );
        if (response?.data?.status === 200) {
          setElectionSettingsDetails(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    electionSettingsDetails,
    getElectionSettingsDetailsByIdData,
  };
};

export default useGetElectionSettingsDetailsById;
