import { TFunction } from 'i18next';
import { Text } from '@pentabd/ui';
import { getDigitBanglaFromEnglish } from '@utils';

export const voterListModalTableColumns = (
  t: TFunction<'translation', undefined>,
) => [
  {
    id: 1,
    name: t(
      'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.VOTE_CENTER_LIST_COL_SERIAL',
    ),
    key: 'pollingCenterSerial',
    render: (data: any) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },
  {
    id: 2,
    name: t(
      'ARO_VIEW_RESULT_MANAGEMENT_MESSAGE_BOARD_LIST.VOTE_CENTER_LIST_COL_CENTER_NAME',
    ),
    key: 'pollingCenterName',
    render: (data: any) => <Text>{data}</Text>,
  },
];

export const ACTION_VIEW_MODE = {
  CENTER_BASED: 'center-based',
};
