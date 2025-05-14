import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TopBar } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import RightSideNavMenu from '@components/RightSideNavMenu';

import { ROUTES } from '@constants/routes';
import Logo from '@images/eclogo.svg';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

const CenterOfficerTopbar = () => {
  const { t } = useTranslation();

  const { roReportFilters } = useRoReportFiltersNew(true);
  const { isAdmin, setFiltersInRedux } = useFiltersRedux();

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

  useEffect(() => {
    if (!isAdmin) {
      setFiltersInRedux(roReportFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roReportFilters]);

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
