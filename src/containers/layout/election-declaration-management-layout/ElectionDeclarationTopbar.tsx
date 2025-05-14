import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  IconHomeLine,
  IconSliders02,
  IconFingerPrint04,
  IconHome03,
} from '@pentabd/icons';
import { TopBar } from '@pentabd/ui';

import { ROUTES } from '@constants/routes';
import { ELECTION_SCHEDULE_DECLARATION } from '@constants/permissions/election-schedule-declaration';

import Logo from '@images/eclogo.svg';
import IconBookOpenText from '@images/icons/IconBookOpenText';
import IconCalendarBlank from '@images/icons/IconCalendarBlank';
import IconAddressBook from '@images/icons/IconAddressBook';
import IconGarage from '@images/icons/IconGarage';
import IconFlagBanner from '@images/icons/IconFlagBanner';
import IconGitDiff from '@images/icons/IconGitDiff';
import IconHourglassMedium from '@images/icons/IconHourglassMedium';
import RightSideNavMenu from '@components/RightSideNavMenu';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { DATA_PROVIDER_PERMISSION } from '@constants/permissions/data-provider-permission';
import { isPermitted } from '@helpers/permission';
import { VOTE_CENTER_MANAGEMENT } from '@constants/permissions/vote-center-management';

const TOPBAR_ELECTION_CHILD = (t: any) => {
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  return {
    leftSubMenus: [
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.SCHEDULE_DECLARATION'),
        url: ROUTES.DECLARE_SCHEDULE,
        icon: <IconBookOpenText />,
      },
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_SETTINGS'),
        url: ROUTES.ELECTION_SETTINGS,
        icon: <IconSliders02 size="20" fill="subtitle2" />,
      },
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.NOMINATION_FORM'),
        url: ROUTES.NOMINATION_LETTER,
        icon: <IconHome03 size="20" fill="subtitle2" />,
      },
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_CALENDAR'),
        url: ROUTES.ELECTION_CALENDER,
        icon: <IconCalendarBlank size="20" fill="subtitle2" />,
      },
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.PROBABLE_ELECTION'),
        url: ROUTES.POSSIBLE_ELECTION,
        icon: <IconHourglassMedium size="20" fill="subtitle2" />,
      },
      {
        name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_TRANSFER'),
        url: ROUTES.ELECTION_TRANSFER,
        icon: <IconGitDiff size="20" fill="subtitle2" />,
        hide: !permissionsArray?.includes(
          ELECTION_SCHEDULE_DECLARATION.CREATE_MIGRATE_SETTINGS,
        ),
      },
    ],
  };
};

const TOPBAR_ELECTION_MAIN_LIST_CHILD = (
  t: any,
  permissionsArray?: string[],
) => ({
  leftSubMenus: [
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.DIVISON'),
      url: ROUTES.DIVISION,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.DISTRICT'),
      url: ROUTES.DISTRICT,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.SUB_DISTRICT'),
      url: ROUTES.SUB_DISTRICT,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.UNION'),
      url: ROUTES.UNION,
    },
    {
      name: t('VOTE_CENTER_TOPBAR.UNION_WARD'),
      url: ROUTES.UNION_WARD,
      hide: !isPermitted(
        permissionsArray,
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_UNION_PARISHAD_WARD,
      ),
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.UNION_RESERVED_SEAT'),
      url: ROUTES.UNION_RESERVED_SEAT,

      hide: !isPermitted(
        permissionsArray,
        VOTE_CENTER_MANAGEMENT.MAIN_LIST_UNION_PARISHAD_RESERVED_SEAT,
      ),
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.MUNICIPALITY'),
      url: ROUTES.MUNICIPALITY,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.RESERVED_SEAT_LIST'),
      url: ROUTES.RESERVED_SEAT_LIST,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.PARLIAMENTARY_SEAT'),
      url: ROUTES.PARLIAMENTARY_SEAT,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.DISTRICT_WARD'),
      url: ROUTES.ZILLA_WARD,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.DISTRICT_RESERVED_SEAT'),
      url: ROUTES.DISTRICT_RESERVED_SEATS,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.MESSAGE_LIST'),
      url: ROUTES.MESSAGE_LIST,
    },
  ],
});

const TOPBAR_ELECTION_OTHERS_CHILD = (t: any) => ({
  leftSubMenus: [
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_TYPE'),
      url: ROUTES.ELECTION_TYPE,
      icon: <IconFingerPrint04 size="20" fill="subtitle2" />,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.CANDIDATE_TYPE'),
      url: ROUTES.CANDIDATE_TYPE,
      icon: <IconAddressBook size="20" fill="subtitle2" />,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.INSTITUTION_BUILDING_TYPE'),
      url: ROUTES.INSTITUTION_BUILDING_TYPE,
      icon: <IconGarage size="20" fill="subtitle2" />,
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.INSTITUTION_TYPE'),
      url: ROUTES.INSTITUTE_TYPE,
      icon: <IconFlagBanner size="20" fill="subtitle2" />,
    },
  ],
});

const ElectionDeclarationTopbar = () => {
  const { t } = useTranslation();
  const { keycloak } = useAuthWrapper();
  const permissionsArray = keycloak.realmAccess?.roles;

  const leftNavMenu = [
    {
      icon: <IconHomeLine size="24" fill="subtitle2" />,
      name: t('ELECTION_SCHEDULE_TOPBAR.HOME'),
      child: ROUTES.HOME,
    },

    {
      name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION'),
      child: TOPBAR_ELECTION_CHILD(t),
      hide: !isPermitted(
        permissionsArray,
        ELECTION_SCHEDULE_DECLARATION.ELECTION,
      ),
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_PROCESS'),
      child: {
        leftSubMenus: [
          {
            name: t('ELECTION_SCHEDULE_TOPBAR.ADD_SCHEDULE_INFO'),
            url: ROUTES.ADD_SCHEDULE_INFO,
          },
          {
            name: t('ELECTION_SCHEDULE_TOPBAR.DATA_PROVIDER_INFO'),
            url: ROUTES.DATA_PROVIDER_INFO,
            hide: !isPermitted(
              permissionsArray,
              DATA_PROVIDER_PERMISSION.DATA_PROVIDER_PERMISSION,
            ),
          },
        ],
      },
      hide: !isPermitted(
        permissionsArray,
        ELECTION_SCHEDULE_DECLARATION.ELECTION_PROCESS,
      ),
    },

    {
      name: t('ELECTION_SCHEDULE_TOPBAR.MAIN_LIST'),
      child: TOPBAR_ELECTION_MAIN_LIST_CHILD(t, permissionsArray),
      hide: !isPermitted(
        permissionsArray,
        ELECTION_SCHEDULE_DECLARATION.MAIN_LIST,
      ),
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.OTHERS'),
      child: TOPBAR_ELECTION_OTHERS_CHILD(t),
      hide: !isPermitted(
        permissionsArray,
        ELECTION_SCHEDULE_DECLARATION.OTHERS,
      ),
    },
    {
      name: t('ELECTION_SCHEDULE_TOPBAR.REPORT'),
      child: {
        leftSubMenus: [
          {
            name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_CEREMONY_INFORMATION'),
            url: ROUTES.ELECTION_CEREMONY_INFORMATION,
          },
          {
            name: t('ELECTION_SCHEDULE_TOPBAR.ELECTION_PROCEDURES_REPORT'),
            url: ROUTES.ELECTION_PROCEDURES_REPORT,
          },
        ],
      },
      hide: !isPermitted(
        permissionsArray,
        ELECTION_SCHEDULE_DECLARATION.REPORT,
      ),
    },
    // {
    //   icon: <IconCoinsSwap02 size="20" fill="subtitle2" />,
    //   name: t('ELECTION_SCHEDULE_TOPBAR.CHANGE_ELECTION'),
    //   child: ROUTES.HOME,
    //   hide: !permissionsArray?.includes(
    //     ELECTION_SCHEDULE_DECLARATION.ELECTION_CHANGE,
    //   ),
    // },
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
        leftNavMenu={leftNavMenu} // TODO fixing ui library
        userDetails={userDetails}
        Link={Link}
        dropdownMenu
      />
    </>
  );
};

export default ElectionDeclarationTopbar;
