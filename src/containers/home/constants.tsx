import { ReactNode } from 'react';
import { TFunction } from 'i18next';
import { ROUTES } from '@constants/routes';
import CenterOfficerSvg from '@images/home-page-svg/center_officer.svg';
import CandidateInfoSvg from '@images/home-page-svg/candidate_info.svg';
import { isPermitted } from '@helpers/permission';
import { CENTER_OFFICER_MANAGEMENT } from '@constants/permissions/center-officer-management';

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
  // 3
  {
    text: t('CENTER_OFFICER_TOPBAR.POLITICAL_PARTY'),
    routeName: ROUTES.POLITICAL_PARTY,
    icon: <CenterOfficerSvg />,
    permission: CENTER_OFFICER_MANAGEMENT.POLITICAL_PARTY_VIEW,
    hide: isPermitted(
      permissionsArray,
      CENTER_OFFICER_MANAGEMENT.POLITICAL_PARTY_VIEW,
    ),
  },

  // 4
  {
    text: t('CENTER_OFFICER_TOPBAR.SYMBOL'),
    routeName: ROUTES.SYMBOL,
    icon: <CandidateInfoSvg />,
    permission: CENTER_OFFICER_MANAGEMENT.SYMBOL_VIEW,
    hide: permissionsArray?.includes(CENTER_OFFICER_MANAGEMENT.SYMBOL_VIEW),
  },
];
