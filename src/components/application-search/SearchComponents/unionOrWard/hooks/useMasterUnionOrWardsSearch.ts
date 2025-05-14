import { useState } from 'react';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetMasterUnionOrWardsData } from '../api/master-union-or-wards';

interface HookReturnType {
  masterUnionOrWards: SelectOptionArray[];
  getMasterUnionOrWardsData: ({
    params,

    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => void;
}

export const useMasterUnionOrWardsSearch = (): HookReturnType => {
  const { language } = useLanguage();
  const [masterUnionOrWards, setMasterUnionOrWards] = useState<
    SelectOptionArray[]
  >([]);

  const getMasterUnionOrWardsData = async ({
    params,

    filter,
  }: {
    params: {
      [key: string]: string | number;
    };

    filter?: {
      [key: string]: string | number;
    };
  }) => {
    try {
      const response = await apiGetMasterUnionOrWardsData(params, filter);
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.unionsOrWards?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
            extra: {
              electionSettingsId: item?.electionSettingsId,
              constituencyId: item?.id,
            },
          })) || [];

        setMasterUnionOrWards(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    masterUnionOrWards,
    getMasterUnionOrWardsData,
  };
};
