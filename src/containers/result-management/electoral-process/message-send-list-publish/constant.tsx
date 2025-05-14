import { TFunction } from 'i18next';

import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { InputText } from '@pentabd/ui';

import Actions from './component/Actions';
import CenterList from './component/CenterList';
import DownloadAttachFile from '@components/DownloadAttachedFileInsideTableRow';

import { MessageSendingType } from '@type/result-management/electoral-process/message-sending-list/message-sending-list-type';
import { getDigitBanglaFromEnglish } from '@utils';
import { getElectionSpecificColumns } from './helper/get-election-specific-columns';

export const messageSendPublishBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MESSAGE_SEND_LIST_PUBLISH.MESSAGE_SEND_LIST_PUBLISH'),
  },
];

export const messageWaitingTableHeader = {
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

export const messageTestedTableHeader = {
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

export const messageSendPublishTableColumnsWaiting = ({
  t,
  isDownload,
  electionTypeId,
  candidateTypeId,
  getMessageSendingListWaiting,
  getMessageSendingListTested,
}: {
  t: TFunction<'translation', undefined>;
  isDownload: boolean;
  electionTypeId: string | number | undefined;
  candidateTypeId: number | undefined;
  getMessageSendingListWaiting: any;
  getMessageSendingListTested: any;
}) => [
  {
    id: 1,
    name: t('MESSAGE_SEND_LIST_PUBLISH.PREPARED'),
    key: 'generatedByUserLoginId',
  },
  {
    id: 2,
    name: t('MESSAGE_SEND_LIST_PUBLISH.SHEET_NUMBER'),
    key: 'sheetSerial',
    render: (data: number, row: any) => (
      <DownloadAttachFile
        label={`${t('MESSAGE_SEND_LIST_PUBLISH.BARTA_SHEET')}-${data}`}
        documentId={row?.file?.documentId}
        fileId={row?.file?.fileId}
        fileType={row?.file?.fileType}
        formatId={2}
        filePath={row?.file?.filePath}
      />
    ),
  },
  {
    id: 3,
    name: t('MESSAGE_SEND_LIST_PUBLISH.DISTRICT'),
    key: 'zillaName',
  },

  ...(isDownload
    ? [
        {
          id: 4,
          name: t('MESSAGE_SEND_LIST_PUBLISH.NO_OF_CENTER'),
          key: 'includeCentersNumber',
        },
      ]
    : [
        {
          id: 4,
          name: t('MESSAGE_SEND_LIST_PUBLISH.NO_OF_CENTER'),
          key: 'bartaSheetPollingCenterResults',
          render: (data: MessageSendingType[]) => <CenterList data={data} />,
        },
      ]),

  ...getElectionSpecificColumns({ t, electionTypeId, candidateTypeId }),

  {
    id: 6,
    name: t('MESSAGE_SEND_LIST_PUBLISH.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 7,
    name: t('MESSAGE_SEND_LIST_PUBLISH.SUBMISSION_DATE_TIME'),
    key: 'generatedAt',
    render: (data: string) => getDigitBanglaFromEnglish(data),
  },
  ...(isDownload
    ? []
    : [
        {
          id: 8,
          name: t('MESSAGE_SEND_LIST_PUBLISH.PROCESS'),
          key: 'process',
          render: (_: any, row: any) => (
            <Actions
              row={row}
              getMessageSendingListWaiting={getMessageSendingListWaiting}
              getMessageSendingListTested={getMessageSendingListTested}
            />
          ),
        },
      ]),
];

export const messageSendPublishTableColumnsTested = ({
  t,
  isDownload = false,
  electionTypeId,
  candidateTypeId,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  electionTypeId: string | number | undefined;
  candidateTypeId: number | undefined;
}) => [
  {
    id: 1,
    name: t('MESSAGE_SEND_LIST_PUBLISH.PREPARED'),
    key: 'generatedByUserLoginId',
  },
  {
    id: 2,
    name: t('MESSAGE_SEND_LIST_PUBLISH.SHEET_NUMBER'),
    key: 'sheetSerial',
    render: (data: number, row: any) => (
      <DownloadAttachFile
        label={`${t('MESSAGE_SEND_LIST_PUBLISH.BARTA_SHEET')}-${data}`}
        documentId={row?.file?.documentId}
        fileId={row?.file?.fileId}
        fileType={row?.file?.fileType}
        formatId={2}
        filePath={row?.file?.filePath}
      />
    ),
  },
  {
    id: 3,
    name: t('MESSAGE_SEND_LIST_PUBLISH.DISTRICT'),
    key: 'zillaName',
  },

  ...(isDownload
    ? [
        {
          id: 4,
          name: t('MESSAGE_SEND_LIST_PUBLISH.NO_OF_CENTER'),
          key: 'includeCentersNumber',
        },
      ]
    : [
        {
          id: 4,
          name: t('MESSAGE_SEND_LIST_PUBLISH.NO_OF_CENTER'),
          key: 'bartaSheetPollingCenterResults',
          render: (data: MessageSendingType[]) => <CenterList data={data} />,
        },
      ]),

  ...getElectionSpecificColumns({ t, electionTypeId, candidateTypeId }),

  {
    id: 7,
    name: t('MESSAGE_SEND_LIST_PUBLISH.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 8,
    name: t('MESSAGE_SEND_LIST_PUBLISH.SUBMISSION_DATE_TIME'),
    key: 'generatedAt',
    render: (data: string) => getDigitBanglaFromEnglish(data),
  },
  {
    id: 9,
    name: t('MESSAGE_SEND_LIST_PUBLISH.PUBLISH_DATE_TIME'),
    key: 'publishedAt',
    render: (data: string) => getDigitBanglaFromEnglish(data),
  },
];
