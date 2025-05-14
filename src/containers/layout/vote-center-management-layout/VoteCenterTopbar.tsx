import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TopBar } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import RightSideNavMenu from '@components/RightSideNavMenu';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';

import { ROUTES } from '@constants/routes';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';
import Logo from '@images/eclogo.svg';
import { isPermitted } from '@helpers/permission';

const VoteCenterTopbar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const { roReportFilters } = useRoReportFiltersNew(true);
  const { isAdmin, setFiltersInRedux } = useFiltersRedux();

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('VOTE_CENTER_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },
    {
      name: t('VOTE_CENTER_TOPBAR.MAIN_LIST'),
      hide: !isPermitted(
        permissionsArray,
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_DROPDOWN,
      ),
      child: {
        leftSubMenus: [
          {
            name: t('VOTE_CENTER_TOPBAR.VOTER_AREA'),
            url: ROUTES.VOTER_AREA,
            hide: !isPermitted(
              permissionsArray,
              VOTE_CENTER_MANAGEMENT.MAIN_LIST_VOTER_AREA,
            ),
          },
        ],
      },
    },
    {
      name: t('VOTE_CENTER_TOPBAR.CENTER_MANAGEMENT'),
      child: {
        leftSubMenus: [
          {
            name: t('VOTE_CENTER_TOPBAR.VOTE_CENTER_ADDITION'),
            url: ROUTES.VOTE_CENTER_ADDITION,
            hide: !isPermitted(
              permissionsArray,
              VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_CENTER,
            ),
          },
          {
            name: t('VOTE_CENTER_TOPBAR.POLLING_INSTITUTE'),
            url: ROUTES.POLLING_INSTITUTE,
            hide: !isPermitted(
              permissionsArray,
              VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT_POLLING_INSTITUTE,
            ),
          },
        ],
      },
    },
    // রিপোর্ট
    {
      name: t('VOTE_CENTER_TOPBAR.REPORT'),
      child: {
        leftSubMenus: [
          // গেজেটেড ভোটকেন্দ্রের তালিকা ও সার-সংক্ষেপ
          {
            name: t('VOTE_CENTER_TOPBAR.POLLING_CENTER_DETAILS'),
            url: ROUTES.POLLING_CENTER_DETAILS_REPORT,
            hide: !isPermitted(
              permissionsArray,
              VOTE_CENTER_MANAGEMENT.POLLING_CENTER_DETAILS_REPORT,
            ),
          },
        ],
      },
    },
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

export default VoteCenterTopbar;
