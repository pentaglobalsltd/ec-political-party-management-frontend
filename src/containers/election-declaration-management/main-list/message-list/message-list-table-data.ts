import { TFunction } from 'i18next';

export const messageListTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: '',
  },
  {
    id: 2,
    name: t('MESSAGE_LIST.MESSAGE_LIST_EVENT_BN'),
  },
  {
    id: 3,
    name: t('MESSAGE_LIST.MESSAGE_LIST_EVENT_EN'),
  },
  // {
  //   id: 4,
  //   name: '',
  // },
];
