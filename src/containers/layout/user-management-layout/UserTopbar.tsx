import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconHomeLine } from '@pentabd/icons';
import { TopBar } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { USER_MANAGEMENT } from '@constants/permissions/user-management';
import Logo from '@images/eclogo.svg';
import RightSideNavMenu from '@components/RightSideNavMenu';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

const UserTopbar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('USER_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },
    {
      name: t('USER_TOPBAR.CONTROLLER_LIST'),
      child: {
        leftSubMenus: [
          {
            name: t('HOME.USER_MANAGEMENT'),
            url: ROUTES.USER_MANAGEMENT,
          },
        ],
      },
      hide: !permissionsArray?.includes(USER_MANAGEMENT.CONTROLLER_LIST),
    },
    {
      name: t('USER_TOPBAR.OTHERS'),
      child: {
        leftSubMenus: [
          {
            name: t('USER_TOPBAR.SYSTEM_LOG'),
            url: ROUTES.SYSTEM_LOG,
          },
        ],
      },
      hide: !permissionsArray?.includes(USER_MANAGEMENT.OTHERS),
    },
    // {
    //   icon: <IconCoinsSwap02 size="20" fill="subtitle2" />,
    //   name: t('USER_TOPBAR.CHANGE_ELECTION'),
    //   child: ROUTES.HOME,
    //   hide: !permissionsArray?.includes(USER_MANAGEMENT.CHANGE_ELECTION),
    // },
    {
      name: t('USER_TOPBAR.HELPLINE'),
      child: ROUTES.HELPLINE,
    },
  ];

  const brand = {
    icon: <Logo />,
    link: '#',
  };

  const userDetails = {
    name: 'Olivia Rhye',
    email: 'olivia@pentabd.com',
    component: <RightSideNavMenu />,
  };

  return (
    <>
      <TopBar
        brand={brand}
        leftNavMenu={leftNavMenu}
        userDetails={userDetails}
        Link={Link}
        dropdownMenu
      />
    </>
  );
};

export default UserTopbar;
