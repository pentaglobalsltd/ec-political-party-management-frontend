import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Table } from '@pentabd/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants/routes';
import { IconPlus } from '@pentabd/icons';
import { USER_PROFILE_LIST_TYPE } from '../../constants';

import { useAROOperatorList } from '@hooks/user-management/useAROOperatorList';
import { UserProfiles } from '@type/user-management/user-profile-types';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { USER_MANAGEMENT } from '@constants/permissions/user-management';
import { modalTableColumns } from './constant';

export interface OperatorTableProps {
  officerDetails: UserProfiles;
  manageTableModal: (data: boolean) => void;
}

const TableModal = ({
  officerDetails,
  manageTableModal,
}: OperatorTableProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const activePermission = Boolean(
    permissionsArray?.includes(USER_MANAGEMENT.EDIT_USERS_IN_USER_MANAGEMENT),
  );

  const { getAROOperatorList, userProfileList, loading } = useAROOperatorList();

  useEffect(() => {
    if (officerDetails?.userId)
      getAROOperatorList({ userId: officerDetails?.userId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [officerDetails?.userId]);

  const handleNavigate = () => {
    if (officerDetails?.userId) {
      navigate({
        pathname: ROUTES.CREATE_SYSTEM_USER(officerDetails?.userId),
        search: `type=${USER_PROFILE_LIST_TYPE.ELECTION}&userType=ARO_OP`,
      });
    }
  };

  return (
    <div className="p-12 user-table-card ">
      <div className="d-flex justify-content-end mb-10 py-4">
        {activePermission ? (
          <Button
            key={1}
            type="primary"
            htmlType="button"
            size="sm"
            onClick={handleNavigate}
          >
            <IconPlus size="20" fill="light" /> {t('ELECTION_USER.ADD_NEW')}
          </Button>
        ) : null}
      </div>

      <Table
        rows={userProfileList}
        loading={loading}
        columns={modalTableColumns({
          t,
          getUserProfileListData: getAROOperatorList,
          manageTableModal,
          officerId: officerDetails?.userId as string,
        })}
        loadingItemCount={3}
      />
    </div>
  );
};

export default TableModal;
