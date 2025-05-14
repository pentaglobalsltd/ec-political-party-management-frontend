import { useEffect, useState } from 'react';
import { LANGUAGE, useLanguage } from './useLanguage';
import { useAppSelector } from '@helpers/redux';
import { getNominationSteps } from '@selectors/candidate-info-management/nomination-steps-selctor';
import { STEPS, STEPS_TYPE } from '@constants/steps';
interface Props {
  stepId: STEPS;
  statusType: STEPS_TYPE;
}

export interface StepOptionType {
  label: 'string';
  value: number;
}

export const useNominationStepsSelect = ({
  stepId,
  statusType,
}: Props): { options: StepOptionType[] } => {
  const { language } = useLanguage();
  const [options, setOptions] = useState<StepOptionType[]>([]);
  const nominationSteps = useAppSelector<any>(getNominationSteps);

  useEffect(() => {
    if (Array.isArray(nominationSteps)) {
      const data = nominationSteps?.find((obj: any) => {
        return obj.id === stepId;
      });
      if (statusType === 'filterStatuses') {
        const dataArray = data?.filterStatuses?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setOptions(dataArray);
      } else {
        const dataArray = data?.availableStatuses?.map((item: any) => ({
          label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
          value: item.id,
        }));
        setOptions(dataArray);
      }
    }
  }, [language, nominationSteps, statusType, stepId]);

  return {
    options,
  };
};
