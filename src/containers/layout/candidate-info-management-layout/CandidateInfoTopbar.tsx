import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TopBar } from '@pentabd/ui';
import { IconHomeLine } from '@pentabd/icons';

import RightSideNavMenu from '@components/RightSideNavMenu';

import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import useNominationSteps from '@hooks/candidate-info-management/controller-list/nomination-status/useNominationSteps';
import useRoReportFiltersNew from '@hooks/candidate-info-management/report/useRoReportFiltersNew';
import { useGetUserProfileById } from '@hooks/user-management/useGetUserProfileById';

import { ROUTES } from '@constants/routes';
import { CANDIDATE_MANAGEMENT } from '@constants/permissions/candidate-management';
import Logo from '@images/eclogo.svg';

const CandidateInfoTopbar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();

  useNominationSteps();

  const permissionsArray = keycloak?.realmAccess?.roles;
  const userId = keycloak?.tokenParsed?.sub;

  const { getUserProfileByIdData } = useGetUserProfileById();

  useEffect(() => {
    if (userId) getUserProfileByIdData({ userId, reduxUpdate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const { roReportFilters } = useRoReportFiltersNew();
  const { isAdmin, setFiltersInRedux } = useFiltersRedux();

  function candidateManagementSubmenu(name: string) {
    if (
      permissionsArray?.includes(
        CANDIDATE_MANAGEMENT.CANDIDATE_MANAGEMENT_MENU_FULL_PERMISSION,
      )
    ) {
      return false;
    } else if (permissionsArray?.includes(name)) {
      return false;
    } else {
      return true;
    }
  }
  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('CANDIDATE_INFO_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },

    // topbar - প্রার্থী ব্যবস্থাপনা
    {
      name: t('CANDIDATE_INFO_TOPBAR.CANDIDATE_MANAGEMENT'),
      hide: !permissionsArray?.includes(
        CANDIDATE_MANAGEMENT.CANDIDATE_MANAGEMENT_MENU,
      ),
      child: {
        leftSubMenus: [
          // RO - প্রার্থী ব্যবস্থাপনা - home (প্রার্থী মনোনয়ন ড্যাশবোর্ড)
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATE_MANAGEMENT'),
            url: ROUTES.CANDIDATE_MANAGEMENT,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.NOMINATION_DASHBOARD,
            ),
          },

          // RO - অনলাইনে আবেদনকৃত প্রার্থী
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATES_APPLIED_ONLINE'),
            url: ROUTES.CANDIDATES_APPLIED_ONLINE,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_APPLIED_ONLINE,
            ),
          },

          // RO - প্রার্থী নিশ্চিতকরন
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATE_CONFIRMATION'),
            url: ROUTES.CANDIDATE_CONFIRMATION,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_CONFIRMATION,
            ),
          },

          // RO - যাচাই
          {
            name: t('CANDIDATE_INFO_TOPBAR.VERIFY'),
            url: ROUTES.CANDIDATE_VERIFY,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_VERIFICATION,
            ),
          },

          // RO - বাছাই
          {
            name: t('CANDIDATE_INFO_TOPBAR.PICK'),
            url: ROUTES.SELECTION,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_SELECTION,
            ),
          },

          // RO - গ্রহণ
          {
            name: t('CANDIDATE_INFO_TOPBAR.ACCEPT'),
            url: ROUTES.ACCEPT,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_SELECTION,
            ),
          },

          // RO - আপিল
          {
            name: t('CANDIDATE_INFO_TOPBAR.APPEAL'),
            url: ROUTES.APPEAL,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_APPEAL,
            ),
          },

          // RO - প্রার্থীতা প্রত্যাহার
          {
            name: t('CANDIDATE_INFO_TOPBAR.WITHDRAWAL_OF_CANDIDATURE'),
            url: ROUTES.WITHDRAWAL_OF_CANDIDATURE,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_CANCELATION,
            ),
          },

          // RO - প্রতীক বরাদ্দ
          {
            name: t('CANDIDATE_INFO_TOPBAR.SYMBOL_ALLOCATION'),
            url: ROUTES.SYMBOL_ALLOCATION,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_SYMBOL_ALLOCATION,
            ),
          },

          // বিনা প্রতিদ্বন্দ্বিতায় নির্বাচিত
          {
            name: t('CANDIDATE_INFO_TOPBAR.UNOPPOSED_ELECTED'),
            url: ROUTES.CANDIDATE_UNOPPOSED_ELECTED,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.F_CAND_UNANIMOUS_ELECTED,
            ),
          },

          // RO - ম্যানুয়াল চালানের তথ্য
          {
            name: t('CANDIDATE_INFO_TOPBAR.MANUAL_SHIPMENT_INFORMATION'),
            url: ROUTES.MANUAL_SHIPMENT_INFO,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.MANUAL_CHALAN,
            ),
          },
          // OPERATOR - প্রার্থী মনোনয়ন
          {
            name: t('CANDIDATE_INFO_TOPBAR.NOMINATION_OF_CANDIDATES'),
            url: ROUTES.NOMINATION_OF_CANDIDATES,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_NOMINATION,
            ),
          },

          // OPERATOR - প্রার্থীর ব্যাক্তিগত তথ্যাদি
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATES_PERSONAL_INFO'),
            url: ROUTES.CANDIDATES_PERSONAL_INFO,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_PERSONAL,
            ),
          },

          {
            name: t('CANDIDATE_INFO_TOPBAR.NOMINATION_ATTACHMENT'),
            url: ROUTES.NOMINATION_ATTACHMENT,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_ATTACHMENT,
            ),
          },

          // OPERATOR - হলফনামা
          {
            name: t('CANDIDATE_INFO_TOPBAR.AFFIDAVIT'),
            url: ROUTES.AFFIDAVIT,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_AFFIDAVIT,
            ),
          },

          {
            name: t('CANDIDATE_INFO_TOPBAR.ASSET_LIABILITIES_1'),
            url: ROUTES.ASSET_LIABILITIES,
            // hide: candidateManagementSubmenu(
            //   CANDIDATE_MANAGEMENT.CANDIDATE_SYMBOL_ALLOCATION,
            // ),
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_ASSET_YEARLY_INCOME,
            ), // TODO
          },

          {
            name: t('CANDIDATE_INFO_TOPBAR.ELECTION_EXPENSE_1'),
            url: ROUTES.ELECTION_EXPENSE,
            // hide: candidateManagementSubmenu(
            //   CANDIDATE_MANAGEMENT.CANDIDATE_SYMBOL_ALLOCATION,
            // ),
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_EXPENDITURE,
            ), /// TODO
          },
          //Admin- প্রার্থী মনোনয়ন পরিসংখ্যান
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATE_NOMINATION_STATISTICS'),
            url: ROUTES.CANDIDATE_NOMINATION_STATISTICS,
            hide: candidateManagementSubmenu(
              CANDIDATE_MANAGEMENT.CANDIDATE_ELECTION_STATISTICS,
            ),
          },
        ],
      },
    },
    {
      name: t('CANDIDATE_INFO_TOPBAR.REPORT'),
      hide: !permissionsArray?.includes(CANDIDATE_MANAGEMENT.REPORT),
      child: {
        leftSubMenus: [
          {
            name: t('CANDIDATE_INFO_TOPBAR.CANDIDATES_COMMUNICATION'),
            url: ROUTES.CANDIDATES_COMMUNICATION,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.NOMINATION_PAPER_INFORMATION'),
            url: ROUTES.NOMINATION_PAPER_INFORMATION,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.VALID_NOMINATED_CANDIDATE_LIST'),
            url: ROUTES.VALID_NOMINATED_CANDIDATE_LIST,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.ELECTED_CANDIDATES_DETAILS'),
            url: ROUTES.ELECTED_CANDIDATES_LIST,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.CONTESTING_CANDIDATES_LIST'),
            url: ROUTES.CONTESTING_CANDIDATES_LIST,
          },
          // back-end said to make it disabled.
          // {
          //   name: t('CANDIDATE_INFO_TOPBAR.CONTENDING_CANDIDATES_NUMBER'),
          //   url: ROUTES.CONTENDING_CANDIDATES_NUMBER,
          // },
          {
            name: t('CANDIDATE_INFO_TOPBAR.CIB_REPORT'),
            url: ROUTES.CIB_REPORT,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.CWNSC_REPORT'),
            url: ROUTES.CWNSC_REPORT,
            hide: !permissionsArray?.includes(
              CANDIDATE_MANAGEMENT.CWNSC_REPORT,
            ),
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.PPWNSC_REPORT'),
            url: ROUTES.PPWNSC_REPORT,
            hide: !permissionsArray?.includes(
              CANDIDATE_MANAGEMENT.PPWNSC_REPORT,
            ),
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.BAIL_FORFEITED_LIST'),
            url: ROUTES.BAIL_FORFEITED_LIST,
            hide: !permissionsArray?.includes(
              CANDIDATE_MANAGEMENT.BAIL_FORFEITED_LIST,
            ),
          },
        ],
      },
    },

    // সংখ্যাভিত্তিক প্রতিবেদন
    {
      name: t('CANDIDATE_INFO_TOPBAR.NUMERICAL_REPORTING'),
      hide: !permissionsArray?.includes(CANDIDATE_MANAGEMENT.NUMERIC_REPORT),
      child: {
        leftSubMenus: [
          {
            name: t('CANDIDATE_INFO_TOPBAR.NUMERICAL_REPORTING_1'),
            url: ROUTES.NUMERICAL_REPORTING_1,
          },
          {
            name: t('CANDIDATE_INFO_TOPBAR.NUMERICAL_REPORTING_2'),
            url: ROUTES.NUMERICAL_REPORTING_2,
          },
        ],
      },
    },

    // ডাইনামিক রিপোর্ট
    {
      name: t('CANDIDATE_INFO_TOPBAR.DYNAMIC_REPORT'),
      child: ROUTES.DYNAMIC_REPORT,
      hide: !permissionsArray?.includes(CANDIDATE_MANAGEMENT.DYNAMIC_REPORT),
    },

    // হেল্পলাইন
    {
      name: t('CANDIDATE_INFO_TOPBAR.HELPLINE'),
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
    <TopBar
      brand={brand}
      leftNavMenu={leftNavMenu}
      userDetails={userDetails}
      Link={Link}
      dropdownMenu
    />
  );
};

export default CandidateInfoTopbar;
