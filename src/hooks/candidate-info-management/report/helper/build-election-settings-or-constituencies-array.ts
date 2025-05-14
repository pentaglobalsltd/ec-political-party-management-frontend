import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  ElectionSettingsType,
  // GetRoReportFiltersType,
} from '@type/candidate-info-management/report/get-ro-report-filters-types';
import { SelectOptionArray } from '@type/selection-option-type';

export const buildElectionSettingsOrConstituenciesArray = ({
  valueArray,
  setElectionSettingsAsId,
  language,
}: {
  valueArray: ElectionSettingsType[];
  setElectionSettingsAsId: boolean;
  language: string | null;
}): SelectOptionArray[] => {
  const resultArray = valueArray?.map((item: any) => {
    return {
      value: setElectionSettingsAsId ? item.settingsId : item.constituencyId,
      label:
        language === LANGUAGE.BANGLA
          ? item.constituencyNameBn
          : item.constituencyNameEn,
      extra: {
        constituencyId: item?.constituencyId,
        electionSettingsId: item?.settingsId,
        candidateTypeId: item?.candidateTypeId,
        unionOrWardId: item?.unionOrWardId,
      },
    };
  });

  return resultArray;
};
