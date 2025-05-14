import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TopBar } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import RightSideNavMenu from '@components/RightSideNavMenu';

import { ROUTES } from '@constants/routes';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';
import Logo from '@images/eclogo.svg';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { isPermitted } from '@helpers/permission';

const CenterOfficerTopbar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();

  const { roReportFilters } = useRoReportFiltersNew(true);
  const { isAdmin, setFiltersInRedux } = useFiltersRedux();

  const permissionsArray = keycloak.realmAccess?.roles;

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('CENTER_OFFICER_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },
    {
      name: t('CENTER_OFFICER_TOPBAR.CONTROLLER_LIST'),
      hide: !isPermitted(
        permissionsArray,
        CENTER_OFFICER_MANAGEMENT.CONTROLLER_LIST_VIEW,
      ),
      child: {
        leftSubMenus: [
          {
            name: t('CENTER_OFFICER_TOPBAR.POLITICAL_PARTY'),
            url: ROUTES.POLITICAL_PARTY,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.POLITICAL_PARTY_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.SYMBOL'),
            url: ROUTES.SYMBOL,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.SYMBOL_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.ORGANIZATION_LIST'),
            url: ROUTES.ORGANIZATION_LIST,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.AGENCY_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.OFFICER_LIST'),
            url: ROUTES.OFFICER_LIST,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.CENTER_BASED_OFFICER_DISTRIBUTION'),
            url: ROUTES.CENTER_BASED_OFFICER_DISTRIBUTION,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.POLLING_PERSONNEL_ALLOCATE_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.CENTER_BASED_OFFICER_LIST'),
            url: ROUTES.CENTER_BASED_OFFICER_LIST,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.CENTER_WISE_POLLING_PERSONNEL_VIEW,
            ),
          },
          {
            name: t('CENTER_OFFICER_TOPBAR.CENTER_OFFICER_CONTACT_DETAILS'),
            url: ROUTES.CENTER_OFFICER_CONTACT_DETAILS,
            hide: !isPermitted(
              permissionsArray,
              CENTER_OFFICER_MANAGEMENT.CENTER_OFFICER_CONTACT_DETAILS,
            ),
          },
        ],
      },
    },
    // {
    //   icon: <IconCoinsSwap02 size="24" fill="subtitle2" />,
    //   name: t('CENTER_OFFICER_TOPBAR.CHANGE_ELECTION'),
    //   child: ROUTES.HOME,
    //   hide: !permissionsArray?.includes(
    //     CENTER_OFFICER_MANAGEMENT.ELECTION_CHANGE,
    //   ),
    // },
    {
      name: t('CENTER_OFFICER_TOPBAR.SEND_SMS'),
      child: ROUTES.CENTER_OFFICER_SEND_SMS,
      hide: !isPermitted(
        permissionsArray,
        CENTER_OFFICER_MANAGEMENT.C_BULK_SMS_POLLING_PERSONNEL,
      ),
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

export default CenterOfficerTopbar;
