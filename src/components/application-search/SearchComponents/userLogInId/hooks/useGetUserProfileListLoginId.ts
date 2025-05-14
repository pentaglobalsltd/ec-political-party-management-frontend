import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import { getUserProfileListApi } from '../api/get-user-profiles';

export const useUserProfileLogInId = () => {
  const [userProfileLogInId, setUserProfileLogInId] = useState<
    SelectOptionArray[]
  >([]);

  const getUserProfileLogInId = async ({
    filter,
    type,
    sortBy,
    sortOrder,
  }: {
    filter: {
      [key: string]: string | number;
    };
    type?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      const response = await getUserProfileListApi({
        filter,
        type,
        sortBy,
        sortOrder,
      });
      if (response?.data?.status === 200) {
        const data: any =
          response?.data?.data?.userProfiles?.map((item) => ({
            label: item.loginId,
            value: item.userId,
          })) || [];
        setUserProfileLogInId(data);
      }
    } catch (error) {
      console.log('error');
    }
  };

  return {
    getUserProfileLogInId,
    userProfileLogInId,
  };
};
