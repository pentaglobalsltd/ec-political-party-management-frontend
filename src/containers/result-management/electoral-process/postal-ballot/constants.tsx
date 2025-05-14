import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const postalBallotBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('POSTAL_BALLOT.HEADER'),
  },
];
