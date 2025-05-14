import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';

import { ADVANCE_SEARCH } from '@components/application-search/SearchComponents';
import { API_SERVICE } from '@components/application-search/constants';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

export const electionTransferBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_TRANSFER.ELECTION_TRANSFER'),
  },
];

export const electionTransferTableHeader = {
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
  rightComponents: [<DownloadButtons key={1} fileName={'test'} />],
};

export const electionTransferTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('ELECTION_TRANSFER.ELECTION_NAME'),
    key: 'electionScheduleNameBn',
  },
  {
    id: 2,
    name: t('ELECTION_TRANSFER.CANDIDATE_TYPE'),
    key: 'candidateType',
  },
  {
    id: 3,
    name: t('ELECTION_TRANSFER.DISTRICT'),
    key: 'zillaNameBn',
  },
  {
    id: 4,
    name: t('ELECTION_TRANSFER.SUB_DISTRICT'),
    key: 'upazilaNameBn',
  },
  {
    id: 5,
    name: t('ELECTION_TRANSFER.ELECTION_SEAT_NO'),
    key: 'constituencyCode',
  },
  {
    id: 6,
    name: t('ELECTION_TRANSFER.SEAT_NAME'),
    key: 'constituencyNameBn',
  },
  {
    id: 7,
    name: t('ELECTION_TRANSFER.MUNICIPALITY'),
    key: 'municipalityNameBn',
  },
  {
    id: 8,
    name: t('ELECTION_TRANSFER.UNION'),
    key: 'unionOrWardNameBn',
  },
  {
    id: 9,
    name: t('ELECTION_TRANSFER.UNION_WARD'),
    key: 'unionWardNameBn',
  },
];

const clearDistrict = {
  district: true,
};

const clearScheduleCandidate = {
  ...clearDistrict,
  electionSchedule: true,
  candidateType: true,
  districtOptions: true,
};

export const searchStruct = [
  {
    fieldName: ADVANCE_SEARCH.ELECTION_TYPE,
    apiService: API_SERVICE.MASTER,
    refreshData: clearScheduleCandidate,
  },
  {
    fieldName: ADVANCE_SEARCH.ELECTION_SCHEDULE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: clearDistrict,
    nonRefreshData: {
      electionSchedule: false,
      districtOptions: false,
    },
  },

  {
    fieldName: ADVANCE_SEARCH.CANDIDATE_TYPE,
    pathParamsDependency: {
      'election-types': APPLICATION_SEARCH.ELECTION_TYPE,
    },
    refreshData: clearDistrict,
    nonRefreshData: {
      candidateType: false,
      districtOptions: false,
    },
  },
  {
    fieldName: ADVANCE_SEARCH.DISTRICT,
    pathParamsDependency: {
      'election-schedules': APPLICATION_SEARCH.ELECTION_SCHEDULE,
      'candidate-types': APPLICATION_SEARCH.CANDIDATE_TYPE,
    },
    nonRefreshData: {
      district: false,
    },
  },
];
