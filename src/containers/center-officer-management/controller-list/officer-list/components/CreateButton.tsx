import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconPlus } from '@pentabd/icons';
import { Button, Text } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { isPermitted } from '@helpers/permission';

function CreateButton() {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();

  const permissionsArray = keycloak.realmAccess?.roles;

  function pollingPersonnelPermission(name: string) {
    if (
      permissionsArray?.includes(
        CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_FULL_PERMISSION,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, name);
  }

  return pollingPersonnelPermission(
    CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_CREATE_EDIT_PERMISSION,
  ) ? (
    <Link to={ROUTES.CREATE_OFFICER}>
      <Button type="primary" htmlType="button" size="sm">
        <IconPlus size="20" fill="light" />
        <Text weight="semibold" size="sm">
          {t('OFFICER_LIST.ADD_NEW_BUTTON')}
        </Text>
      </Button>
    </Link>
  ) : (
    <></>
  );
}

export default CreateButton;
