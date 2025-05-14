import { TFunction } from 'i18next';
import { IconSearch } from '@pentabd/icons';
import { InputText } from '@pentabd/ui';
import ManageUser from './ManageUser';
import Actions from './Actions';

export const systemUserTableHeader = {
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

export const systemUserTableColumns = ({
  t,
  isDownload = false,
  getUserProfileListData,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getUserProfileListData: any;
}) => [
  {
    id: 1,
    name: t('ELECTION_USER.NAME'),
    key: 'name',
  },
  {
    id: 2,
    name: t('ELECTION_USER.EMAIL'),
    key: 'email',
  },
  {
    id: 3,
    name: t('ELECTION_USER.LOGIN_ID'),
    key: 'loginId',
  },
  {
    id: 4,
    name: t('ELECTION_USER.INCLUSION'),
    key: 'affiliation',
  },

  {
    id: 5,
    name: t('ELECTION_USER.CONDITION'),
    hide: !isDownload,
    key: 'status',
  },

  {
    id: 6,
    name: t('ELECTION_USER.CONDITION'),
    key: 'isActive',
    hide: isDownload,
    render: (data: any, row: any) => (
      <ManageUser
        data={data}
        row={row}
        getUserProfileListData={getUserProfileListData}
      />
    ),
  },

  {
    id: 7,
    name: t('ELECTION_USER.PROCESS'),
    key: 'process',
    hide: isDownload,
    render: (data: any, row: any) => (
      <Actions row={row} getUserProfileListData={getUserProfileListData} />
    ),
  },
];
