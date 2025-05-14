import { useState } from 'react';
import { fetchInstituteTypes } from '@api/election-schedule-management/others/institute-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { InstituteTypeDataType } from '@type/election-declaration-management/others/institute-types/institute-types';
import { getDigitBanglaFromEnglish } from '@utils';

interface InstituteTypeListParams {
  page?: number;
  size?: number;
}

const getInstituteTypeListSelect = (
  dataArray: any,
  language: string | null,
) => {
  const selectOptions = dataArray.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  }));

  return selectOptions;
};

const mapInstitutionTypeList = (item: InstituteTypeDataType, index: number) => {
  return {
    ...item,
    idx: getDigitBanglaFromEnglish(index + 1),
  };
};

export const useGetInstituteTypeList = () => {
  const { language } = useLanguage();
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [instituteTypesSelect, setInstituteTypesSelect] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const size = 10;

  const getInstituteTypeList = async ({ page }: InstituteTypeListParams) => {
    setLoading(true);
    try {
      const response = await fetchInstituteTypes({ page, size });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data.instituteTypes || [];
        const mappedData =
          dataArray?.map((item: any, index: number) =>
            mapInstitutionTypeList(item, index),
          ) || [];

        setInstituteTypes(mappedData);
        setInstituteTypesSelect(
          getInstituteTypeListSelect(dataArray, language),
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    instituteTypes,
    loading,
    getInstituteTypeList,
    instituteTypesSelect,
  };
};
