import { TFunction } from 'i18next';
import { IconHomeLine } from '@pentabd/icons';

export const newElectionSettingsBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('ELECTION_SETTINGS.ELECTION_SETTINGS'),
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

export const VOTING_TYPE = {
  BALLOT: 'ব্যালট',
  EVM: 'ই.ভি.এম',
};
