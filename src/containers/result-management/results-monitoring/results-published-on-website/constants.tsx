import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';

export const resultsPublishedOnWebsiteTableBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('RESULTS_PUBLISHED_ON_WEBSITE.RESULTS_PUBLISHED_ON_WEBSITE'),
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
