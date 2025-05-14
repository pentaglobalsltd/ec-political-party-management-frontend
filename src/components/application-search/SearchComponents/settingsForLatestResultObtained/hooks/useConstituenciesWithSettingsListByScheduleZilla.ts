import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetConstituenciesWithSettingsByScheduleZilla } from '../api/constituencies-with-settings-list-by-schedule-zilla';
import { SingleConstituencyTypeByScheduleZilla } from '@type/constituencies-with-settings-list-by-schedule-zilla';
import { SelectOptionArray } from '@type/selection-option-type';

interface Props {
  params: {
    [key: string]: string | number;
  };
  isActive?: boolean;
}

interface HookReturnType {
  constituencies: SelectOptionArray[];
  getConstituenciesWithSettingsByScheduleZilla: ({
    params,
    isActive,
  }: Props) => void;
}

export const useConstituenciesWithSettingsByScheduleZilla =
  (): HookReturnType => {
    const { language } = useLanguage();
    const [constituencies, setConstituencies] = useState<SelectOptionArray[]>(
      [],
    );

    const getConstituenciesWithSettingsByScheduleZilla = async ({
      params,
      isActive,
    }: Props) => {
      try {
        const response = await apiGetConstituenciesWithSettingsByScheduleZilla({
          params,
          isActive,
        });
        if (response?.data?.status === 200) {
          const dataArray =
            response?.data?.data?.constituencies?.map(
              (item: SingleConstituencyTypeByScheduleZilla) => ({
                label:
                  language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
                value: item?.electionSettings
                  ?.map((settingId) => settingId?.electionSettingsId)
                  ?.join(','),
              }),
            ) || [];

          setConstituencies(dataArray as any);
        } else {
          setConstituencies([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      constituencies,
      getConstituenciesWithSettingsByScheduleZilla,
    };
  };
