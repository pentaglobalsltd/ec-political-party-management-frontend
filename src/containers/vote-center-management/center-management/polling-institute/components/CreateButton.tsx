import { IconPlus } from '@pentabd/icons';
import { Button } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import { ROUTES } from '@constants/routes';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { isPermitted } from '@helpers/permission';

function CreateButton() {
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const { t } = useTranslation();
  const navigate = useNavigate();

  return isPermitted(
    permissionsArray,
    VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_INSTITUTE_FULL_PERMISSION,
  ) ? (
    <Button
      key={1}
      type="primary"
      htmlType="button"
      onClick={() => navigate(ROUTES.CREATE_POLLING_INSTITUTE)}
    >
      <IconPlus size="20" fill="light" />
      {t('POLLING_INSTITUTE.ADD_NEW')}
    </Button>
  ) : (
    <></>
  );
}

export default CreateButton;
