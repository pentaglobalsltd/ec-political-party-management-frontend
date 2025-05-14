import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { IconPlus } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import { ROUTES } from '@constants/routes';
import { isPermitted } from '@helpers/permission';

function CreateButton() {
  const { keycloak } = useAuthWrapper();

  const permissionsArray = keycloak.realmAccess?.roles;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const voterAreaPermissionList = (permission: string) => {
    if (
      permissionsArray?.includes(
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_FULL_PERMISSION,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, permission);
  };

  const isCreateButtonPermission = () => {
    return (
      voterAreaPermissionList(
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_CREATE_PERMISSION,
      ) &&
      voterAreaPermissionList(
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA_FULL_PERMISSION,
      )
    );
  };

  return isCreateButtonPermission() ? (
    <Button
      key={1}
      type="primary"
      htmlType="button"
      onClick={() => navigate(ROUTES.CREATE_VOTER_AREA)}
    >
      <IconPlus size="20" fill="light" />
      {t('VOTER_AREA.ADD_NEW_VOTER_AREA')}
    </Button>
  ) : (
    <></>
  );
}

export default CreateButton;
