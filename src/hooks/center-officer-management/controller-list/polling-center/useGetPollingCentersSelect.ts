import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { getPollingCenters } from '@api/center-officer-management/controller-list/polling-center/polling-centers-select';
interface Props {
  electionScheduleId?: number | string;
  constituencyId?: number | string;
  zillaId?: number | string;
  upazilaId?: number | string;
  municipalityId?: number | string;
  unionOrWardIds?: number | string;
}

export const usePollingCenterSelect = () => {
  const [pollingCenters, setPollingCenters] = useState<SelectOptionArray[]>([]);
  const { language } = useLanguage();
  const getPollingCentersData = async ({
    electionScheduleId,
    constituencyId,
    municipalityId,
    zillaId,
    upazilaId,
    unionOrWardIds,
  }: Props) => {
    try {
      const response = await getPollingCenters({
        electionScheduleId,
        constituencyId,
        municipalityId,
        zillaId,
        upazilaId,
        unionOrWardIds,
      });
      const dataArray = response?.data?.data?.pollingCenters?.map((item) => ({
        label:
          language === LANGUAGE.BANGLA
            ? `${item?.serial} - ${item?.nameBn}, ${item?.descriptionBn}`
            : `${item?.serial} - ${item?.nameEn}, ${item?.descriptionEn}`,
        value: item?.id,
      }));
      setPollingCenters(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pollingCenters,
    getPollingCentersData,
  };
};
