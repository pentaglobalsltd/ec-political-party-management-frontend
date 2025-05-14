import { TFunction } from 'i18next';

import { Badge, InputText } from '@pentabd/ui';
import { IconPencil02, IconHomeLine, IconSearch } from '@pentabd/icons';

import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import DownloadPollingCenterDetailsSummary from './components/DownloadPollingCenterDetailsSummary';
import DownloadPollingCenterDetails from './components/DownloadPollingCenterDetails';
import { isPermitted } from '@helpers/permission';

export const electionSettingsTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_SETTINGS.ELECTION_SETTINGS'),
  },
];

export const electionSettingsTableHeader = {
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

export const electionSettingsTableColumns = ({
  t,
  rowEditHandler,
  isDownload = false,
  permissionsArray,
}: {
  t: TFunction<'translation', undefined>;
  rowEditHandler: (row: any) => void;
  isDownload?: boolean;
  getElectionSettingsData: any;
  permissionsArray?: string[];
}) => [
  {
    id: 1,
    name: t('ELECTION_SETTINGS.ELECTION_NAME'),
    key: 'electionSchedule',
  },
  {
    id: 2,
    name: t('ELECTION_SETTINGS.CANDIDATE_TYPE'),
    key: 'candidateType',
  },
  {
    id: 3,
    name: t('ELECTION_SETTINGS.DISTRICT'),
    key: 'zilla',
  },
  {
    id: 4,
    name: t('ELECTION_SETTINGS.SUB_DISTRICT'),
    key: 'upazila',
  },

  // missing
  {
    id: 5,
    name: t('ELECTION_SETTINGS.ELECTION_SEAT_NO'),
    key: 'constituencyCode',
  },
  {
    id: 6,
    name: t('ELECTION_SETTINGS.SEAT_NAME'),
    key: 'electionSettingsNameBn',
  },
  {
    id: 7,
    name: t('ELECTION_SETTINGS.MUNICIPALITY'),
    key: 'municipalityName',
  },
  {
    id: 8,
    name: t('ELECTION_SETTINGS.UNION'),
    key: 'unionOrWard',
  },
  {
    id: 9,
    name: t('ELECTION_SETTINGS.TAB_CENTER'),
    key: 'isResultFromTabForDownload',
  },
  {
    id: 10,
    name: t('ELECTION_SETTINGS.EVM'),
    key: 'votingType',
  },
  {
    id: 11,
    name: t('ELECTION_SETTINGS.UNION_WARD'),
    key: 'unionWard',
  },
  // {
  //   id: 12,
  //   name: t('ELECTION_SETTINGS.NOMINATION_LAST_DATE'),
  //   key: 'dateOfNominationSubmission',
  //   render: (data: string) => (
  //     <Tag
  //       label={data}
  //       size="sm"
  //       startIconType="icon"
  //       startIcon={<IconCalendar fill="fill-subtitle2" size="20" />}
  //       className="text-nowrap"
  //     />
  //   ),
  // },
  // {
  //   id: 13,
  //   name: t('ELECTION_SETTINGS.SCHEDULE_FILE'),
  //   key: 'scheduleFile',
  //   render: (data: DownloadFileIdType, row: any) => {
  //     return (
  //       <FileUpload
  //         row={row}
  //         data={data}
  //         getElectionSettingsData={getElectionSettingsData}
  //       />
  //     );
  //   },
  // },

  ...(isDownload
    ? [
        {
          id: 15,
          name: t('ELECTION_SETTINGS.STATUS'),
          key: 'isActiveForDownload',
        },
      ]
    : [
        {
          id: 15,
          name: t('ELECTION_SETTINGS.STATUS'),
          key: 'isActive',
          render: (data: boolean) => (
            <Badge
              className="text-nowrap"
              size="sm"
              label={data ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              type={data ? 'success' : 'danger'}
            />
          ),
        },
      ]),

  ...(isPermitted(
    permissionsArray,
    VOTE_CENTER_MANAGEMENT.POLLING_CENTER_DETAILS_REPORT,
  )
    ? [
        ...(isDownload
          ? []
          : [
              {
                id: 16,
                name: t('ELECTION_SETTINGS.GENERATE_PDF_LIST'),
                key: 'generateListPdf',
                render: (data: string, row: any) => (
                  <DownloadPollingCenterDetails row={row} />
                ),
              },
            ]),
      ]
    : []),

  ...(isPermitted(
    permissionsArray,
    VOTE_CENTER_MANAGEMENT.POLLING_CENTER_DETAILS_REPORT,
  )
    ? [
        ...(isDownload
          ? []
          : [
              {
                id: 17,
                name: t('ELECTION_SETTINGS.GENERATE_PDF_SUMMARY'),
                key: 'generateSummaryPdf',
                render: (data: string, row: any) => (
                  <DownloadPollingCenterDetailsSummary row={row} />
                ),
              },
            ]),
      ]
    : []),

  {
    id: 14,
    name: '',
    key: 'editColumn',
    render: (data: string, row: any) => (
      <div className="pointer" onClick={() => rowEditHandler(row)}>
        <IconPencil02 size="20" fill="primary" />
      </div>
    ),
  },
];

export const options = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];
