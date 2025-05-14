import {
  centerOfficerDefaultListValidation,
  centerOfficerUpazilaListValidation,
} from '@validations/center-officer-management/controller-list/center-based-officer-list/centerBasedOfficerValidation';
import { useState } from 'react';
import { ELECTION_INFO } from '@constants/election-info';

export const useChildFiltersValidation = () => {
  const [validationSchema, setValidationSchema] = useState<any>(
    centerOfficerDefaultListValidation,
  );
  const setChildFiltersValidationSchema = ({
    electionTypeId,
  }: {
    electionTypeId?: number;
  }) => {
    switch (electionTypeId) {
      case ELECTION_INFO.UPAZILLA.ID:
        setValidationSchema(centerOfficerUpazilaListValidation);
        break;
      case ELECTION_INFO.MUNICIPALITY.ID:
        setValidationSchema(centerOfficerUpazilaListValidation);
        break;
      default:
        setValidationSchema(centerOfficerDefaultListValidation);
    }
  };
  return { validationSchema, setChildFiltersValidationSchema };
};
