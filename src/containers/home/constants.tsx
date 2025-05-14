import { ROUTES } from '@constants/routes';
import CandidateInfoSvg from '@images/home-page-svg/candidate_info.svg';
import CenterOfficerSvg from '@images/home-page-svg/center_officer.svg';
import { TFunction } from 'i18next';
import { ReactNode } from 'react';

export interface HomeCardType {
  routeName: string;
  text: string;
  icon: ReactNode;
}

export const getHomeCardArray = (
  t: TFunction<'translation', undefined>,
): HomeCardType[] => [
  // 3
  {
    text: t('CENTER_OFFICER_TOPBAR.POLITICAL_PARTY'),
    routeName: ROUTES.POLITICAL_PARTY,
    icon: <CenterOfficerSvg />,
  },

  // 4
  {
    text: t('CENTER_OFFICER_TOPBAR.SYMBOL'),
    routeName: ROUTES.SYMBOL,
    icon: <CandidateInfoSvg />,
  },
];
