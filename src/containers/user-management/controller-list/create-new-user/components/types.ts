import { UserProfiles } from '@type/user-management/user-profile-types';

export interface UserSpecificComponentProps {
  viewProfile?: boolean;
  reeditNomination?: boolean;
  userRoleWatch?: string;
  userId?: string;
  userProfileById?: UserProfiles;
  setUserRoleValidation?: any;
  postReeditNominationPermission?: any;
}
