import { useEffect, useState } from 'react';

import { getSubDistricts } from '@api/election-schedule-management/main-list/sub-district/sub-districts';
import {
  SubDistrictSearchProps,
  SubDistrictType,
} from '@type/election-declaration-management/main-list/sub-district/sub-district-types';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface SubDistrictHookProps {
  searchItems: SubDistrictSearchProps;
  isGetSearchItem: boolean;
  size?: number;
}

interface HookReturnType {
  getSubDistrictData: (page?: number) => void;
  subDistrictList: SubDistrictType[];
  loading: boolean;
  activePage: number;
  totalPage: number;
}

const mappingFn = ({ data, lang }: { data: any[]; lang: string | null }) => {
  const result = data?.map((item) => {
    return {
      ...item,
      zillaName:
        lang === LANGUAGE.BANGLA ? item?.zillaNameBn : item?.zillaNameEn,
      isThana: item?.isThana ? 'হ্যাঁ' : 'না',
    };
  });

  return result;
};

const useSubDistricts = ({
  searchItems,
  isGetSearchItem,
  size = 10,
}: SubDistrictHookProps): HookReturnType => {
  const { language } = useLanguage();
  const [subDistrictList, setSubDistrictList] = useState<SubDistrictType[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getSubDistrictData = async (page?: number) => {
    if (isGetSearchItem === true) {
      try {
        setLoading(true);

        const response = await getSubDistricts({ searchItems, page, size });
        if (response?.data) {
          setSubDistrictList(
            response?.data?.upazilas
              ? mappingFn({ data: response?.data?.upazilas, lang: language })
              : [],
          );

          setActivePage(
            (response?.data?.page && response?.data?.page + 1) || 1,
          );
          if (response?.data?.total) {
            setTotalPage(Math.ceil(response?.data?.total / size));
          }

          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getSubDistrictData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetSearchItem, searchItems, size, language]);

  return {
    getSubDistrictData,
    subDistrictList,
    loading,
    activePage,
    totalPage,
  };
};

export default useSubDistricts;
