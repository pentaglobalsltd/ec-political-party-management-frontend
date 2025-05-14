import { TFunction } from 'i18next';
import Actions from './components/Actions';

export const getColumnsAddedCenterTable = ({
  t,
  getPollingCenterAggregatedData,
  getPollingInstitutesList,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getPollingCenterAggregatedData?: any;
  getPollingInstitutesList?: any;
}) => [
  // ক্রমিক নং
  {
    id: 1,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.SERIAL_NO`),
    key: 'serialNo',
  },

  // প্রতিষ্ঠানের নাম
  {
    id: 2,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.INSTITUTE_NAME`),
    key: 'pollingInstituteName',
  },

  // মোট বুথ
  {
    id: 3,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.TOTAL_BOOTH`),
    key: 'numberOfBooth',
  },

  // পুরুষ ভোটার
  {
    id: 4,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.MALE_VOTER`),
    key: 'totalMaleVoter',
  },

  // মহিলা ভোটার
  {
    id: 5,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.FEMALE_VOTER`),
    key: 'totalFemaleVoter',
  },

  // হিজড়া ভোটার
  {
    id: 51,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.THIRD_GENDER_VOTER`),
    key: 'totalThirdGenderVoter',
  },

  // মোট ভোটার
  {
    id: 6,
    name: t(`ADD_VOTE_CENTER.ADDED_CENTERS_TABLE.COLUMNS.TOTAL_VOTER`),
    key: 'totalVoter',
  },

  {
    id: 7,
    name: t('VOTE_CENTER_ADDITION.TEMPORARY_TYPE'),
    key: 'isTemporaryCenter',
  },
  {
    id: 8,
    name: t('VOTE_CENTER_ADDITION.NUMBER_OF_TEMPORARY_BOOTH'),
    key: 'numberOfTemporaryBooth',
  },

  {
    id: 9,
    name: '',
    key: 'action',
    hide: isDownload,
    render: (data: any, row: any) => {
      return (
        <Actions
          row={row}
          getPollingInstitutesList={getPollingInstitutesList}
          getPollingCenterAggregatedData={getPollingCenterAggregatedData}
        />
      );
    },
  },
];
