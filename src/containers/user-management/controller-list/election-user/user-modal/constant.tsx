import { TFunction } from 'i18next';
import Actions from './Actions';
import ManageUser from './ManageUser';

export const modalTableColumns = ({
  t,
  getUserProfileListData,
  officerId,
  manageTableModal,
}: {
  t: TFunction<'translation', undefined>;
  getUserProfileListData: ({ userId }: { userId: string | number }) => void;
  officerId: string;
  manageTableModal: (data: boolean) => void;
}) => [
  {
    id: 11,
    name: t('ELECTION_USER.NAME'),
    key: 'name',
  },
  {
    id: 12,
    name: t('ELECTION_USER.EMAIL'),
    key: 'email',
  },
  {
    id: 13,
    name: t('ELECTION_USER.LOGIN_ID'),
    key: 'loginId',
  },
  {
    id: 14,
    name: t('ELECTION_USER.INCLUSION'),
    key: 'affiliation',
    render: (data: string) => (
      <div dangerouslySetInnerHTML={{ __html: data }}></div>
    ),
  },
  {
    id: 15,
    name: t('ELECTION_USER.CONDITION'),
    key: 'isActive',
    render: (data: any, row: any) => (
      <ManageUser
        data={data}
        row={row}
        getUserProfileListData={getUserProfileListData}
        officerId={officerId}
        manageTableModal={manageTableModal}
      />
    ),
  },
  {
    id: 16,
    name: t('ELECTION_USER.PROCESS'),
    key: 'process',
    render: (data: any, row: any) => (
      <Actions
        row={row}
        getUserProfileListData={getUserProfileListData}
        officerId={officerId}
        manageTableModal={manageTableModal}
      />
    ),
  },
];
