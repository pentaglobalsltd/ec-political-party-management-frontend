import { TFunction } from 'i18next';

import { Button, InputText, Text } from '@pentabd/ui';
import { IconHomeLine, IconSearch } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { getDigitBanglaFromEnglish } from '@utils';
import { ELECTION_TYPE } from '@containers/user-management/controller-list/constants';

export const voteCenterHaltBreadcrumbs = (
  t: TFunction<'translation', undefined>,
) => [
  {
    icon: <IconHomeLine fill="dark" size="20" />,
  },
  {
    label: t('VOTE_CENTER_HALT.TITLE'),
    URL: ROUTES.VOTE_CENTER_HALT,
  },
];

export const activeTableHeader = {
  leftComponents: [
    <InputText
      key={1}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
};

export const cancelledTableColumns = ({
  t,
  openCancelModal,
  isDownload,
  electionTypeId
}: {
  t: TFunction<'translation', undefined>;
  openCancelModal: (row: any) => void;
  isDownload: boolean;
  electionTypeId: number;
}) => [
  {
    id: 1,
    name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_ZILA'),
    key: 'zillaName',
    render: (data: string) => <Text>{data}</Text>,
  },
  {
    id: 2,
    name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_UPAZILA'),
    key: 'upazilaName',
    render: (data: string) => <Text>{data}</Text>,
  },
  {
    id: 3,
    name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_UNION/WARD'),
    key: 'unionOrWardName',
    render: (data: string) => <Text>{data}</Text>,
  },
  ...(
    electionTypeId && electionTypeId===ELECTION_TYPE.UNION_ELECTION ?
      [
        {
          id: 4,
          name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_UNIONWARD'),
          key: 'unionWardName',
          render: (data: string) => <Text>{data}</Text>,
        },
      ] : []
  ),
  {
    id: 5,
    name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_CENTER_NAME'),
    key: 'pollingInstituteNameAndDesc',
  },
  {
    id: 6,
    name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_CENTER_NO'),
    key: 'serial',
    render: (data: string) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },

  ...(isDownload
    ? []
    : [
        {
          id: 7,
          name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_STEP'),
          key: 'step',
          render: (data: any, row: any) => {
            return (
              <Button
                size="xs"
                fill="outline"
                type="success"
                onClick={() => openCancelModal(row)}
              >
                {t('VOTE_CENTER_HALT.ACTIVE_BUTTON')}
              </Button>
            );
          },
        },
      ]),
];

export const cancelledTableHeader = {
  leftComponents: [
    <InputText
      key={2}
      name="pre-input"
      outline
      placeholder="Search"
      prefix={<IconSearch size="20" />}
      size="md"
      type="text"
      status="default"
    />,
  ],
};

export const activeTableColumns = ({
  t,
  openCancelModal,
  isDownload,
  electionTypeId
}: {
  t: TFunction<'translation', undefined>;
  openCancelModal: (row: any) => void;
  isDownload: boolean;
  electionTypeId: number;
}) => [
  {
    id: 1,
    name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_ZILA'),
    key: 'zillaName',
    render: (data: string) => <Text>{data}</Text>,
  },
  {
    id: 2,
    name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_UPAZILA'),
    key: 'upazilaName',
    render: (data: string) => <Text>{data}</Text>,
  },
  {
    id: 3,
    name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_UNION/WARD'),
    key: 'unionOrWardName',
    render: (data: string) => <Text>{data}</Text>,
  },
  ...(
    electionTypeId && electionTypeId===ELECTION_TYPE.UNION_ELECTION ?
      [
        {
          id: 4,
          name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_UNIONWARD'),
          key: 'unionWardName',
          render: (data: string) => <Text>{data}</Text>,
        },
      ] : []
  ),
  {
    id: 5,
    name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_CENTER_NAME'),
    key: 'pollingInstituteNameAndDesc',
  },
  {
    id: 6,
    name: t('VOTE_CENTER_HALT.CANCELLED_TABLE_COL_CENTER_NO'),
    key: 'serial',
    render: (data: string) => <Text>{getDigitBanglaFromEnglish(data)}</Text>,
  },

  ...(isDownload
    ? []
    : [
        {
          id: 7,
          name: t('VOTE_CENTER_HALT.ACTIVE_TABLE_COL_STEP'),
          key: 'step',
          render: (data: string, row: any) => {
            return (
              <Button
                size="xs"
                fill="outline"
                type="danger"
                onClick={() => openCancelModal(row)}
              >
                {t('VOTE_CENTER_HALT.CANCEL_BUTTON')}
              </Button>
            );
          },
        },
      ]),
];
