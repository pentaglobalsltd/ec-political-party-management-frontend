import { HOME } from '@constants/permissions/home';

export const isPermitted = (permissionsArray: string[] = [], name: string) => {
  // if (permissionsArray?.includes(HOME.SUPER_ADMIN)) {
  //   return true;
  // } else if (permissionsArray?.includes(name)) {
  //   return true;
  // } else {
  //   return false;
  // }

  return (
    permissionsArray?.includes(HOME.SUPER_ADMIN) ||
    permissionsArray?.includes(name)
  );
};
