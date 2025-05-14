import { GetRoReportFiltersType } from '@type/candidate-info-management/report/get-ro-report-filters-types';
import {
  ReportRoSearchFiltersTypeNew,
  roFiltersInitialValue,
  USER_PROFILE_DETAILS_KEYS,
} from '../useRoReportFiltersNew';
import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { buildElectionSettingsOrConstituenciesArray } from './build-election-settings-or-constituencies-array';

export const mappedDataNewReportFilter = (
  obj: GetRoReportFiltersType,
  language: string | null,
  getSettingsId: boolean, // TODO: remove this in future, and also make sure everything works fine after its removal
): ReportRoSearchFiltersTypeNew => {
  let result: ReportRoSearchFiltersTypeNew = roFiltersInitialValue;

  for (const [key, valueArray] of Object.entries(obj)) {
    if (!Array.isArray(valueArray)) continue;

    result = {
      ...result,

      [key]: valueArray?.map((item: any) => ({
        label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
        value: item.id,
      })),
    };

    if (key === USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS) {
      result = {
        ...result,

        // build settings array
        [USER_PROFILE_DETAILS_KEYS.ELECTION_SETTINGS]:
          buildElectionSettingsOrConstituenciesArray({
            valueArray,
            language,
            setElectionSettingsAsId: getSettingsId,
          }),

        // build constituencies array
        [USER_PROFILE_DETAILS_KEYS.CONSTITUENCIES]:
          buildElectionSettingsOrConstituenciesArray({
            valueArray,
            language,
            setElectionSettingsAsId: false,
          }),
      };
    }
  }

  result = {
    ...result,
    name: language === LANGUAGE.BANGLA ? obj?.nameBn : obj?.nameEn,
  };
  return {
    ...result,
  };
};
