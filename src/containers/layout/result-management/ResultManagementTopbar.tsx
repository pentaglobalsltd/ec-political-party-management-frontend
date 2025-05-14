import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconHomeLine } from '@pentabd/icons';
import { TopBar } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { RESULT_MANAGEMENT } from '@constants/permissions/result-management';
import RightSideNavMenu from '@components/RightSideNavMenu';
import Logo from '@images/eclogo.svg';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { useGetUserProfileById } from '@hooks/user-management/useGetUserProfileById';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

const ResultManagementTopBar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;
  const { isAdmin, setFiltersInRedux } = useFiltersRedux();

  const userId = keycloak.tokenParsed?.sub;
  const { getUserProfileByIdData } = useGetUserProfileById();

  const { roReportFilters } = useRoReportFiltersNew(true);

  useEffect(() => {
    if (userId) {
      getUserProfileByIdData({ userId, reduxUpdate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!isAdmin) {
      setFiltersInRedux(roReportFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roReportFilters]);

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },
    {
      name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.ELECTION_PROCESS'),
      child: {
        leftSubMenus: [
          //"ফলাফল দাখিল সারাংশ
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.SUBMIT_RESULTS_SUMMARY'),
            url: ROUTES.SUBMIT_RESULTS_SUMMARY,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SUBMIT_SUMMARY,
            ),
          },
          //ফলাফল সারাংশ
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_SUMMARY'),
            url: ROUTES.RESULTS_SUMMARY,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SUMMARY,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULT'),
            url: ROUTES.RESULTS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_MENU,
            ),
          },
          //বার্তা প্রেরণ শীট প্রস্তুত
          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.SEND_MESSAGE_SHEET_PREPARATION',
            ),
            url: ROUTES.MESSAGE_SENDING_LIST_PREPARE,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_PREP,
            ),
          },
          //বার্তা প্রেরণ শীট প্রকাশ
          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.SEND_MESSAGE_SHEET_PUBLICATION',
            ),
            url: ROUTES.MESSAGE_SEND_LIST_PUBLISH,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_PUBLISH_MENU,
            ),
          },
          //বার্তা প্রেরণ শীট তালিকা
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.SEND_MESSAGE_SHEET_LIST'),
            url: ROUTES.MESSAGE_SEND_LIST,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_BARTA_SHEET_LIST,
            ),
          },

          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.CENTER_LIST'),
            url: ROUTES.CENTER_LIST,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_POLLING_CENTER_LIST,
            ),
          },

          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULT_AND_SITUATION_ANALYSIS',
            ),
            url: ROUTES.RESULT_AND_SITUATION_ANALYSIS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SITUATION,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.VOTING_CENTER_HALT'),
            url: ROUTES.VOTE_CENTER_HALT,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_POLLING_CENTER_SUSPEND,
            ),
          },

          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.SUBMIT_RESULTS'),
            url: ROUTES.SUBMIT_RESULTS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_RESULT_SUBMIT_MENU,
            ),
          },

          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.POSTAL_BALLOT'),
            url: ROUTES.POSTAL_BALLOT,
            hide: !permissionsArray?.includes(RESULT_MANAGEMENT.POSTAL_BALLOT),
          },
        ],
      },
    },
    {
      name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.REPORT'),
      hide: !permissionsArray?.includes(RESULT_MANAGEMENT.REPORT_MENU_ITEM),
      child: {
        leftSubMenus: [
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.CONSOLIDATED_STATEMENT'),
            url: ROUTES.CONSOLIDATED_STATEMENET,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_CONSOLIDATED_REPORT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.ELECTION_RESULT'),
            url: ROUTES.ELECTION_RESULT,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_ELECTION_REPORT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.TIME_BASED_RESULT'),
            url: ROUTES.TIME_BASED_RESULT,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_TIME_BASED_REPORT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.GROUP_BASED_REPORT'),
            url: ROUTES.GROUP_BASED_REPORT,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_PARTY_BASED_REPORT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.NINETEENTH_FORM'),
            url: ROUTES.NINETEENTH_FORM,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_NINETEENTH_FORM,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.WINNING_CANDIDATES'),
            url: ROUTES.WINNING_CANDIDATES,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.REPORT_WINNING_CANDIDATES,
            ),
          },
        ],
      },
    },
    {
      name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_MONITORING'),
      hide: !permissionsArray?.includes(
        RESULT_MANAGEMENT.RESULT_MONITORING_MENU_ITEM,
      ),
      child: {
        leftSubMenus: [
          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.MONITORING_OVERALL_RESULTS',
            ),
            url: ROUTES.MONITORING_OVERALL_RESULTS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.RESULT_MONITORING_RESULT_OBSERVATION,
            ),
          },
          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.CENTER_BASED_MONITORING_RESULTS',
            ),
            url: ROUTES.CENTER_BASED_MONITORING_RESULTS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.RESULT_MONITORING_CENTER_WISE_RESULT_MONITORING,
            ),
          },
          // সর্বশেষ প্রাপ্ত ফলাফল
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.LATEST_RESULTS_OBTAINED'),
            url: ROUTES.LATEST_RESULTS_OBTAINED,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.ELECTION_PROCESS_LATEST_APPROVED_RESULT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.GRAPHICAL_OBSERVATION'),
            url: ROUTES.GRAPHICAL_OBSERVATION,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.RESULT_MONITORING_GRAPHICAL_OBSERVATION_DASHBOARD,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.DRAFT_RESULTS'),
            url: ROUTES.DRAFT_RESULTS,
            hide: !permissionsArray?.includes(
              RESULT_MANAGEMENT.RESULT_MONITORING_RESULTS_DRAFT,
            ),
          },
          {
            name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_RETURN_LOG'),
            url: ROUTES.RESULTS_RETURN_LOG,
            hide: true,
          },
          {
            name: t(
              'ADMIN_RESULT_MANAGEMENT_TOPBAR.RESULTS_PUBLISHED_ON_WEBSITE',
            ),
            url: ROUTES.RESULTS_PUBLISHED_ON_WEBSITE,
            hide: true,
          },
        ],
      },
    },
    // {
    //   icon: <IconCoinsSwap02 size="20" fill="subtitle2" />,
    //   name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.CHANGE_ELECTION'),
    //   child: ROUTES.HOME,
    //   hide: !permissionsArray?.includes(RESULT_MANAGEMENT.ELECTION_CHANGE),
    // },
    {
      name: t('ADMIN_RESULT_MANAGEMENT_TOPBAR.HELPLINE'),
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

export default ResultManagementTopBar;
