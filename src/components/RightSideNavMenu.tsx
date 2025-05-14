import { useNavigate } from 'react-router-dom';
import { IconBell01 } from '@pentabd/icons';
import { Avatar, Dropdown } from '@pentabd/ui';
import { useTranslation } from 'react-i18next';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { ROUTES } from '@constants/routes';

const RightSideNavMenu = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const { logout } = keycloak;
  const navigate = useNavigate();

  return (
    <>
      <IconBell01 size="20" />

      <Dropdown
        buttonType="customIcon"
        customIcon={
          <Avatar
            imageURL="https://placehold.co/100x100/gray/white/?text=A"
            name="Penta"
            size="sm"
          />
        }
        info={{
          name: keycloak?.tokenParsed?.preferred_username,
          email: keycloak?.tokenParsed?.userType,
        }}
        listItem={[
          {
            name: t('REGISTRATION.UPDATE_PASSWORD'),
            onClick: () => {
              navigate(ROUTES.UPDATE_PASSWORD);
            },
          },

          {
            name: t('REGISTRATION.PROFILE'),
            onClick: () => {
              if (keycloak?.tokenParsed?.sub) {
                navigate(
                  ROUTES.PROFILE_EDIT_SYSTEM_USER(keycloak?.tokenParsed?.sub),
                );
              }
            },
          },

          {
            name: t('REGISTRATION.SIGN_OUT'),
            onClick: logout,
          },
        ]}
      />
    </>
  );
};

export default RightSideNavMenu;
