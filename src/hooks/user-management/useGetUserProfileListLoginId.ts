import { useState } from 'react';
import { BulkUserProfiles } from '@type/user-management/user-profile-types';
import { getUserProfileListApi } from '@api/user-management-service/get-user-profiles';
import { SelectOptionArray } from '@type/selection-option-type';

export interface GetUserProfileList {
  searchItems: BulkUserProfiles;
  page?: number;
  size?: number;
  type?: string;
}

interface Props {
  getUserProfileLogInId: ({ searchItems }: GetUserProfileList) => void;
  userProfileLogInId: any[];
}

export const useUserProfileLogInId = (): Props => {
  const [userProfileLogInId, setUserProfileLogInId] = useState<
    SelectOptionArray[]
  >([]);

  const getUserProfileLogInId = async ({
    searchItems,
    page = 0,
    size = 100,
    type = 'ELECTION',
  }: GetUserProfileList) => {
    try {
      const response = await getUserProfileListApi(
        searchItems,
        page,
        size,
        type,
      );
      if (response?.data?.status === 200) {
        const data: any =
          response?.data?.data?.userProfiles?.map((item) => ({
            label: item.loginId,
            value: item.userId,
          })) || [];
        setUserProfileLogInId(data);
      }
    } catch {
      console.log('error');
    }
  };

  return {
    getUserProfileLogInId,
    userProfileLogInId,
  };
};
