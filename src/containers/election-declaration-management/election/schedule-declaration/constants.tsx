import { TFunction } from 'i18next';

import { InputText } from '@pentabd/ui';
import { IconHomeLine, IconSearch } from '@pentabd/icons';

import { API_SERVICE } from '@components/application-search/constants';
import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import State from './components/State';
import OnlineState from './components/OnlineState';
import Actions from './components/Actions';

export const getBreadcrumbs = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SCHEDULE_DECLARATION.SCHEDULE_DECLARATION'),
  },
];

export const getHeaderText = (t: TFunction<'translation', undefined>) => ({
  header: t('SCHEDULE_DECLARATION.SCHEDULE_DECLARATION'),
  subHeader: '',
});

export const header = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
};

export const columns = ({
  t,
  isDownload = false,
  getElectionDetailsListData,
}: {
  t: TFunction<'translation', undefined>;
  getElectionDetailsListData: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t('SCHEDULE_DECLARATION.ELECTION_NAME'),
    key: 'name',
  },
  {
    id: 2,
    name: t('SCHEDULE_DECLARATION.DECLARATION_DATE'),
    key: 'dateOfDeclaration',
  },
  {
    id: 3,
    name: t('SCHEDULE_DECLARATION.NOMINATION_SUBMISSION_DATE'),
    key: 'dateOfNominationSubmission',
  },
  {
    id: 4,
    name: t('SCHEDULE_DECLARATION.ELECTION_DATE'),
    key: 'dateOfElection',
  },

  ...(isDownload
    ? [
        {
          id: 5,
          name: t('SCHEDULE_DECLARATION.STATUS'),
          key: 'statusForDownload',
        },
      ]
    : [
        {
          id: 5,
          name: t('SCHEDULE_DECLARATION.STATUS'),
          key: 'isActive',
          render: (data: any) => <State data={data} />,
        },
      ]),

  ...(isDownload
    ? [
        {
          id: 6,
          name: t('SCHEDULE_DECLARATION.ONLINE_NOMINATION'),
          key: 'statusNominationForDownload',
        },
      ]
    : [
        {
          id: 6,
          name: t('SCHEDULE_DECLARATION.ONLINE_NOMINATION'),
          key: 'isOnlineNomination',
          render: (data: any) => <OnlineState data={data} />,
        },
      ]),

  ...(isDownload
    ? []
    : [
        {
          id: 7,
          name: '',
          key: 'edit',
          render: (data: any, raw: any) => (
            <Actions
              raw={raw}
              getElectionDetailsListData={getElectionDetailsListData}
            />
          ),
        },
      ]),
];

export const scheduleFormMappedData = (data: any) => {
  const {
    electionTypeId,
    nameEn,
    nameBn,
    dateOfDeclaration,
    dateOfNominationSubmission,
    dateOfNominationSelectionStart,
    dateOfNominationSelectionEnd,
    dateOfAppealJudgement,
    dateOfAppealSubmission,
    dateOfNominationWithdrawal,
    dateOfAssignedSymbol,
    dateOfElection,
    dateOfGazette,
    voteCastingStartTime,
    voteCastingEndTime,
    fileOfSchedule,
    fileOfOthers,
    isActive,
    isOnlineNomination,
    scheduleComment,
  } = data;
  return {
    electionTypeId,
    nameEn,
    nameBn,
    dateOfDeclaration,
    dateOfNominationSubmission,
    dateOfNominationSelectionStart,
    dateOfNominationSelectionEnd,
    dateOfAppealJudgement,
    dateOfAppealSubmission,
    dateOfNominationWithdrawal,
    dateOfAssignedSymbol,
    dateOfElection,
    dateOfGazette,
    voteCastingStartTime,
    voteCastingEndTime,
    fileOfSchedule,
    fileOfOthers,
    isOnlineNomination,
    isActive,
    scheduleComment,
  };
};

export const electionInformationMappedData = (data: any) => {
  const {
    minimumAge,
    dateOfAgeComparedFrom,
    totalRegion,
    totalDistrict,
    totalPollingCenter,
    totalPollingBooth,
    totalSeat,
  } = data;
  return {
    minimumAge,
    dateOfAgeComparedFrom,
    totalRegion,
    totalDistrict,
    totalPollingCenter,
    totalPollingBooth,
    totalSeat,
  };
};

export const necessaryManpowerMappedData = (data: any) => {
  const {
    totalReturningOfficer,
    totalAssistantReturningOfficer,
    totalPresidingOfficer,
    totalAssistantPresidingOfficer,
    totalPollingOfficer,
  } = data;
  return {
    totalReturningOfficer,
    totalAssistantReturningOfficer,
    totalPresidingOfficer,
    totalAssistantPresidingOfficer,
    totalPollingOfficer,
  };
};

export const allSelectedData = {
  electionTypeCore: false,
  electionTypeCoreOptions: false,
  electionSchedule: false,
  electionScheduleOptions: false,
};

const clearElectionSchedule = {
  electionSchedule: true,
};
export const inputs = {
  electionTypeCore: {
    refreshData: { ...clearElectionSchedule },
    nonRefreshData: {
      electionTypeCore: false,
      electionTypeCoreOptions: false,
      electionScheduleOptions: false,
    },
  },
  electionSchedule: {
    nonRefreshData: {
      electionSchedule: false,
    },
  },
};

export const searchStruct = [
  { fieldName: ADVANCE_SEARCH.ELECTION_TYPE, apiService: API_SERVICE.MASTER },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    apiService: '',
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
  },
];
