import { TFunction } from 'i18next';
import { IconSearch } from '@pentabd/icons';
import { InputText } from '@pentabd/ui';
import Actions from './Actions';
import { UserProfiles } from '@type/user-management/user-profile-types';
import ManageUser from './ManageUser';

export const electionUserTableHeader = {
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

export const electionUserTableColumns = ({
  t,
  isDownload = false,
  getUserProfileListData,
  manageUserData,
  manageTableModal,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  getUserProfileListData: any;
  manageUserData: (data: UserProfiles) => void;
  manageTableModal: (data: boolean) => void;
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
    render: (data: string) => (
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    ),
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
    render: (data: any, row: UserProfiles) => (
      <Actions
        row={row}
        getUserProfileListData={getUserProfileListData}
        manageUserData={manageUserData}
        manageTableModal={manageTableModal}
      />
    ),
  },
];
