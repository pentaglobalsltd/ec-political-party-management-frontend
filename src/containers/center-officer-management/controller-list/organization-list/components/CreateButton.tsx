import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Text } from '@pentabd/ui';
import { IconPlus } from '@pentabd/icons';

import { ROUTES } from '@constants/routes';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { isPermitted } from '@helpers/permission';

function CreateButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  function organizationListPermission(name: string) {
    if (
      permissionsArray?.includes(
        CENTER_OFFICER_MANAGEMENT.AGENCY_FULL_PERMISSION,
      )
    ) {
      return true;
    }
    return isPermitted(permissionsArray, name);
  }

  return organizationListPermission(
    CENTER_OFFICER_MANAGEMENT.AGENCY_CREATE_EDIT_PERMISSION,
  ) ? (
    <Button
      type="primary"
      htmlType="button"
      size="sm"
      onClick={() =>
        navigate(
          `${ROUTES.CENTER_OFFICER_MANAGEMENT}/${ROUTES.ORGANIZATION_LIST}/${ROUTES.CREATE_ORGANIZATION_LIST}`,
        )
      }
    >
      <IconPlus size="20" fill="light" />
      <Text weight="semibold" size="sm">
        {t('ORGANIZATION_LIST.ADD_NEW_BUTTON')}
      </Text>
    </Button>
  ) : (
    <></>
  );
}

export default CreateButton;
