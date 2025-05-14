import { TFunction } from 'i18next';
import dayjs from 'dayjs';

import { IconHomeLine } from '@pentabd/icons';
import { Badge, Text } from '@pentabd/ui';

import { RESULT_STATUS } from '@containers/result-management/electoral-process/results/constants';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { getElectionSpecificColumns } from './helper/get-election-specific-columns';
import { getDigitBanglaFromEnglish } from '@utils';
import Actions from './components/Actions';
import ShowStatus from './components/ShowStatus';
import Download from './components/Download';

export const centerBasedMonitoringResultsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_BASED_MONITORING_RESULTS.CENTER_BASED_MONITORING_RESULTS'),
  },
];

export const centerBasedResultsHistoryTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_BASED_MONITORING_RESULTS.CENTER_BASED_MONITORING_RESULTS'),
  },
  {
    label: t('CENTER_BASED_MONITORING_RESULTS.CENTER_STATUS_HISTORY'),
  },
];

export const centerBasedResultPublishBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CENTER_BASED_MONITORING_RESULTS.CENTER_BASED_MONITORING_RESULTS'),
  },
  {
    label: t('CENTER_BASED_MONITORING_RESULTS.RESULT_PUBLISH'),
  },
];

export const centerBasedMonitoringResultsTableColumns = ({
  t,
  params,
  electionTypeId,
  candidateTypeId,
  permissionsArray,
  isAdmin,
  isDownload = false,
  getPollingCenterList,
}: {
  t: TFunction<'translation', undefined>;
  params: any;
  electionTypeId?: string | number;
  candidateTypeId?: string | number;
  permissionsArray?: string[];
  isAdmin: boolean;
  isDownload?: boolean;
  getPollingCenterList: any;
}) => [
  {
    id: 1,
    name: t('CENTER_BASED_MONITORING_RESULTS.DISTRICT'),
    key: 'zillaName',
  },
  ...getElectionSpecificColumns({
    t,
    electionTypeId: Number(electionTypeId),
    candidateTypeId: Number(candidateTypeId),
  }),

  ...(isAdmin
    ? [
        {
          id: 10,
          name: t('CENTER_BASED_MONITORING_RESULTS.CREATED_BY'),
          key: 'createdBy',
        },
        {
          id: 11,
          name: t('CENTER_BASED_MONITORING_RESULTS.UPDATED_BY'),
          key: 'updatedBy',
        },
      ]
    : []),

  {
    id: 3,
    name: t('CENTER_BASED_MONITORING_RESULTS.CENTER_NO'),
    key: 'serial',
  },
  {
    id: 4,
    name: t('CENTER_BASED_MONITORING_RESULTS.VOTE_CENTER_NAME'),
    key: 'pollingCenterName',
  },
  {
    id: 5,
    name: t('CENTER_BASED_MONITORING_RESULTS.CONDITION'),
    key: 'status',
    render: (data: any) => (
      <div className="d-flex">
        <Badge
          className="text-nowrap"
          size="sm"
          label={data as string}
          type={data === 'ফলাফল প্রকাশ' ? 'success' : 'warning'}
        />
      </div>
    ),
  },
  {
    id: 6,
    name: t('CENTER_BASED_MONITORING_RESULTS.TOTAL_VOTER'),
    key: 'pollingCenterTotalVoter',
  },
  {
    id: 7,
    name: t('CENTER_BASED_MONITORING_RESULTS.TAKE_VOTE'),
    key: 'totalLegalVoteCount',
  },
  {
    id: 8,
    name: t('CENTER_BASED_MONITORING_RESULTS.REJECT_VOTE'),
    key: 'totalIllegalVoteCount',
  },

  ...(params.status !== RESULT_STATUS.CREATED_BY_OP && !isDownload
    ? [
        {
          id: 9,
          name: t('CENTER_BASED_MONITORING_RESULTS.PROCESS'),
          key: 'process',
          render: (data: any, row: any) => (
            <Actions row={row} getPollingCenterList={getPollingCenterList} />
          ),
        },
      ]
    : []),

  ...(permissionsArray?.includes(
    RESULT_MANAGEMENT.RESULT_MONITORING_VIEW_RESULT_HISTORY,
  ) && !isDownload
    ? [
        {
          id: 12,
          name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY'),
          key: 'status_history',
          render: (data: any, row: any) => (
            <ShowStatus row={row} candidateTypeId={candidateTypeId} />
          ),
        },
      ]
    : []),
];

export const centerBasedResultHistoryColumns = (
  t: TFunction<'translation', undefined>,
  resultStatuses?: any,
) => [
  {
    id: 1,
    name: t('CENTER_BASED_MONITORING_RESULTS.SERIAL_NO'),
    key: 'serialNo',
    render: (data: string) => (
      <Text className="text-nowrap">
        {data ? getDigitBanglaFromEnglish(data) : 'N/A'}
      </Text>
    ),
  },
  {
    id: 2,
    name: t('CENTER_BASED_MONITORING_RESULTS.TAKE_VOTE'),
    key: 'totalLegalVoteCount',
    render: (data: string) => (
      <Text className="text-nowrap">
        {data ? getDigitBanglaFromEnglish(data) : 'N/A'}
      </Text>
    ),
  },
  {
    id: 3,
    name: t('CENTER_BASED_MONITORING_RESULTS.REJECT_VOTE'),
    key: 'totalIllegalVoteCount',
    render: (data: string) => (
      <Text className="text-nowrap">
        {data ? getDigitBanglaFromEnglish(data) : 'N/A'}
      </Text>
    ),
  },
  {
    id: 4,
    name: t('CENTER_BASED_MONITORING_RESULTS.TOTAL_ABSENT_VOTE_COUNT'),
    key: 'totalAbsentVoteCount',
    render: (data: string) => (
      <Text className="text-nowrap">
        {data ? getDigitBanglaFromEnglish(data) : 'N/A'}
      </Text>
    ),
  },
  {
    id: 5,
    name: t('CENTER_BASED_MONITORING_RESULTS.STATUS'),
    key: 'status',
    render: (data: any) => {
      const mappedData = resultStatuses?.find((item: any) =>
        item?.value?.match(data),
      );

      return (
        <div className="d-flex">
          <Badge
            className="text-nowrap"
            size="sm"
            label={mappedData?.label}
            type={
              data === RESULT_STATUS.APPROVED_BY_ARO ? 'success' : 'warning'
            }
          />
        </div>
      );
    },
  },
  {
    id: 6,
    name: t('CENTER_BASED_MONITORING_RESULTS.FILE'),
    key: 'fileFromOp',
    render: (data: any) => <Download data={data} />,
  },
  {
    id: 7,
    name: t('CENTER_BASED_MONITORING_RESULTS.COMMENT_BY_ARO'),
    key: 'commentByARO',
  },
  {
    id: 8,
    name: t('CENTER_BASED_MONITORING_RESULTS.SUBMITTED_BY'),
    key: 'submittedBy',
  },
  {
    id: 9,
    name: t('CENTER_BASED_MONITORING_RESULTS.APPROVED_BY'),
    key: 'approvedBy',
  },
  {
    id: 10,
    name: t('CENTER_BASED_MONITORING_RESULTS.APPROVED_AT'),
    key: 'approvedAt',
    render: (approvedAt: string) => (
      <Text className="text-nowrap">
        {approvedAt ? dayjs(approvedAt).format('YYYY-MM-DD hh:mm a') : 'N/A'}
      </Text>
    ),
  },
  {
    id: 11,
    name: t('CENTER_BASED_MONITORING_RESULTS.CONDITION'),
    key: 'isActive',
    render: (data: any) => (
      <>
        {data === true ? (
          <Text>{t('ELECTION_USER.CONDITION_ACTIVE')}</Text>
        ) : (
          <Text>{t('ELECTION_USER.CONDITION_INACTIVE')}</Text>
        )}
      </>
    ),
  },
  {
    id: 12,
    name: t('CENTER_BASED_MONITORING_RESULTS.CREATED_BY'),
    key: 'createdBy',
  },
  {
    id: 13,
    name: t('CENTER_BASED_MONITORING_RESULTS.UPDATED_BY'),
    key: 'updatedBy',
  },
  {
    id: 14,
    name: t('CENTER_BASED_MONITORING_RESULTS.CREATED_AT'),
    key: 'createdAt',
    render: (createdAt: string) => (
      <Text className="text-nowrap">
        {createdAt ? dayjs(createdAt).format('YYYY-MM-DD hh:mm a') : 'N/A'}
      </Text>
    ),
  },
  {
    id: 15,
    name: t('CENTER_BASED_MONITORING_RESULTS.UPDATED_AT'),
    key: 'updatedAt',
    render: (updatedAt: string) => (
      <Text className="text-nowrap">
        {updatedAt ? dayjs(updatedAt).format('YYYY-MM-DD hh:mm a') : 'N/A'}
      </Text>
    ),
  },
];
