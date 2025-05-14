import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';

import { getDigitBanglaFromEnglish } from '@utils';

export const voterListModalViewTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t(
      'MESSAGE_SEND_LIST_PUBLISH.VIEW_CENTER_MODAL.VOTE_CENTER_LIST_COL_SERIAL',
    ),
    key: 'pollingCenterSerial',
    render: (data: any) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },
  {
    id: 2,
    name: t(
      'MESSAGE_SEND_LIST_PUBLISH.VIEW_CENTER_MODAL.VOTE_CENTER_LIST_COL_CENTER_NAME',
    ),
    key: 'pollingCenterNameBn',
    render: (data: any) => <Text>{data}</Text>,
  },
];
