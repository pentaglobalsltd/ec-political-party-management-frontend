import { useTranslation } from 'react-i18next';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';
import { homeRoles } from '@constants/permissions/mock_permission';
import { HomeCardType, getHomeCardArray } from '@containers/home/constants';

interface UseHome {
  homeCardArray: HomeCardType[];
}

export const useHome = (): UseHome => {
  const { t } = useTranslation();

  const { keycloak } = useAuthWrapper();

  let permissionsArray: string[] = [];

  if (import.meta.env.VITE_LOCAL_SETTING === 'true') {
    permissionsArray = [...homeRoles];
  } else {
    permissionsArray = keycloak.realmAccess?.roles || [];
  }

  const homeCardArray: HomeCardType[] = getHomeCardArray(
    t,
    permissionsArray,
  ).filter((item) => item.hide);

  return {
    homeCardArray,
  };
};
