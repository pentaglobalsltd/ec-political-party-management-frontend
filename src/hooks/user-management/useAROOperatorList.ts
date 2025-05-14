import { useState } from 'react';
import {
  BulkUserProfiles,
  // GetUserProfiles,
  UserProfiles,
} from '@type/user-management/user-profile-types';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchOperatorsByARO } from '@api/user-management-service/get-operators-by-aro-user-id';

export interface GetUserProfileList {
  searchItems: BulkUserProfiles;
  page?: number;
  size?: number;
  type?: string;
}

interface Props {
  getAROOperatorList: ({ userId }: { userId: string | number }) => void;
  userProfileList: UserProfiles[];
  loading: boolean;
  // activePage: number;
  // totalPage: number;
}

function mapUserProfileList(data: UserProfiles, lang: string | null) {
  return {
    ...data,
    name: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,
  };
}

export const useAROOperatorList = (): Props => {
  const { language } = useLanguage();
  const [userProfileList, setUserProfileList] = useState<UserProfiles[]>([]);
  const [loading, setLoading] = useState(false);

  const getAROOperatorList = async ({
    userId,
  }: {
    userId: string | number;
  }) => {
    try {
      setLoading(true);
      const response = await fetchOperatorsByARO(userId);
      if (response?.data?.status === 200) {
        const data =
          response?.data?.data?.userProfiles?.map((item: any) => {
            return mapUserProfileList(item, language);
          }) || [];
        setUserProfileList(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getAROOperatorList,
    userProfileList,
    loading,
    // activePage,
    // totalPage,
  };
};
