import { useState } from 'react';
import { UserProfiles } from '@type/user-management/user-profile-types';
import { apiGetUserProfileById } from '@api/user-management-service/get-user-profileById';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { useDispatch } from 'react-redux';
import { getUserProfileForElectionSettingsId } from '@reducers/user-profile/user-profile-election-settings-id';
import { getUserProfileForSelect } from '@reducers/user-profile/user-profile-for-select';
interface props {
  userId: string | number;
  reduxUpdate?: boolean;
}
function mapGetUserProfileById(data?: UserProfiles, lang?: string | null) {
  return {
    ...data,
    name: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
  };
}

export const useGetUserProfileById = () => {
  const dispatch = useDispatch();
  const [userProfileById, setUserProfileById] = useState<UserProfiles>();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const getUserProfileByIdData = async ({ userId, reduxUpdate }: props) => {
    try {
      setIsLoading(true);
      const response = await apiGetUserProfileById(userId);
      if (response?.data?.status === 200 && response?.data) {
        const data = mapGetUserProfileById(response?.data.data, language);

        if (reduxUpdate) {
          dispatch(
            getUserProfileForElectionSettingsId(data.electionSettingsIds),
          );
          dispatch(getUserProfileForSelect(data));
        }
        setUserProfileById(data);
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userProfileById,
    isLoading,
    isSuccess,
    getUserProfileByIdData,
  };
};
