import { TFunction } from 'i18next';
import { DownloadButtons, InputText } from '@pentabd/ui';
import { IconHomeLine, IconSearch } from '@pentabd/icons';
import { resultStatusBadge } from '@containers/result-management/electoral-process/message-send-list/helpers';
import { getElectionSpecificColumns } from './helper/get-election-specific-columns';
import CenterList from './component/CenterList';
import DownloadFile from './component/DownloadFile';

export const GENERATED_BY = {
  ARO: 'ARO',
  RO: 'RO',
};

export const FINAL_SHEET_STATUS = 'FINAL';

// Table =====================================================

export const graphicalObservationTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('GRAPHICAL_OBSERVATION.GRAPHICAL_OBSERVATION'),
  },
];

export const graphicalObservationTableHeader = {
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

export const graphicalObservationTableColumns = ({
  t,
  electionTypeId,
  candidateTypeId,
  isDownload = false,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: string | number | undefined;
  candidateTypeId: number | undefined;
  isDownload?: boolean;
}) => [
  {
    id: 2,
    name: t('GRAPHICAL_OBSERVATION.DISTRICT'),
    key: 'zillaName',
  },

  ...getElectionSpecificColumns({ t, electionTypeId, candidateTypeId }),

  {
    id: 4,
    name: t('GRAPHICAL_OBSERVATION.CANDIDATE_TYPE'),
    key: 'candidateTypeName',
  },
  {
    id: 5,
    name: t('GRAPHICAL_OBSERVATION.CREATOR'),
    key: 'generatedByUserLoginId',
  },

  ...(isDownload
    ? [
        {
          id: 7,
          name: t('GRAPHICAL_OBSERVATION.MESSAGE_SHEET_PUBLISHED_BY_RO'),
          key: 'finalFileByROforTableDownload',
        },
      ]
    : [
        {
          id: 7,
          name: t('GRAPHICAL_OBSERVATION.MESSAGE_SHEET_PUBLISHED_BY_RO'),
          key: 'finalFileByRO',
          render: (data: any, row: any) => <DownloadFile row={row} />,
        },
      ]),

  {
    id: 8,
    name: t('GRAPHICAL_OBSERVATION.TOTAL_CENTERS'),
    key: 'totalCenterCount',
  },
  {
    id: 9,
    name: t('GRAPHICAL_OBSERVATION.MSG_BOARD_INCLUDED_CENTERS'),
    key: 'bartaSheetPollingCenterResultsLength',
    render: (data: any, row: any) => <CenterList row={row} />,
  },
  ...(isDownload
    ? [
        {
          id: 10,
          name: t('GRAPHICAL_OBSERVATION.CONDITION'),
          key: 'statusForDownload',
        },
      ]
    : [
        {
          id: 10,
          name: t('GRAPHICAL_OBSERVATION.CONDITION'),
          key: 'sheetStatus',
          render: (data: any) => (
            <div className="d-flex">{resultStatusBadge(data, t)}</div>
          ),
        },
      ]),
];

// Chart =====================================================

export const chartColors1 = [
  '#2E90FA',
  '#F79009',
  '#17B26A',
  '#EE46BC',
  '#6172F3',
  '#4E5BA6',
  '#FF5733',
  '#FFC300',
  '#C70039',
  '#900C3F',
  '#581845',
  '#FF8C00',
  '#FFD700',
  '#7FFF00',
  '#6495ED',
  '#00FFFF',
  '#9400D3',
  '#FF1493',
  '#48C9B0',
  '#8E44AD',
  '#D35400',
  '#2980B9',
  '#16A085',
  '#8E44AD',
  '#F1C40F',
  '#27AE60',
  '#6C3483',
  '#1ABC9C',
  '#E74C3C',
  '#3498DB',
];

export const chartColors2 = [
  '#E74C3C',
  '#1ABC9C',
  '#6C3483',
  '#27AE60',
  '#F1C40F',
  '#8E44AD',
  '#16A085',
  '#2980B9',
  '#D35400',
  '#8E44AD',
  '#48C9B0',
  '#FF1493',
  '#9400D3',
  '#00FFFF',
  '#6495ED',
  '#7FFF00',
  '#FFD700',
  '#FF8C00',
  '#581845',
  '#900C3F',
  '#C70039',
  '#FFC300',
  '#FF5733',
  '#4E5BA6',
  '#6172F3',
  '#EE46BC',
  '#17B26A',
  '#F79009',
  '#2E90FA',
];

export const chartColors3 = [
  '#9B59B6',
  '#3498DB',
  '#1ABC9C',
  '#27AE60',
  '#F39C12',
  '#E67E22',
  '#D35400',
  '#E74C3C',
  '#F1C40F',
  '#2ECC71',
  '#8E44AD',
  '#2C3E50',
  '#2980B9',
  '#16A085',
  '#2E86C1',
  '#E74C3C',
  '#A569BD',
  '#D98880',
  '#17A589',
  '#85C1E9',
  '#F5B041',
  '#AF7AC5',
  '#BB8FCE',
  '#E59866',
  '#48C9B0',
  '#E74C3C',
  '#AED6F1',
  '#E74C3C',
  '#E74C3C',
  '#E74C3C',
];
