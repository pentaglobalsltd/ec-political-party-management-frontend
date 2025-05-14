import RightSideNavMenu from '@components/RightSideNavMenu';
import { ROUTES } from '@constants/routes';
import Logo from '@images/eclogo.svg';
import { IconHomeLine } from '@pentabd/icons';
import { TFunction } from 'i18next';

export const brand = {
  icon: <Logo />,
  link: '/',
};

export const userDetails = {
  name: 'Olivia Rhye',
  email: 'olivia@pentabd.com',
  component: <RightSideNavMenu />,
};

export const getLeftNavMenu = (t: TFunction<'translation', undefined>) => [
  {
    icon: <IconHomeLine size="24" fill="subtitle2" />,
    name: t('REGISTRATION.HOME'),
    child: ROUTES.HOME,
  },
];
