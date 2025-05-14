import { TFunction } from 'i18next';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { DownloadButtons, InputText } from '@pentabd/ui';
import { dynamicColumnForElectionConstituency } from '@containers/candidate-info-management/helper/dynamicColumnForElectionConstituency';

export const getSelectionBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('SELECTION.BREADCRUMB.SELECTION'),
  },
];

export const selectionTableHeader = {
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
  rightComponents: [<DownloadButtons key={2} fileName={'test'} />],
};

export const selectionTableColumns = ({
  t,
  selectionTable,
  params,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  selectionTable: string;
  params: any;
  isDownload?: boolean;
}) => [
  {
    id: 1,
    name: t(`${selectionTable}.SERIAL`),
    key: 'serialNo',
  },

  {
    id: 2,
    name: t(`${selectionTable}.CANDIDATE_NAME`),
    key: 'candidateName',
  },

  {
    id: 3,
    name: t(`${selectionTable}.POSITION_NAME`),
    key: 'candidateType',
  },

  ...dynamicColumnForElectionConstituency({ params, t }),

  ...(isDownload
    ? [
        {
          id: 5,
          name: t(`${selectionTable}.IS_AGE_CORRECT`),
          key: 'isCandidateAgeCorrectForDownload',
        },
      ]
    : [
        {
          id: 5,
          name: t(`${selectionTable}.IS_AGE_CORRECT`),
          key: 'isCandidateAgeCorrect',
        },
      ]),

  ...(isDownload
    ? [
        {
          id: 6,
          name: t(`${selectionTable}.IS_CANDIDATE_NID_CORRECT`),
          key: 'candidateVoterNoCorrectForDownload',
        },
      ]
    : [
        {
          id: 6,
          name: t(`${selectionTable}.IS_CANDIDATE_NID_CORRECT`),
          key: 'candidateVoterNoCorrect',
        },
      ]),

  {
    id: 7,
    name: t(`${selectionTable}.CANDIDATE_NID`),
    key: 'voterNo',
  },

  ...(isDownload
    ? [
        {
          id: 8,
          name: t(`${selectionTable}.IS_PROPOSER_NID_CORRECT`),
          key: 'proposerVoterNoCorrectForDownload',
        },
      ]
    : [
        {
          id: 8,
          name: t(`${selectionTable}.IS_PROPOSER_NID_CORRECT`),
          key: 'proposerVoterNoCorrect',
        },
      ]),

  {
    id: 9,
    name: t(`${selectionTable}.PROPOSER_NID`),
    key: 'proposerVoterNo',
  },

  ...(isDownload
    ? [
        {
          id: 10,
          name: t(`${selectionTable}.IS_SUPPORTER_NID_CORRECT`),
          key: 'supporterVoterNoCorrectForDownload',
        },
      ]
    : [
        {
          id: 10,
          name: t(`${selectionTable}.IS_SUPPORTER_NID_CORRECT`),
          key: 'supporterVoterNoCorrect',
        },
      ]),

  {
    id: 11,
    name: t(`${selectionTable}.SUPPORTER_NID`),
    key: 'supporterVoterNo',
  },

  ...(!isDownload
    ? [
        {
          id: 12,
          name: t(`${selectionTable}.INFO`),
          key: 'INFO',
        },

        {
          id: 13,
          name: t(`${selectionTable}.REASON_FOR_ACCEPTANCE_OR_CANCELLATION`),
          key: 'REASON_FOR_ACCEPTANCE_OR_CANCELLATION',
        },

        {
          id: 14,
          name: t(`${selectionTable}.ATTACHMENT`),
          key: 'ATTACHMENT',
        },

        {
          id: 15,
          name: t(`${selectionTable}.FILE`),
          key: 'FILE',
        },

        {
          id: 16,
          name: t(`${selectionTable}.ACTION`),
          key: 'ACTION',
        },
      ]
    : []),
];
