import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const CWNSCReportTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('CWNSC_REPORT.CWNSC_REPORT_TITLE'),
  },
];

export const CWNSCReportTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.CONSTITUENCY'),
    key: 'constituency',
  },
  {
    id: 2,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.ONLINE_SUBMISSION'),
    key: 'total',
  },
  {
    id: 3,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.ACCEPTANCE'),
    key: 'acceptance',
  },
  {
    id: 4,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.SELECTION_CANCELLATION'),
    key: 'selectionCancellation',
  },
  {
    id: 5,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.WITHDRAWAL'),
    key: 'withdrawal',
  },
  {
    id: 6,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.APPEAL_VALID'),
    key: 'appealValid',
  },
  {
    id: 7,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.APPEAL_CANCELLATION'),
    key: 'appealCancellation',
  },
  {
    id: 8,
    name: t('CWNSC_REPORT.CWNSC_REPORT_COLUMN.CANDIDATE_CONFIRMATION'),
    key: 'symbolAllocated',
  },
];
