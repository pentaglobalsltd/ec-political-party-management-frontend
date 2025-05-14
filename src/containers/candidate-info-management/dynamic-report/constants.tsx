import { Path } from 'react-router-dom';
import { TFunction } from 'i18next';

import { Button } from '@pentabd/ui';
import { IconPlus, IconHomeLine } from '@pentabd/icons';

import DownloadReportButtons from './components/DownloadButtons';

import { ROUTES } from '@constants/routes';
import { MappedDynamicReportType } from '@type/candidate-info-management/dynamic-report/dynamic-report-listing-type';
import Actions from './components/Actions';

export const HeaderAction = ({
  t,
  navigate,
  canEdit,
}: {
  t: TFunction<'translation', undefined>;
  navigate: (to: string | Partial<Path>) => void;
  canEdit?: boolean;
}) =>
  canEdit
    ? [
        <Button
          key={1}
          type="primary"
          htmlType="button"
          size="sm"
          onClick={() => navigate(ROUTES.CREATE_DYNAMIC_REPORT)}
        >
          <IconPlus size="20" fill="light" />
          {t('DYNAMIC_REPORT.CREATE')}
        </Button>,
      ]
    : [<></>];

export const DynamicReportBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DYNAMIC_REPORT.DYNAMIC_REPORT'),
  },
];

export const TableColumns = ({
  t,
  canEdit,
  navigate,
  deleteDynamicReportByIdData,
}: {
  t: TFunction<'translation', undefined>;
  canEdit?: boolean;
  navigate: (to: string | Partial<Path>) => void;
  deleteDynamicReportByIdData: (reportId: number) => void;
}) => [
  {
    id: 1,
    name: t('DYNAMIC_REPORT.COL_SERIAL'),
    key: 'idx',
  },
  {
    id: 2,
    name: t('DYNAMIC_REPORT.COL_NAME'),
    key: 'name',
  },
  {
    id: 3,
    name: t('DYNAMIC_REPORT.COL_DOWNLOAD'),
    key: 'download',
    render: (data: string, row: MappedDynamicReportType) => (
      <DownloadReportButtons data={row} />
    ),
  },

  ...(canEdit
    ? [
        {
          id: 4,
          name: t('DYNAMIC_REPORT.COL_ACTION'),
          key: 'edit',
          render: (data: string, row: MappedDynamicReportType) => (
            <Actions
              rowId={row?.id}
              navigate={navigate}
              deleteDynamicReportByIdData={deleteDynamicReportByIdData}
            />
          ),
        },
      ]
    : []),
];
