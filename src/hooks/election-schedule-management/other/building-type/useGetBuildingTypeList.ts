import { useState } from 'react';
import { fetchBuildingTypeList } from '@api/election-schedule-management/main-list/building-type/building-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { InstituteTypeDataType } from '@type/election-declaration-management/others/institute-types/institute-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface Props {
  page?: number;
  size?: number;
}

const getBuildingTypeListSelect = (dataArray: any, language: string | null) => {
  const selectOptions = dataArray.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  }));

  return selectOptions;
};

const mapBuildingTypeList = (item: InstituteTypeDataType, index: number) => {
  return {
    ...item,
    idx: getDigitBanglaFromEnglish(index + 1),
  };
};

export const useGetBuildingTypeList = () => {
  const { language } = useLanguage();
  const [buildingTypeList, setBuildingTypeList] = useState([]);
  const [buildingTypeListSelect, setBuildingTypeListSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getBuildingTypeList = async ({ page = 0, size = 10 }: Props) => {
    setLoading(true);
    try {
      const response = await fetchBuildingTypeList({ page, size });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.buildingTypes || [];
        const mappedData =
          dataArray?.map((item: any, index: number) =>
            mapBuildingTypeList(item, index),
          ) || [];

        setBuildingTypeList(mappedData);
        setBuildingTypeListSelect(
          getBuildingTypeListSelect(dataArray, language),
        );

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
    buildingTypeList,
    getBuildingTypeList,
    buildingTypeListSelect,
    loading,
    activePage,
    totalPage,
  };
};
