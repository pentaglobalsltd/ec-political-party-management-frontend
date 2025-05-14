import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { isPermitted } from '@helpers/permission';

function CreateButton() {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const navigate = useNavigate();

  const permissionsArray = keycloak.realmAccess?.roles;

  const pollingCenterPermissionList = (permission: string) => {
    if (
      permissionsArray?.includes(
        VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_FULL,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, permission);
  };

  return pollingCenterPermissionList(
    VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER_ADD,
  ) ? (
    <Button
      key={1}
      type="primary"
      htmlType="button"
      onClick={() => navigate(ROUTES.NEW_CENTER)}
    >
      <IconPlus size="20" fill="light" />
      {t('VOTE_CENTER_ADDITION.ADD_NEW')}
    </Button>
  ) : (
    <></>
  );
}

export default CreateButton;
