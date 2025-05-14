import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import SendToAppButton from '@components/SendToAppButton';
import {
  DATA_PROVIDER_END_POINT_LIST,
  DATA_PROVIDER_HISTORY_LIST,
} from '@components/SendToAppButton/constant';

export const dataProviderInfosTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DATA_PROVIDER_INFO.BREADCRUMBS.DATA_PROVIDER_INFO'),
  },
];

export const dataProviderInfosTableColumns = ({
  t,
  step,
  setStep,
  disableAll
}: {
  t: TFunction<'translation', undefined>;
  step: number;
  setStep: (num: number) => void;
  disableAll:boolean
}) => [
  {
    id: 1,
    name: t('DATA_PROVIDER_INFO.COLUMN.NAME'),
    key: 'name',
  },
  {
    id: 2,
    name: t('DATA_PROVIDER_INFO.COLUMN.PROCESS'),
    key: 'endPoint',
    render: (endPoint: any, row: any) => {
      return (
        <SendToAppButton
          endPoint={endPoint}
          moduleName={row.key}
          moduleText={row.name}
          dataExists={row.dataExists}
          modifiedUpdatedDate={row.modifiedUpdatedDate}
          status={row.status}
          id={row.id}
          step={step}
          setStep={setStep}
          key={row.id}
          disableAll={disableAll}
        />
      );
    },
  },
  // {
  //   id: 3,
  //   name: t('DATA_PROVIDER_INFO.COLUMN.LAST_UPDATED'),
  //   key: 'modifiedUpdatedDate',
  // },
];

export const dataProviderRows = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => [
  {
    id: 1,
    name: t('DATA_PROVIDER_INFO.ROW.ELECTION'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.ELECTION,
    key: DATA_PROVIDER_HISTORY_LIST.ELECTION,
  },
  {
    id: 2,
    name: t('DATA_PROVIDER_INFO.ROW.ELECTION_SETTING'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.ELECTION_SETTING,
    key: DATA_PROVIDER_HISTORY_LIST.ELECTION_SETTING,
  },
  {
    id: 3,
    name: t('DATA_PROVIDER_INFO.ROW.DIVISION_WISE_VOTER_COUNT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.DIVISION_WISE_VOTER_COUNT,
    key: DATA_PROVIDER_HISTORY_LIST.DIVISION_WISE_VOTER_COUNT,
  },
  {
    id: 4,
    name: t('DATA_PROVIDER_INFO.ROW.SETTING_WISE_VOTER_COUNT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.SETTING_WISE_VOTER_COUNT,
    key: DATA_PROVIDER_HISTORY_LIST.SETTING_WISE_VOTER_COUNT,
  },
  {
    id: 5,
    name: t('DATA_PROVIDER_INFO.ROW.CANDIDATES'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.CANDIDATES,
    key: DATA_PROVIDER_HISTORY_LIST.CANDIDATES,
  },
  {
    id: 6,
    name: t('DATA_PROVIDER_INFO.ROW.POLLING_CENTER'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.POLLING_CENTER,
    key: DATA_PROVIDER_HISTORY_LIST.POLLING_CENTER,
  },
  {
    id: 7,
    name: t('DATA_PROVIDER_INFO.ROW.VOTING_CENTER'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.VOTING_CENTER,
    key: DATA_PROVIDER_HISTORY_LIST.VOTING_CENTER,
  },
  {
    id: 8,
    name: t('DATA_PROVIDER_INFO.ROW.PRESIDING_OFFICER'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.PRESIDING_OFFICER,
    key: DATA_PROVIDER_HISTORY_LIST.PRESIDING_OFFICER,
  },
  {
    id: 9,
    name: t('DATA_PROVIDER_INFO.ROW.POLLING_CENTER_RESULT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.POLLING_CENTER_RESULT,
    key: DATA_PROVIDER_HISTORY_LIST.POLLING_CENTER_RESULT,
  },
  {
    id: 10,
    name: t('DATA_PROVIDER_INFO.ROW.VOTE_COUNT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.VOTE_COUNT,
    key: DATA_PROVIDER_HISTORY_LIST.VOTE_COUNT,
  },
  {
    id: 11,
    name: t('DATA_PROVIDER_INFO.ROW.CANDIDATE_VOTE_COUNT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.CANDIDATE_VOTE_COUNT,
    key: DATA_PROVIDER_HISTORY_LIST.CANDIDATE_VOTE_COUNT,
  },
  {
    id: 12,
    name: t('DATA_PROVIDER_INFO.ROW.UNCONTESTED_CANDIDATE_VOTE_COUNT'),
    endPoint: DATA_PROVIDER_END_POINT_LIST.UNCONTESTED_CANDIDATE_VOTE_COUNT,
    key: DATA_PROVIDER_HISTORY_LIST.UNCONTESTED_CANDIDATE_VOTE_COUNT,
  },
];
