import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const PPWNSCReportTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('PPWNSC_REPORT.PPWNSC_REPORT_TITLE'),
  },
];

export const PPWNSCReportTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.NAME'),
    key: 'politicalParty',
  },
  {
    id: 2,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.ONLINE_SUBMISSION'),
    key: 'total',
  },
  {
    id: 3,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.ACCEPTANCE'),
    key: 'totalAcceptanceAppealValid',
  },
  {
    id: 4,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.SELECTION_CANCELLATION'),
    key: 'allCancelSum',
  },
  {
    id: 5,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.WITHDRAWAL'),
    key: 'withdrawal',
  },
  {
    id: 8,
    name: t('PPWNSC_REPORT.PPWNSC_REPORT_COLUMN.CANDIDATE_CONFIRMATION'),
    key: 'symbolAllocated',
  },
];
