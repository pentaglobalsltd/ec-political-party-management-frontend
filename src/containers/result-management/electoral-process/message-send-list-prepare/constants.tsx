import { TFunction } from 'i18next';

import { IconHomeLine } from '@pentabd/icons';
import { ROUTES } from '@constants/routes';

export const messageSendListPrepareBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('MESSAGE_SEND_LIST_PREPARE.MESSAGE_SEND_LIST_PREPARE'),
    URL: ROUTES.MESSAGE_SENDING_LIST_PREPARE,
  },
];

export const inputs = {
  electionName: true,
  candidateType: true,
};
