import { HomeCardType, getHomeCardArray } from '@containers/home/constants';
import { useTranslation } from 'react-i18next';

interface UseHome {
  homeCardArray: HomeCardType[];
}

export const useHome = (): UseHome => {
  const { t } = useTranslation();

  const homeCardArray: HomeCardType[] = getHomeCardArray(t);

  return {
    homeCardArray,
  };
};
