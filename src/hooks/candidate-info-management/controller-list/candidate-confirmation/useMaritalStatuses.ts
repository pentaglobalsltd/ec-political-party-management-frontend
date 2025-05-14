import { useEffect, useState } from 'react';
import { getMaritalStatuses } from '@api/candidate-info-management/candidate-confirmation/marital-statuses';
import { MaritalStatusesTypeRes } from '@type/candidate-info-management/candidate-confirmation/marital-statuses';

interface UseMaritalStatusesPropType {
  maritalStatuses: MaritalStatusesTypeRes;
}

export const useMaritalStatuses = (): any => {
  const [maritalStatuses, setMaritalStatuses] =
    useState<UseMaritalStatusesPropType>();

  useEffect(() => {
    try {
      getMaritalStatuses().then((response) => {
        const data = response?.data?.data;
        if (response?.data?.status === 200) {
          setMaritalStatuses(data.maritalStatuses);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    maritalStatuses,
  };
};
