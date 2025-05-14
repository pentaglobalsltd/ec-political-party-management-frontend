import { useAppSelector } from '@helpers/redux';
import { getUserProfileForElectionSettingsId } from '@selectors/user-profile-for-election-settings-id-selector';

export const useGetUserProfileFromRedux = () => {
  const { userProfileForSelect } = useAppSelector<any>(
    getUserProfileForElectionSettingsId,
  );

  let userProfileDetails: any = {};
  if (Object.keys(userProfileForSelect).length > 0) {
    userProfileDetails.electionScheduleId =
      userProfileForSelect.electionScheduleId;
    userProfileDetails.electionTypeId = userProfileForSelect.electionTypeId;
    userProfileDetails.regionId = userProfileForSelect.regionId;
    userProfileDetails.zillaId = userProfileForSelect.zillaId;
    userProfileDetails.electionSettingsId =
      userProfileForSelect.electionSettingsIds[0];
  }
  return {
    userProfileDetails,
  };
};
