import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPoliticalPartyList } from '@api/center-officer-management/controller-list/political-party/political-party';

interface Props {
  page?: number;
  size?: number;
}

export const useGetPoliticalPartyList = () => {
  const { language } = useLanguage();
  const [politicalPartyList, setPoliticalPartyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const getPoliticalPartyList = async ({ page = 0, size = 10 }: Props) => {
    setLoading(true);
    let partyList = [] as any;
    try {
      const response = await fetchPoliticalPartyList({ page, size });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.politicalParties || [];
        dataArray?.forEach((item: any) => {
          const partyName =
            language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn;
          const symbolName =
            language === LANGUAGE.BANGLA
              ? item?.symbol?.symbolNameBn
              : item?.symbol?.symbolNameEn;
          const status = item?.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়';
          const newOfficer = {
            ...item,
            partyName,
            symbolName,
            status,
          };
          partyList.push(newOfficer);
        });
        setPoliticalPartyList(partyList);

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
      setLoading(false);
    }
  };

  return {
    politicalPartyList,
    getPoliticalPartyList,
    loading,
    activePage,
    totalPage,
  };
};
