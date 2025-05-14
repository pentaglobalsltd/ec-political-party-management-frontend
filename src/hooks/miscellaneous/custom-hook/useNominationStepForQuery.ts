import { useEffect, useState } from 'react';
import { useAppSelector } from '@helpers/redux';
import { getNominationSteps } from '@selectors/candidate-info-management/nomination-steps-selctor';
import { StepType } from '@type/nomination-status/nomination-steps-types';
interface Props {
  stepId: number;
  // statusType: 'filterStatuses' | 'availableStatuses';
  filterStatus?: boolean;
  availableStatus?: boolean;
}
export const useNominationStepsForQuery = ({
  stepId,
  filterStatus,
  availableStatus,
}: Props) => {
  const [filterStatuses, setFilterStatuses] = useState<string>();
  const [availableStatuses, setAvailableStatuses] = useState<number>();
  const nominationSteps = useAppSelector<any>(getNominationSteps);

  useEffect(() => {
    if (Array.isArray(nominationSteps)) {
      const data = nominationSteps?.find((obj: any) => {
        return obj.id === stepId;
      });
      if (filterStatus) {
        if (data?.filterStatuses?.length === 1) {
          setFilterStatuses(data?.filterStatuses?.[0].code.toString());
        } else if (data?.filterStatuses?.length >= 1) {
          const codeArray = data?.filterStatuses.map((obj: StepType) => obj.id);
          const commaSeparatedString = codeArray.join(',');
          setFilterStatuses(commaSeparatedString);
        }
      }
      if (availableStatus) {
        if (data?.availableStatuses?.length === 1) {
          setAvailableStatuses(data?.availableStatuses?.[0].id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nominationSteps, filterStatus, availableStatus, stepId]);

  return {
    filterStatuses,
    availableStatuses,
  };
};
