import { TFunction } from 'i18next';
import dayjs from 'dayjs';

import { InputText, Text } from '@pentabd/ui';
import { IconHomeLine, IconSearch } from '@pentabd/icons';

import AroFileDownload from './components/AroFileDownload';
import RoFileDownload from './components/RoFileDownload';
import CenterList from './components/CenterList';
import Actions from './components/Actions';
import History from './components/History';

import { ROUTES } from '@constants/routes';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import { MessageSendType } from '@type/result-management/electoral-process/message-send-list/message-send-list-type';
import { resultStatusBadge } from './helpers';
import { getElectionSpecificColumns } from './helper/get-election-specific-columns';
import { getElectionSpecificColumnsForHistory } from './helper/get-election-specific-columns-for-history';
import { getDigitBanglaFromEnglish } from '@utils';
import { ELECTION_INFO } from '@constants/election-info';

export const GENERATED_BY = {
  ARO: 'ARO',
  RO: 'RO',
};

export const FINAL_SHEET_STATUS = 'FINAL';

export const messageBoardBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.TITLE'),
    URL: ROUTES.NOMINATION_LETTER,
  },
];

export const messageBoardHistoryBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.TITLE'),
    URL: ROUTES.NOMINATION_LETTER,
  },
  {
    label: t(
      'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.BARTA_SHEET_HISTORY',
    ),
    URL: ROUTES.MESSAGE_SEND_LIST_HISTORY,
  },
];

export const messageBoardTableHeader = {
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

export const messageBoardTableColumns = ({
  t,
  isAdmin,
  permissionsArray,
  electionTypeId,
  candidateTypeId,
  isDownload,
  getMessageSendList,
}: {
  t: TFunction<'translation', undefined>;
  isAdmin: boolean;
  permissionsArray?: string[];
  electionTypeId: string | number | undefined;
  candidateTypeId: number | undefined;
  isDownload: boolean;
  getMessageSendList: any;
}) => [
  {
    id: 1,
    name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.DISTRICT'),
    key: 'zillaName',
  },

  ...getElectionSpecificColumns({ t, electionTypeId, candidateTypeId }),

  {
    id: 4,
    name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 5,
    name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CREATOR'),
    key: 'generatedByUserLoginId',
  },

  ...(isAdmin
    ? [
        {
          id: 6,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CREATED_BY'),
          key: 'createdBy',
        },
        {
          id: 7,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UPDATED_BY'),
          key: 'updatedBy',
        },
      ]
    : []),

  ...(isDownload
    ? [
        {
          id: 8,
          name: t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PREPARED_BY_ARO',
          ),
          key: 'fileByAROforTableDownload',
          hide: Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID,
        },
      ]
    : [
        {
          id: 8,
          name: t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PREPARED_BY_ARO',
          ),
          key: 'fileByARO',
          render: (data: any, row: any) => <AroFileDownload row={row} />,
          hide: Number(electionTypeId) === ELECTION_INFO.UNION_PARISHAD.ID,
        },
      ]),

  ...(isDownload
    ? [
        {
          id: 9,
          name: t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PUBLISHED_BY_RO',
          ),
          key: 'finalFileByROforTableDownload',
        },
      ]
    : [
        {
          id: 9,
          name: t(
            'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PUBLISHED_BY_RO',
          ),
          key: 'finalFileByRO',
          render: (data: any, row: any) => <RoFileDownload row={row} />,
        },
      ]),

  {
    id: 10,
    name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.TOTAL_CENTERS'),
    key: 'totalCenterCount',
  },
  {
    id: 11,
    name: t(
      'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MSG_BOARD_INCLUDED_CENTERS',
    ),
    key: 'bartaSheetPollingCenterResultsLength',
    render: (data: any, row: any) => <CenterList row={row} />,
  },

  ...(isDownload
    ? [
        {
          id: 12,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CONDITION'),
          key: 'statusForDownload',
        },
      ]
    : [
        {
          id: 12,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CONDITION'),
          key: 'sheetStatus',
          render: (data: any) => (
            <div className="d-flex">{resultStatusBadge(data, t)}</div>
          ),
        },
      ]),

  ...(permissionsArray?.includes(
    RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_HISTORY,
  ) && !isDownload
    ? [
        {
          id: 13,
          name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY'),
          key: 'status_history',
          render: (data: any, row: any) => <History row={row} />,
        },
      ]
    : []),

  ...(permissionsArray?.includes(
    RESULT_MANAGEMENT.RESULT_MONITORING_CANCEL_FINAL_BARTA_SHEET ||
      RESULT_MANAGEMENT.RESULT_MONITORING_PUBLISH_TO_APP,
  ) && !isDownload
    ? [
        {
          id: 14,
          name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PROCESS'),
          key: 'sheetStatus',
          render: (data: any, row: MessageSendType) => (
            <Actions
              data={data}
              row={row}
              getMessageSendList={getMessageSendList}
            />
          ),
        },
      ]
    : []),
];

export const messageBoardHistoryTableColumns = ({
  t,
  isAdmin,
  electionTypeId,
  candidateTypeId,
  isShowFileByAro = true,
}: {
  t: TFunction<'translation', undefined>;
  isAdmin: boolean;
  electionTypeId: string | number | undefined;
  candidateTypeId: number | undefined;
  isShowFileByAro?: boolean;
}) => {
  return [
    {
      id: 1,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.DISTRICT'),
      key: 'zillaNameBn',
    },

    ...getElectionSpecificColumnsForHistory({
      t,
      electionTypeId,
      candidateTypeId,
    }),

    {
      id: 4,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CANDIDATE_TYPE'),
      key: 'candidateTypeNameBn',
    },
    {
      id: 5,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CREATOR'),
      key: 'generatedByUserLoginId',
    },
    {
      id: 6,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CREATED_BY'),
      key: 'createdBy',
      hide: !isAdmin,
    },
    {
      id: 7,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UPDATED_BY'),
      key: 'updatedBy',
      hide: !isAdmin,
    },
    {
      id: 8,
      name: t(
        'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PREPARED_BY_ARO',
      ),
      key: 'fileByARO',
      render: (data: any, row: any) => <AroFileDownload row={row} />,
      hide: isShowFileByAro,
    },
    {
      id: 9,
      name: t(
        'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.MESSAGE_SHEET_PUBLISHED_BY_RO',
      ),
      key: 'finalFileByRO',
      render: (data: any, row: any) => <RoFileDownload row={row} />,
    },
    {
      id: 10,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.TOTAL_CENTERS'),
      key: 'totalCenterCount',
      render: (data?: number) =>
        data ? getDigitBanglaFromEnglish(data) : getDigitBanglaFromEnglish(0),
    },
    {
      id: 11,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.CONDITION'),
      key: 'sheetStatus',
      render: (data: any) => (
        <div className="d-flex">{resultStatusBadge(data, t)}</div>
      ),
    },
    {
      id: 12,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.GENERATED_AT'),
      key: 'generatedAt',
      render: (generatedAt: string) => (
        <Text className="text-nowrap">
          {generatedAt
            ? dayjs(generatedAt).format('YYYY-MM-DD hh:mm a')
            : 'N/A'}
        </Text>
      ),
    },
    {
      id: 13,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.PUBLISHED_AT'),
      key: 'generatedAt',
      render: (publishedAt: string) => (
        <Text className="text-nowrap">
          {publishedAt
            ? dayjs(publishedAt).format('YYYY-MM-DD hh:mm a')
            : 'N/A'}
        </Text>
      ),
    },
    {
      id: 14,
      name: t('ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.UPDATED_AT'),
      key: 'updatedAt',
      render: (updatedAt: string) => (
        <Text className="text-nowrap">
          {updatedAt ? dayjs(updatedAt).format('YYYY-MM-DD hh:mm a') : 'N/A'}
        </Text>
      ),
    },
  ];
};
