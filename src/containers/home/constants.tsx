import { ReactNode } from 'react';
import { TFunction } from 'i18next';
import { ROUTES } from '@constants/routes';
import TofsilSvg from '@images/home-page-svg/tofsil.svg';
import VoteCenterSvg from '@images/home-page-svg/vote_center.svg';
import CenterOfficerSvg from '@images/home-page-svg/center_officer.svg';
import CandidateInfoSvg from '@images/home-page-svg/candidate_info.svg';
import ResultsSvg from '@images/home-page-svg/results.svg';
import UsersSvg from '@images/home-page-svg/users.svg';
import { HOME } from '@constants/permissions/home';
import { isPermitted } from '@helpers/permission';

export interface HomeCardType {
  permission: string;
  routeName: string;
  text: string;
  icon: ReactNode;
  hide: boolean;
}

export const getHomeCardArray = (
  t: TFunction<'translation', undefined>,
  permissionsArray: any,
): HomeCardType[] => [
  // 1
  {
    text: t('HOME.ELECTION_DECLARATION_MANAGEMENT'),
    routeName: ROUTES.ELECTION_DECLARATION_MANAGEMENT,
    icon: <TofsilSvg />,
    permission: HOME.EC_SCHEDULE,
    hide: isPermitted(permissionsArray, HOME.EC_SCHEDULE),
  },

  // 2
  {
    text: t('HOME.VOTE_CENTER_MANAGEMENT'),
    routeName: ROUTES.VOTE_CENTER_MANAGEMENT,
    icon: <VoteCenterSvg />,
    permission: HOME.VOTE_CENTER_MANAGEMENT,
    hide: permissionsArray?.includes(HOME.VOTE_CENTER_MANAGEMENT),
  },

  // 3
  {
    text: t('HOME.CENTER_OFFICER_MANAGEMENT'),
    routeName: ROUTES.CENTER_OFFICER_MANAGEMENT,
    icon: <CenterOfficerSvg />,
    permission: HOME.CENTER_OFFICER_MANAGEMENT,
    hide: isPermitted(permissionsArray, HOME.CENTER_OFFICER_MANAGEMENT),
  },

  // 4
  {
    text: t('HOME.CANDIDATE_INFO_MANAGEMENT'),
    routeName: ROUTES.CANDIDATE_INFO_MANAGEMENT,
    icon: <CandidateInfoSvg />,
    permission: HOME.CANDIDATE_INFO,
    hide: permissionsArray?.includes(HOME.CANDIDATE_INFO),
  },

  // 5
  {
    text: t('HOME.RESULT_MANAGEMENT'),
    routeName: ROUTES.RESULT_MANAGEMENT,
    icon: <ResultsSvg />,
    permission: HOME.RESULT_MANAGEMENT,
    hide: permissionsArray?.includes(HOME.RESULT_MANAGEMENT),
  },

  // 6
  {
    text: t('HOME.USER_MANAGEMENT'),
    routeName: ROUTES.USER_MANAGEMENT,
    icon: <UsersSvg />,
    permission: HOME.USER_MANAGEMENT,
    hide: permissionsArray?.includes(HOME.USER_MANAGEMENT),
  },
];
