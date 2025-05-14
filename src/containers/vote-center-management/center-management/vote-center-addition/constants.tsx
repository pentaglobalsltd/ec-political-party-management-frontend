import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';
import { Text, Badge } from '@pentabd/ui';

import { getDigitBanglaFromEnglish } from '@utils';
import Action from './components/Action';
import Download from './components/Download';
import { PollingCentersAggregatedType } from '@type/vote-center-management/polling-centers-aggregated-types';
import { GetPollingPollingInstitutes } from '@api/vote-center-management/center-management/polling-institute/polling-institutes';

export const voteCenterAdditionTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTE_CENTER_ADDITION.VOTE_CENTER_LIST'),
  },
];

export const newVoteCenterAdditionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTE_CENTER_ADDITION.VOTE_CENTER_LIST'),
  },
  {
    label: t('VOTE_CENTER_ADDITION.VOTE_CENTER_ADDITION'),
  },
];

export const editVoteCenterAdditionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTE_CENTER_ADDITION.VOTE_CENTER_LIST'),
  },
];

export const voteCenterAdditionTableColumns = ({
  t,
  isDownload = false,
  getPollingCenterAggregatedData,
  userType,
}: {
  userType?: string;
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getPollingCenterAggregatedData?: any;
}) => [
  // ক্রমিক নং
  {
    id: 1,
    name: t('VOTE_CENTER_ADDITION.ID'),
    key: 'idx',
  },

  // জেলা
  {
    id: 2,
    name: t('VOTE_CENTER_ADDITION.DISTRICT'),
    key: `zillaName`,
  },
  // জেলা
  {
    id: 16,
    name: t('VOTE_CENTER_ADDITION.SUB_DISTRICT'),
    key: `upazilaName`,
  },
  // ইউনিয়ন/ওয়ার্ড
  {
    id: 3,
    name: t('VOTE_CENTER_ADDITION.UNION_OR_WARD'),
    key: `unionOrWardName`,
  },

  // ভোটার এলাকা
  {
    id: 4,
    name: t('VOTE_CENTER_ADDITION.VOTER_AREA'),
    key: 'voterAreaNameBnWithCode',
  },
  // ভোটকেন্দ্রের নাম
  {
    id: 5,
    name: t('VOTE_CENTER_ADDITION.VOTE_CENTER_NAME'),
    key: 'pollingInstituteName',
  },

  // কেন্দ্র নং
  {
    id: 6,
    name: t('VOTE_CENTER_ADDITION.VOTE_CENTER_NUMBER'),
    key: 'serial',
  },

  // বুথের সংখ্যা
  {
    id: 7,
    name: t('VOTE_CENTER_ADDITION.TOTAL_BOOTH'),
    key: 'numberOfBooth',
  },
  // কেন্দ্রের ধরন
  {
    id: 8,
    name: t('VOTE_CENTER_ADDITION.CENTER_TYPE'),
    key: 'voterType',
  },
  // পুরুষ ভোটার
  {
    id: 9,
    name: t('VOTE_CENTER_ADDITION.MALE_VOTER'),
    key: 'totalMaleVoter',
  },

  // মহিলা ভোটার
  {
    id: 10,
    name: t('VOTE_CENTER_ADDITION.FEMALE_VOTER'),
    key: 'totalFemaleVoter',
  },

  // তৃতীয় লিঙ্গ ভোটার
  {
    id: 11,
    name: t('VOTE_CENTER_ADDITION.THIRD_GENDER_VOTER'),
    key: 'totalThirdGenderVoter',
  },

  // মোট ভোটার
  {
    id: 12,
    name: t('VOTE_CENTER_ADDITION.TOTAL_VOTER'),
    key: 'totalVoter',
  },
  {
    id: 17,
    name: t('VOTE_CENTER_ADDITION.TEMPORARY_TYPE'),
    key: 'isTemporaryCenter',
  },
  {
    id: 18,
    name: t('VOTE_CENTER_ADDITION.NUMBER_OF_TEMPORARY_BOOTH'),
    key: 'numberOfTemporaryBooth',
  },

  // স্ট্যাটাস
  ...(isDownload
    ? [
        {
          id: 13,
          name: t('VOTE_CENTER_ADDITION.STATUS'),
          key: 'isActiveStatus',
        },
      ]
    : [
        {
          id: 13,
          name: t('VOTE_CENTER_ADDITION.STATUS'),
          key: 'status',
          render: (data: any, row: any) => {
            return (
              <div className="d-flex">
                <Badge
                  className="text-nowrap"
                  size="sm"
                  label={
                    row?.isActive
                      ? t('VOTE_CENTER_ADDITION.ACTIVE')
                      : t('VOTE_CENTER_ADDITION.INACTIVE')
                  }
                  type={row?.isActive ? 'success' : 'warning'}
                />
              </div>
            );
          },
        },
      ]),

  // তৈরির সময়
  {
    id: 14,
    name: t('VOTE_CENTER_ADDITION.DATE_OF_CREATION'),
    key: 'createdAt',
  },
  {
    id: 15,
    name: t('VOTE_CENTER_ADDITION.STEP'),
    key: 'action',
    hide: isDownload,
    render: (data: any, row: any) => {
      return (
        <Action
          row={row}
          userType={userType}
          getPollingCenterAggregatedData={getPollingCenterAggregatedData}
        />
      );
    },
  },
];

export type Height = 'auto' | number | `${number}%`;

export const getBreadcrumbsEditVoteCenter = (
  t: TFunction<'translation', undefined>,
  potentialPollingInstitute: any,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('UPDATE_VOTE_CENTER.BREADCRUMBS.VOTE_CENTER_LIST'),
    // link: PATH.VOTER_AREA, // TODO
  },

  {
    label: t('UPDATE_VOTE_CENTER.BREADCRUMBS.ADD_VOTE_CENTER'),
    // link: PATH.VOTER_AREA, // TODO
  },

  {
    label: potentialPollingInstitute?.instituteName,
    // link: PATH.VOTER_AREA, // TODO
  },
];

export const temporaryRadioOptions = (
  t: TFunction<'translation', undefined>,
  tAddCenterInfo: string,
) => [
  {
    id: 'isTemporary',
    value: 'active',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_TEMPORARY.ACTIVE`),
  },
  {
    id: 'isNotTemporary',
    value: 'inactive',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_TEMPORARY.INACTIVE`),
  },
];

export const tabCenterRadioOptions = (
  t: TFunction<'translation', undefined>,
  tAddCenterInfo: string,
) => [
  {
    id: 'activeTab',
    value: 'active',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_TAB.ACTIVE`),
  },
  {
    id: 'inactiveTab',
    value: 'inactive',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_TAB.INACTIVE`),
  },
];

export const EvmResultsRadioOptions = (
  t: TFunction<'translation', undefined>,
  tAddCenterInfo: string,
) => [
  {
    id: 'activeEvm',
    value: 'active',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_EVM.ACTIVE`),
  },
  {
    id: 'inactiveEvm',
    value: 'inactive',
    label: t(`${tAddCenterInfo}.RADIO_OPTIONS_EVM.INACTIVE`),
  },
];

export const getColumnsAddVoterArea = (
  t: TFunction<'translation', undefined>,
  tVoterAreaAdd: string,
) => {
  return [
    {
      id: 1,
      name: t(`${tVoterAreaAdd}.VOTER_ELAKA`),
      rowSpan: 2,
    },
    {
      id: 2,
      name: t(`${tVoterAreaAdd}.AREA_CODE`),
      rowSpan: 2,
    },
    {
      id: 3,
      name: t(`${tVoterAreaAdd}.NUMBER_OF_VOTERS.HEADING`),
      colSpan: 3,
    },
    {
      id: 4,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_MALE.HEADING`),
      colSpan: 2,
    },
    {
      id: 5,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_FEMALE.HEADING`),
      colSpan: 2,
    },
    {
      id: 6,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_THIRD_GENDER.HEADING`),
      colSpan: 2,
    },
    {
      id: 7,
      name: t(`${tVoterAreaAdd}.TOTAL_VOTE_ROW`),
      rowSpan: 2,
    },
  ];
};

export const getColumnSecondaryAddVoterArea = (
  t: TFunction<'translation', undefined>,
  tVoterAreaAdd: string,
) => {
  return [
    {
      id: 1,
      name: t(`${tVoterAreaAdd}.NUMBER_OF_VOTERS.COL_MALE`),
      // rowSpan: 2,
    },
    {
      id: 2,
      name: t(`${tVoterAreaAdd}.NUMBER_OF_VOTERS.COL_FEMALE`),
      // colSpan: 2,
    },
    {
      id: 3,
      name: t(`${tVoterAreaAdd}.NUMBER_OF_VOTERS.COL_THIRD_GENDER`),
      // colSpan: 2,
    },
    {
      id: 4,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_MALE.COL_START`),
      // colSpan: 2,
    },
    {
      id: 5,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_MALE.COL_FINISH`),
    },
    {
      id: 6,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_FEMALE.COL_START`),
      // colSpan: 2,
    },
    {
      id: 7,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_FEMALE.COL_FINISH`),
    },

    {
      id: 8,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_THIRD_GENDER.COL_START`),
      // colSpan: 2,
    },
    {
      id: 9,
      name: t(`${tVoterAreaAdd}.SERIAL_OF_VOTERS_THIRD_GENDER.COL_FINISH`),
    },
  ];
};

export const getTableDataInstitutionReport = (
  t: TFunction<'translation', undefined>,
  tInstitutionReport: string,
  potentialPollingInstitute: any,
) => {
  return {
    [t(`${tInstitutionReport}.ELECTION_NAME`)]:
      potentialPollingInstitute?.electionScheduleName,
    [t(`${tInstitutionReport}.NUMBER_OF_FLOORS`)]:
      potentialPollingInstitute?.noOfFloor,

    [t(`${tInstitutionReport}.DISTRICT`)]: potentialPollingInstitute?.zillaName,
    [t(`${tInstitutionReport}.TOTAL_ROOM`)]:
      potentialPollingInstitute?.noOfRoom,

    [t(`${tInstitutionReport}.UPAZILLA`)]:
      potentialPollingInstitute?.upazilaName,
    [t(`${tInstitutionReport}.TOILET`)]: potentialPollingInstitute?.hasToilet
      ? t(`${tInstitutionReport}.IT_HAS`)
      : t(`${tInstitutionReport}.IT_LACKS`),

    [t(`${tInstitutionReport}.UNION`)]:
      potentialPollingInstitute?.unionOrWardName,
    [t(`${tInstitutionReport}.SURROUNDINGS`)]:
      potentialPollingInstitute?.surroundings,

    [t(`${tInstitutionReport}.NAME_OF_THE_HEAD`)]:
      potentialPollingInstitute?.headName,
    [t(`${tInstitutionReport}.DISTANCE`)]:
      potentialPollingInstitute?.distanceFromCenter,

    [t(`${tInstitutionReport}.MOBILE_CONTACT_OF_HEAD`)]:
      potentialPollingInstitute?.headContactNo,
    [t(`${tInstitutionReport}.TRANSPORTATION_MEDIUM`)]:
      potentialPollingInstitute?.waysToReach,

    [t(`${tInstitutionReport}.TOTAL_MEMBERS`)]:
      potentialPollingInstitute?.noOfEmployee,
    [t(`${tInstitutionReport}.COMMENT`)]: potentialPollingInstitute?.comments,
  };
};

export const getBreadcrumbsCreateVoteCenterAddition = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ADD_VOTE_CENTER.BREADCRUMBS.VOTE_CENTER_LIST'),
    // link: PATH.VOTER_AREA, // TODO
  },

  {
    label: t('ADD_VOTE_CENTER.BREADCRUMBS.ADD_VOTE_CENTER'),
    // link: PATH.VOTER_AREA, // TODO
  },
];

export const getColumnsStatusTable = ({
  t,
  tStatusTableColumn,
  isDownload = false,
  searchInstituteWatch,
  getPollingInstitutesList,
}: {
  t: TFunction<'translation', undefined>;
  tStatusTableColumn: string;
  isDownload?: boolean;
  searchInstituteWatch: string;
  getPollingInstitutesList: (obj: GetPollingPollingInstitutes) => void;
}) => [
  // ক্রমিক নং
  {
    id: 1,
    name: t(`${tStatusTableColumn}.ID`),
    key: 'serialNo',
    // key: 'idFrontend',
  },

  // ভোটার এলাকা
  {
    id: 2,
    name: t(`${tStatusTableColumn}.CONSTITUENCY`),
    key: 'name',
  },
  {
    id: 3,
    name: t(`${tStatusTableColumn}.UPAZILA_CODE`),
    key: 'upazilaNameWithCode',
    hide: !isDownload,
  },
  {
    id: 4,
    name: t(`${tStatusTableColumn}.UNION_CODE`),
    key: 'unionOrWardNameWithCode',
    hide: !isDownload,
  },

  {
    id: 5,
    name: t(`${tStatusTableColumn}.UPAZILA_CODE`),
    key: 'upazilaName',
    hide: isDownload,
    render: (data: any, row: any) => {
      return (
        <Text>
          {data} ({getDigitBanglaFromEnglish(row?.upazila?.code)})
        </Text>
      );
    },
  },
  {
    id: 6,
    name: t(`${tStatusTableColumn}.UNION_CODE`),
    key: 'unionOrWardName',
    hide: isDownload,
    render: (data: any, row: any) => {
      return (
        <Text>
          {data} ({getDigitBanglaFromEnglish(row?.unionOrWard?.code)})
        </Text>
      );
    },
  },
  // স্ট্যাটাস
  {
    id: 7,
    name: t('VOTE_CENTER_ADDITION.STATUS'),
    key: 'status',
    hide: isDownload,
    render: (data: any, row: PollingCentersAggregatedType) => {
      return (
        <Download
          row={row}
          getPollingInstitutesList={getPollingInstitutesList}
          searchInstituteWatch={searchInstituteWatch}
        />
      );
    },
  },
];
