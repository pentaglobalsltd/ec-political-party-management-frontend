import { useState } from 'react';

import { Text } from '@pentabd/ui';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { fetchPollingCentersOpAroOpList } from '@api/result-management/submit-results/polling-centers-op-aro-op';
import {
  POLLING_CENTER_COLORS,
  RESULT_POLLING_CENTER_OPTIONS_COLORS,
  VOTER_TYPE,
} from '@constants/polling-center-results';

interface Props {
  scheduleId: string | number;
  electionSettingsId: string | number;
  userId: string;
  // candidateTypeId: string | number;
  // electionTypeId: string | number;
  // constituencyId: string | number;
}

const getBgColor = (status: string) => {
  if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGray.includes(status))
    return 'bg-light';
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGreen.includes(status))
    return 'bg-success';
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgYellow.includes(status))
    return 'bg-light';
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgRed.includes(status))
    return 'bg-danger';
  else return '';
};

const getEnumColor = (status: string) => {
  if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGray.includes(status))
    return POLLING_CENTER_COLORS.GRAY;
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGreen.includes(status))
    return POLLING_CENTER_COLORS.GREEN;
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgYellow.includes(status))
    return POLLING_CENTER_COLORS.YELLOW;
  else if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgRed.includes(status))
    return POLLING_CENTER_COLORS.RED;
  else return '';
};

const getTxtColor = (status: string) => {
  if (RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGray.includes(status))
    return '';
  else return 'white';
};

const mappedSortingDataArray = (dataArray: any) => {
  const grayItems: any[] = [];
  const greenItems: any[] = [];
  const yellowItems: any[] = [];
  const redItems: any[] = [];

  dataArray?.forEach((item: any) => {
    if (
      RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGray.includes(item?.status)
    ) {
      grayItems.push(item);
    } else if (
      RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgGreen.includes(item?.status)
    ) {
      greenItems.push(item);
    } else if (
      RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgYellow.includes(item?.status)
    ) {
      yellowItems.push(item);
    } else if (
      RESULT_POLLING_CENTER_OPTIONS_COLORS.makeBgRed.includes(item?.status)
    ) {
      redItems.push(item);
    }
  });

  return [...grayItems, ...greenItems, ...yellowItems, ...redItems];
};

const mappedDataArray = (data: any, language: string | null) => {
  const mappedResponseData = [];

  if (data) {
    mappedResponseData.push(
      ...data.map((item: any) => {
        const voterType =
          item?.voterType === VOTER_TYPE.MALE_EN
            ? VOTER_TYPE.MALE_BN
            : item?.voterType === VOTER_TYPE.FEMALE_EN
            ? VOTER_TYPE.FEMALE_BN
            : item?.voterType === VOTER_TYPE.BOTH_EN
            ? VOTER_TYPE.BOTH_BN
            : '';

        return {
          id: item.id,
          label:
            language === LANGUAGE.BANGLA
              ? `${item.serial} - ${item.nameBn} (${voterType})`
              : `${item.serial} - ${item.nameEn} (${voterType})`,
          value: item.id,
          serial: item.serial,
          color: getEnumColor(item?.status),
          maleVoter: item?.maleVoter,
          femaleVoter: item?.femaleVoter,
          totalVoter: item?.totalVoter,
          thirdGenderVoter: item?.thirdGenderVoter,
          customComponent: (
            <div className={`${getBgColor(item?.status)} p-4 rounded-3`}>
              {
                <Text color={`${getTxtColor(item?.status)}`} weight="semibold">
                  {language === LANGUAGE.BANGLA
                    ? `${item.serial} - ${item.nameBn} (${voterType})`
                    : `${item.serial} - ${item.nameEn} (${voterType})`}
                </Text>
              }
            </div>
          ),
        };
      }),
    );
  }

  return mappedResponseData;
};

export const usePollingCentersOpAroOpListSelect = (
  setContextData?: (x: any) => void,
) => {
  const [pollingCenters, setPollingCenters] = useState([]);
  const { language } = useLanguage();
  const [success, setSuccess] = useState(false);

  const getPollingCentersListSelect = async ({
    scheduleId,
    electionSettingsId,
    userId,
  }: Props) => {
    try {
      setSuccess(false);
      const response = await fetchPollingCentersOpAroOpList({
        scheduleId,
        userId,
        electionSettingsId,
      });
      if (response?.data?.status === 200) {
        const dataArray = mappedSortingDataArray(
          response?.data?.data?.pollingCenters,
        );
        setSuccess(true);
        const newData: any = mappedDataArray(dataArray, language);
        setPollingCenters(newData);

        if (setContextData) {
          setContextData((prev: any) => {
            return {
              ...prev,
              contextPollingCenters: newData,
            };
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      setPollingCenters([]);
    }
  };

  const resetPollingCentersListSelect = () => setPollingCenters([]);

  return {
    pollingCenters,
    getPollingCentersListSelect,
    success,
    resetPollingCentersListSelect,
  };
};
