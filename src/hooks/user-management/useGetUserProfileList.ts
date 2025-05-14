import { useState } from 'react';
import {
  BulkUserProfiles,
  // GetUserProfiles,
  UserProfiles,
} from '@type/user-management/user-profile-types';
import { getUserProfileListApi } from '@api/user-management-service/get-user-profiles';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export interface GetUserProfileList {
  searchItems: BulkUserProfiles;
  page?: number;
  size?: number;
  type?: string;
}

interface Props {
  getUserProfileListData: ({
    searchItems,
    page,
    size,
  }: GetUserProfileList) => void;
  userProfileList: UserProfiles[];
  loading: boolean;
  activePage: number;
  totalPage: number;
}

function mapUserProfileList(data: UserProfiles, lang: string | null) {
  const name = lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn;

  return {
    ...data,
    name: name ? name : ' ',
    email: data?.email ? data?.email : ' ',
    affiliation: data?.affiliation ? data?.affiliation : ' ',
    status: data?.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়',
  };
}

export const useUserProfilesList = (): Props => {
  const { language } = useLanguage();
  const [userProfileList, setUserProfileList] = useState<UserProfiles[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const getUserProfileListData = async ({
    searchItems,
    page = 0,
    size = 10,
    type = 'ELECTION',
  }: GetUserProfileList) => {
    try {
      setLoading(true);
      const response = await getUserProfileListApi(
        searchItems,
        page,
        size,
        type,
      );
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.userProfiles?.map((item) => {
          return mapUserProfileList(item, language);
        });
        setUserProfileList(data);
        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error');
      setLoading(false);
    }
  };

  return {
    getUserProfileListData,
    userProfileList,
    loading,
    activePage,
    totalPage,
  };
};
