import { useState } from 'react';
import { getPollingCenterAggregated } from '@api/vote-center-management/center-management/polling-center-list/polling-centers-aggregated-select';
import { SelectOptionArray } from '@type/selection-option-type';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

interface Props {
  electionScheduleId?: number | string;
  constituencyId?: number | string;
  upazilaId?: number | string;
  zillaId?: number | string;
  regionId?: number | string;
  municipalityId?: number | string;
  unionOrWardIds?: number | string;
}
// export const usePollingCenterAggregated = () => {
export const usePollingCenterAggregatedSelect = () => {
  const [pollingCenterAggregated, setPollingCenterAggregated] = useState<
    SelectOptionArray[]
  >([]);
  const { language } = useLanguage();
  const getPollingCenterAggregatedData = async ({
    electionScheduleId,
    upazilaId,
    constituencyId,
    regionId,
    municipalityId,
    zillaId,
    unionOrWardIds,
  }: Props) => {
    try {
      const response = await getPollingCenterAggregated({
        electionScheduleId,
        upazilaId,
        constituencyId,
        regionId,
        municipalityId,
        zillaId,
        unionOrWardIds,
      });
      const dataArray = response?.data?.pollingCenters?.map((item: any) => ({
        label:
          language === LANGUAGE.BANGLA
            ? `${item.pollingInstituteNameBn} - ${item.descriptionBn}`
            : `${item.pollingInstituteNameEn} - ${item.descriptionEn}`,
        value: item.id,
      }));
      setPollingCenterAggregated(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pollingCenterAggregated,
    getPollingCenterAggregatedData,
  };
};
