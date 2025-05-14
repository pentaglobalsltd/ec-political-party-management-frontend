import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconHomeLine } from '@pentabd/icons';
import { TopBar } from '@pentabd/ui';

import RightSideNavMenu from '@components/RightSideNavMenu';

import { ROUTES } from '@constants/routes';
import Logo from '@images/eclogo.svg';

const CenterOfficerTopbar = () => {
  const { t } = useTranslation();

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('CENTER_OFFICER_TOPBAR.HOME'),
      child: ROUTES.HOME,
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

export default CenterOfficerTopbar;
