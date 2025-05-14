import { useEffect } from 'react';
import useCandidateTypes from '@hooks/miscellaneous/master-hook/candidate-type/useCandidateType';
import useElectionSchedules from '@hooks/miscellaneous/core-hook/election-schedule/useElectionSchedules';
import useElectionTypesMaster from '@hooks/miscellaneous/master-hook/election-type/useElectionTypesMaster';
import { SelectOptionArray } from '@type/selection-option-type';
import useNominationStatuses from '@hooks/candidate-info-management/controller-list/nomination-status/useNominationStatuses';
import { useElectionAreaReorganized } from '@hooks/election-schedule-management/election-process/election-area-reorganized/useElectionAreaReorganized';
import useUserTypesList from '@hooks/user-management/useUserTypesList';
import useElectionScheduleUserTypesList from '@hooks/user-management/useElectionScheduleUserTypes';
import useElectionSchedulesCandidateTypeConstituencies from '@hooks/miscellaneous/core-hook/constituency/useCandidateTypeConstituencies';
import useElectionSchedulesCandidateTypeZillas from '@hooks/miscellaneous/core-hook/zilla/useCandiateTypeZillas';
import useElectionTypesCore from '@hooks/miscellaneous/core-hook/election-type/useElectionTypesCore';
import useElectionSchedulesZillas from '@hooks/miscellaneous/core-hook/zilla/useElecionScheduleZillas';
import useResultStatusListSelect from '@hooks/result-management/useResultStatusListSelect';
import useGetMessageSendStatusSelect from '@hooks/result-management/useGetMessageSendStatusSelect';
import { useUserProfileLogInId } from '@hooks/user-management/useGetUserProfileListLoginId';
import useDraftResultStatusListSelect from '@hooks/result-management/useDraftResultStatusListSelect';
import { SORT_BY, SORT_ORDER } from '@components/application-search/constants';

interface UseNominationListSearchTypes {
  [name: string]: SelectOptionArray[];
}
interface UseNominationListSearchPropTypes {
  electionTypeWatch?: number | string;
  electionScheduleWatch?: number | string;
  districtWatch?: number;
  candidateTypeWatch?: number;
  userType?: string;
  isActiveElectionSchedule?: boolean;
  electionScheduleUserWatch?: string | number;
  userTypeCodes?: string;
  constituencyElectionSettingsWatch?: string | number;
  inputs?: {
    electionType?: boolean;
    candidateManagementElectionType?: boolean;
    electionName?: boolean;
    candidateType?: boolean;
    division?: boolean;
    ScheduleDistrict?: boolean;
    electionNameDistrict?: boolean;
    district?: boolean;
    constituency?: boolean;
    constituencyValueElectionSettings?: boolean; // use it
    status?: boolean;
    seat?: boolean;
    rearrangeSeat?: boolean;
    case?: boolean;
    instituteName?: boolean;
    electionScheduleUser?: boolean;
    user?: boolean;
    resultStatus?: boolean;
    draftResultStatus?: boolean;
    messageSendStatus?: boolean;
    userTypeOperator?: boolean;
    operatorLogInId?: boolean;
  };
}
export const useNominationListSearch = ({
  electionTypeWatch,
  electionScheduleWatch,
  districtWatch,
  candidateTypeWatch,
  inputs,
  userType,
  isActiveElectionSchedule,
  electionScheduleUserWatch,
  userTypeCodes,
  constituencyElectionSettingsWatch,
}: UseNominationListSearchPropTypes): UseNominationListSearchTypes => {
  const { electionTypesMaster, getElectionTypesMasterData } =
    useElectionTypesMaster();
  const { electionTypesCore, getElectionTypesCoreData } =
    useElectionTypesCore();
  const { electionSchedules, getElectionSchedulesData } = useElectionSchedules(
    isActiveElectionSchedule ? true : false,
  );
  const { electionCandidateTypes, getElectionCandidateTypesData } =
    useCandidateTypes();
  const {
    candidateTypeDistrict,
    getElectionSchedulesCandidateTypeDistrictData,
  } = useElectionSchedulesCandidateTypeZillas();
  const { electionSchedulesZillas, getElectionSchedulesDistrictData } =
    useElectionSchedulesZillas();
  const {
    constituencies,
    getElectionSchedulesCandidateTypeConstituenciesData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  // election settings
  const {
    constituencies: constituenciesElectionSettings,
    getElectionSchedulesCandidateTypeConstituenciesData:
      getConstituenciesElectionSettingsData,
  } = useElectionSchedulesCandidateTypeConstituencies();

  const { nominationStatuses, getNominationStatusData } = useNominationStatuses(
    { isActive: true },
  );
  const { electionAreaReorganized, getElectionAreaReorganizedData } =
    useElectionAreaReorganized();
  const { getUserTypesData, userTypes } = useUserTypesList();
  const { electionScheduleUserTypes, getElectionScheduleUserTypesData } =
    useElectionScheduleUserTypesList();

  const { resultStatuses, getResultStatuses } = useResultStatusListSelect();
  const { draftResultStatuses, getDraftResultStatuses } =
    useDraftResultStatusListSelect();
  const { messageSendStatuses, getMessageSendStatuses } =
    useGetMessageSendStatusSelect();
  const { getUserProfileLogInId, userProfileLogInId } = useUserProfileLogInId();

  //get election Type Master
  useEffect(() => {
    if (Object.keys(electionTypesMaster).length === 0 && inputs?.electionType) {
      getElectionTypesMasterData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get election Type
  useEffect(() => {
    if (
      Object.keys(electionTypesCore).length === 0 &&
      inputs?.candidateManagementElectionType
    ) {
      getElectionTypesCoreData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get Election Name
  useEffect(() => {
    if (electionTypeWatch && inputs?.electionName) {
      getElectionSchedulesData(electionTypeWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch]);

  useEffect(() => {
    if (electionTypeWatch && inputs?.candidateType) {
      getElectionCandidateTypesData(electionTypeWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeWatch]);

  //get district with election schedule and candidate type
  useEffect(() => {
    if (electionScheduleWatch && candidateTypeWatch && inputs?.district) {
      getElectionSchedulesCandidateTypeDistrictData(
        electionScheduleWatch,
        candidateTypeWatch,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, candidateTypeWatch]);

  //get district with election schedule
  useEffect(() => {
    if (electionScheduleWatch && inputs?.ScheduleDistrict) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  //get district with election name
  useEffect(() => {
    if (electionScheduleWatch && inputs?.electionNameDistrict) {
      getElectionSchedulesDistrictData(electionScheduleWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch]);

  //get constituency
  useEffect(() => {
    if (
      electionScheduleWatch &&
      candidateTypeWatch &&
      districtWatch &&
      inputs?.constituency
    ) {
      getElectionSchedulesCandidateTypeConstituenciesData({
        electionSchedulesId: electionScheduleWatch,
        electionSchedulesZillaId: districtWatch,
        candidateTypeId: candidateTypeWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch, candidateTypeWatch]);

  //get constituency-settings
  useEffect(() => {
    if (
      electionScheduleWatch &&
      candidateTypeWatch &&
      districtWatch &&
      inputs?.constituencyValueElectionSettings
    ) {
      // getElectionSchedulesCandidateTypeConstituenciesData({
      //   electionSchedulesId: electionScheduleWatch,
      //   electionSchedulesZillaId: districtWatch,
      //   candidateTypeId: candidateTypeWatch,
      // });

      getConstituenciesElectionSettingsData({
        electionSchedulesId: electionScheduleWatch,
        electionSchedulesZillaId: districtWatch,
        candidateTypeId: candidateTypeWatch,
        getElectionSettings: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, districtWatch, candidateTypeWatch]);

  //get nomination statuses
  useEffect(() => {
    if (Object.keys(nominationStatuses).length === 0 && inputs?.status) {
      getNominationStatusData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nominationStatuses]);

  //election area reorganized
  useEffect(() => {
    if (
      Object.keys(electionAreaReorganized).length === 0 &&
      inputs?.rearrangeSeat
    ) {
      getElectionAreaReorganizedData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionAreaReorganized]);

  useEffect(() => {
    if (electionScheduleWatch && inputs?.electionScheduleUser) {
      getElectionScheduleUserTypesData({
        electionScheduleId: electionScheduleWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionScheduleWatch, inputs?.electionScheduleUser]);

  //user types
  useEffect(() => {
    if (Object.keys(userTypes).length === 0 && inputs?.user) {
      getUserTypesData({ type: userType, userTypeCodes: userTypeCodes });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypes, userTypeCodes]);

  // result statuses
  useEffect(() => {
    if (inputs?.resultStatus) {
      getResultStatuses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // draft result statuses
  useEffect(() => {
    if (inputs?.draftResultStatus) {
      getDraftResultStatuses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // message send list statuses
  useEffect(() => {
    if (inputs?.messageSendStatus) {
      getMessageSendStatuses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //user profile loginId
  useEffect(() => {
    if (
      electionScheduleUserWatch &&
      electionScheduleWatch &&
      inputs?.operatorLogInId
    ) {
      getUserProfileLogInId({
        searchItems: {
          electionScheduleId: electionScheduleWatch,
          userTypeCode: electionScheduleUserWatch as string,
          constituencyElectionSettingsId:
            constituencyElectionSettingsWatch as string,
          sortBy: SORT_BY.LOGIN_ID,
          sortOrder: SORT_ORDER.ASC,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    electionScheduleUserWatch,
    electionScheduleWatch,
    constituencyElectionSettingsWatch,
  ]);
  return {
    electionTypesMaster,
    electionTypesCore,
    electionSchedules,
    electionCandidateTypes,
    candidateTypeDistrict,
    electionSchedulesZillas,
    constituencies,
    constituenciesElectionSettings,
    nominationStatuses,
    electionAreaReorganized,
    electionScheduleUserTypes,
    userTypes,
    resultStatuses,
    draftResultStatuses,
    messageSendStatuses,
    userProfileLogInId,
  };
};
