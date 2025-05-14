import { TFunction } from 'i18next';
import { IconSearch } from '@pentabd/icons';
import { InputText } from '@pentabd/ui';

import { USER_ROLE_TYPE } from '../constants';
import Actions from './Actions';
import ManageUser from './ManageUser';
import {
  BulkUserProfiles,
  UserProfiles,
} from '@type/user-management/user-profile-types';
import { GetUserProfileList } from '@hooks/user-management/useGetUserProfileListLoginId';

export const automaticUserTableHeader = {
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

export const automaticUserTableColumns = ({
  t,
  isDownload = false,
  searchItems,
  getUserProfileListData,
}: {
  t: TFunction<'translation', undefined>;
  isDownload?: boolean;
  searchItems: BulkUserProfiles;
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
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
    render: (data: any, row: UserProfiles) => (
      <ManageUser
        data={data}
        row={row}
        getUserProfileListData={getUserProfileListData}
        searchItems={searchItems}
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
        searchItems={searchItems}
      />
    ),
  },
];

export const userTypeCodes = `${USER_ROLE_TYPE.DATA_ENTRY_OFFICER},${USER_ROLE_TYPE.RETURNING_OFFICER},${USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER},${USER_ROLE_TYPE.ASSISTANT_RETURNING_OFFICER_OPERATOR}`;
