import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export enum REPORT_TYPE {
  CSV = 'csv',
  JSON = 'json',
  EXCEL = 'excel',
}

export const dynamicReportBreadcrumbs = ({
  t,
  isCreate,
}: {
  t: TFunction<'translation', undefined>;
  isCreate: boolean;
}) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('DYNAMIC_REPORT.DYNAMIC_REPORT'),
  },

  ...(isCreate
    ? [{ label: t('DYNAMIC_REPORT.CREATE') }]
    : [{ label: t('DYNAMIC_REPORT.EDIT') }]),
];
