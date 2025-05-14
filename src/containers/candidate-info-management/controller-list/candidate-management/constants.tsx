import { TFunction } from 'i18next';
import dayjs from 'dayjs';

import { IconHomeLine } from '@pentabd/icons';
import { Badge, Text } from '@pentabd/ui';

import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';
import { DownloadFileIdType } from '@type/documents/attach-file';
import { NominationType } from '@type/candidate-info-management/nomination-list-type';

import Status from './components/Status';
import Progress from './components/Progress';
import Download from './components/Download';
import UpdateCandidateType from './components/UpdateCandidateType';
import UpdateNominationStatus from './components/UpdateNominationStatus';
import SendSms from './components/SendSms';
import StatusDownload from './ViewCandidateStatusHistory/StatusDownload';
import View from './components/View';
import StatusView from './components/StatusView';
import { SelectOptionArray } from '@type/selection-option-type';

import { CandidateElectionFullDetailsListAdminProps } from '@hooks/candidate-info-management/nomination-list/useCandidateInformation';
import ReEditPermission from './components/ReEditPermission';
import UserProfileUpdate from './components/user-profile-update';
import { AllCandidateType } from '@hooks/election-schedule-management/other/candidate-type/useGetAllCandidateType';
import { dynamicColumnForCandidateType } from '@containers/candidate-info-management/helper/dynamicColumnForCandidateType';
import { dynamicColumnForElectionScheduleName } from '@containers/candidate-info-management/helper/dynamicColumnForElectionName';

export const nominatedCandidateTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION_DASHBOARD'),
  },
];

export const candidateStatusHistoryTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CANDIDATE_MANAGEMENT.CANDIDATE_STATUS_HISTORY_DASHBOARD'),
  },
];

export type NominationStatusUpdateValueType = {
  electionSettingsId: number | undefined;
  candidateElectionDetailsId: number | undefined;
  statusId: number | undefined;
};

export type CandidateTypeUpdateValueType = {
  electionSettingsId: number | undefined;
  candidateElectionDetailsId: number | undefined;
  candidateTypeId: number | undefined;
};

export const nominatedCandidateTableColumns = ({
  t,
  canViewStatusHistory,
  isAdmin = false,
  params,
  isDownload = false,
  getCandidateInformation,
  searchItems,
  nominationStatuses,
  allCandidateTypes,
  canChangeCandidateType,
  canViewSendSMS,
}: {
  t: TFunction<'translation', undefined>;
  canViewStatusHistory: boolean;
  isAdmin: boolean;
  params?: any;
  isDownload?: boolean;
  getCandidateInformation: ({
    page,
    size,
    searchItems,
  }: CandidateElectionFullDetailsListAdminProps) => void;
  searchItems: any;
  nominationStatuses?: SelectOptionArray[];
  allCandidateTypes?: AllCandidateType[];
  canViewSendSMS?: boolean;
  canChangeCandidateType: boolean;
}) => [
  {
    id: 1,
    name: t('CANDIDATE_MANAGEMENT.ID'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('CANDIDATE_MANAGEMENT.CANDIDATE_NAME_NO'),
    key: 'candidateNameFormSerialNo',
  },

  ...dynamicColumnForElectionScheduleName({ params, t }),

  ...dynamicColumnForElectionConstituency({ params, t }),

  {
    id: 4,
    name: t('CANDIDATE_MANAGEMENT.CANDIDATE_TYPE_NAME'),
    key: 'candidateChange',
    hide: !(canChangeCandidateType && !isDownload),
    render: (data: any, row: NominationType) => {
      return (
        <UpdateCandidateType
          row={row}
          getCandidateInformation={getCandidateInformation}
          allCandidateTypes={allCandidateTypes}
        />
      );
    },
  },

  ...dynamicColumnForCandidateType({
    params,
    isAdmin,
    hide: canChangeCandidateType && !isDownload,
  }),
  {
    id: 6,
    name: t('CANDIDATE_MANAGEMENT.NID'),
    key: 'nidNumber',
  },
  {
    id: 7,
    name: t('CANDIDATE_MANAGEMENT.PARTY'),
    key: 'politicalParty',
  },

  {
    id: 8,
    name: t('CANDIDATE_MANAGEMENT.NOMINATION'),
    key: 'nominationPercentageForDownload',
    hide: !isDownload,
  },
  {
    id: 9,
    name: t('CANDIDATE_MANAGEMENT.NOMINATION'),
    key: 'nominationPercentage',
    hide: isDownload,
    render: (data: any) => <Progress data={data} />,
  },

  {
    id: 10,
    name: t('CANDIDATE_MANAGEMENT.PERSONAL'),
    key: 'personalInfoPercentageForDownload',
    hide: !isDownload,
  },
  {
    id: 11,
    name: t('CANDIDATE_MANAGEMENT.PERSONAL'),
    key: 'personalInfoPercentage',
    hide: isDownload,
    render: (data: any) => <Progress data={data} />,
  },

  {
    id: 12,
    name: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
    key: 'holofnamaPercentageForDownload',
    hide: !isDownload,
  },
  {
    id: 13,
    name: t('CANDIDATE_MANAGEMENT.AFFIDAVIT'),
    key: 'holofnamaPercentage',
    hide: isDownload,
    render: (data: any) => <Progress data={data} />,
  },

  {
    id: 14,
    name: t('CANDIDATE_MANAGEMENT.ATTACHMENT'),
    key: 'attachmentExistsForDownload',
    hide: !isDownload,
  },
  {
    id: 15,
    name: t('CANDIDATE_MANAGEMENT.ATTACHMENT'),
    key: 'attachmentExists',
    hide: isDownload,
    render: (data: any) => <Status data={data} />,
  },

  {
    id: 16,
    name: t('CANDIDATE_MANAGEMENT.VERIFY'),
    key: 'isVerifiedForDownload',
    hide: !isDownload,
  },
  {
    id: 17,
    name: t('CANDIDATE_MANAGEMENT.VERIFY'),
    key: 'isVerified',
    hide: isDownload,
    render: (data: any) => <Status data={data} />,
  },

  {
    id: 18,
    name: t('CANDIDATE_MANAGEMENT.PICK_ACCEPT'),
    key: 'isSelectedForDownload',
    hide: !isDownload,
  },
  {
    id: 19,
    name: t('CANDIDATE_MANAGEMENT.PICK_ACCEPT'),
    key: 'isSelected',
    hide: isDownload,
    render: (data: any) => <Status data={data} />,
  },

  {
    id: 20,
    name: t('CANDIDATE_MANAGEMENT.SYMBOL_ALLOCATION'),
    key: 'symbolIdForDownload',
    hide: !isDownload,
  },
  {
    id: 21,
    name: t('CANDIDATE_MANAGEMENT.SYMBOL_ALLOCATION'),
    key: 'symbolId',
    hide: isDownload,
    render: (data: any) => <Status data={data} />,
  },

  {
    id: 22,
    name: t('CANDIDATE_MANAGEMENT.STATUS'),
    key: 'nominationStatus',
    render: (data: any, row: any) => {
      return isAdmin ? (
        <UpdateNominationStatus
          row={row}
          searchItems={searchItems}
          getCandidateInformation={getCandidateInformation}
          nominationStatuses={nominationStatuses}
        />
      ) : (
        <Badge
          className="text-nowrap"
          size="sm"
          label={data as string}
          type={
            data === t('CANDIDATE_MANAGEMENT.VERIFY') ? 'primary' : 'success'
          }
        />
      );
    },
  },

  {
    id: 23,
    name: t('CANDIDATE_MANAGEMENT.LAST_CHANGE'),
    key: 'lastUpdatedDate',
  },

  {
    id: 24,
    name: t('CANDIDATE_MANAGEMENT.ACTIONS'),
    key: 'process',
    hide: isDownload,
    render: (data: any, row: any) => <View row={row} />,
  },
  {
    id: 25,
    name: canViewStatusHistory ? t('CANDIDATE_MANAGEMENT.STATUS_HISTORY') : '',
    key: 'status_history',
    hide: isDownload,
    render: (data: any, row: any) =>
      canViewStatusHistory ? <StatusView row={row} /> : '',
  },
  {
    id: 27,
    name: t('CANDIDATE_MANAGEMENT.RE_EDIT'),
    key: 'reeditPermission',
    hide: !(canViewSendSMS && !isDownload),
    render: (data: any, row: any) => (
      <div className="mx-20 d-flex justify-content-center">
        <ReEditPermission
          rowData={row}
          getCandidateInformation={getCandidateInformation}
        />
      </div>
    ),
  },
  {
    id: 26,
    name: '',
    key: 'sendSMS',
    hide: !(canViewSendSMS && !isDownload),
    render: (data: any, row: any) => (
      <div className="d-flex">
        <SendSms row={row} />
        <UserProfileUpdate row={row} />
      </div>
    ),
  },
];

export const candidateStatusHistoryTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.NAME'),
    key: 'statusNameBn',
    render: (statusNameBn: string) => {
      return <Text>{statusNameBn || 'N/A'}</Text>;
    },
  },
  {
    id: 2,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.COMMENTS'),
    key: 'comments',
    render: (comments: string) => {
      return <Text>{comments || 'N/A'}</Text>;
    },
  },
  {
    id: 6,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.LOGIN_ID'),
    key: 'loginId',
  },
  {
    id: 3,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.UPDATED_BY'),
    key: 'updatedBy',
    render: (updatedBy: string) => <Text>{updatedBy || 'N/A'}</Text>,
  },
  {
    id: 4,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.UPDATED_AT'),
    key: 'updatedAt',
    render: (updatedAt: string) => (
      <Text className="text-nowrap">
        {updatedAt ? dayjs(updatedAt).format('YYYY-MM-DD hh:mm a') : 'N/A'}
      </Text>
    ),
  },
  {
    id: 5,
    name: t('CANDIDATE_MANAGEMENT.STATUS_HISTORY_TABLE.COLUMN.DOCUMENT'),
    key: 'file',
    render: (file: any) => <StatusDownload file={file} />,
  },
];

export const radioOptions = (t: TFunction<'translation', undefined>) => [
  {
    id: 'notPaying',
    value: 'notPaying',
    label: t('CANDIDATE_MANAGEMENT.NOT_PAYING_INCOME_TAX'),
  },
  {
    id: 'paying',
    value: 'paying',
    label: t('CANDIDATE_MANAGEMENT.PAYING_INCOME_TAX'),
  },
];

export const attachmentTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CANDIDATE_MANAGEMENT.FILE_NAME'),
    key: 'fileName',
  },
  {
    id: 2,
    name: t('CANDIDATE_MANAGEMENT.COMMENT'),
    key: 'comment',
  },
  {
    id: 3,
    name: '',
    key: 'procedure',
    render: (data: DownloadFileIdType, row: any) => {
      return data && Object.keys(data).length > 0 && data?.documentId ? (
        <Download data={data} isViewFile type={row.type} />
      ) : null;
    },
  },
];
