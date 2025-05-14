import { ROUTES } from '@constants/routes';
import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const winningCandidatesBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('WINNING_CANDIDATES.WINNING_CANDIDATES'),
    URL: ROUTES.WINNING_CANDIDATES,
  },
];
