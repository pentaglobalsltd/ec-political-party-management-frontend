import { useState } from 'react';

import { NOMINATION_STATUS_CODES } from '@constants/nomination-status-codes';
import { getNominationStatuses } from '@api/candidate-info-management/nomination-list/nomination-statuses';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';

const useNominationStatuses = ({ isActive }: { isActive?: boolean }) => {
  const { language } = useLanguage();
  const [nominationStatuses, setaNominationStatus] = useState<
    SelectOptionArray[]
  >([]);

  const getNominationStatusData = async (ignoreOnlineDraft = false) => {
    try {
      const response = await getNominationStatuses(isActive);

      if (response?.data?.status === 200) {
        let dataArray =
          response?.data?.data?.nominationstatuses?.map((item: any) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          })) || [];

        if (ignoreOnlineDraft) {
          dataArray = dataArray.filter(
            (item) => item.value !== NOMINATION_STATUS_CODES.ONLINE_DRAFT,
          );
        }

        setaNominationStatus(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    nominationStatuses,
    getNominationStatusData,
  };
};

export default useNominationStatuses;
