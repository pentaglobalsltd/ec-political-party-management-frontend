import { useState } from 'react';
import { useLanguage } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { CenterOfficerManagementSearchProps } from '@type/search-types';
import { getAgencyList } from '@api/center-officer-management/controller-list/organization-list/get-agency-list';
import { GetAgencyProps } from '@type/center-officer-management/organization-list';
import { mapAgencyList } from './helper/mapping';

export interface AgencyListProps {
  searchItems?: CenterOfficerManagementSearchProps;
  page?: number;
  size?: number;
}

interface Props {
  getAgencyListData: ({ searchItems, size, page }: AgencyListProps) => void;
  agencyList: GetAgencyProps[];
  loading: boolean;
  activePage: number;
  totalPage: number;
  countSerial: number;
}

export const useAgencyList = (): Props => {
  const [agencyList, setAgencyList] = useState<GetAgencyProps[]>([]);
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [countSerial, setCountSerial] = useState(0);

  const getAgencyListData = async ({
    searchItems,
    size = 10,
    page = 0,
  }: AgencyListProps) => {
    try {
      setLoading(true);
      const response = await getAgencyList(searchItems, page, size);
      if (response?.data?.status === 200) {
        const data = response?.data?.data?.agencies?.map((item, index) => {
          return mapAgencyList({ index, data: item, lang: language, page });
        });
        setAgencyList(data);

        setActivePage(
          (response?.data?.data?.page && response?.data?.data?.page + 1) || 1,
        );
        if (response?.data?.data?.total) {
          setTotalPage(Math.ceil(response?.data?.data?.total / size));
        }
        if (response?.data?.data?.page && response?.data?.data?.size)
          setCountSerial(
            (response?.data?.data?.page as number) * response?.data?.data?.size,
          );

        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getAgencyListData,
    agencyList,
    loading,
    activePage,
    totalPage,
    countSerial,
  };
};
