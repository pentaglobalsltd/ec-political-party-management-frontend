import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const resultsSummaryTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_SUMMARY'),
  },
];

export const ASSISTANT_RETURNING_OFFICER = '1010';
