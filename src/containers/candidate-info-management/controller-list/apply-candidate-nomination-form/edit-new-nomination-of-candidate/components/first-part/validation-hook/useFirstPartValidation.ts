import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firstPartValidationSchema } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part';
import { ELECTION_INFO } from '@constants/election-info';
import { updateNationalValidation } from './election-specific-validations/national';
import { updateUpazillaValidation } from './election-specific-validations/upazilla';
import { updateUnionValidation } from './election-specific-validations/union-parishad';
import { updateCityValidation } from './election-specific-validations/city-corporation';
import { updateMunicipalityValidation } from './election-specific-validations/municipality';

export const useFirstPartValidation = () => {
  const [validationSchema, setValidationSchema] = useState<any>(
    firstPartValidationSchema,
  );

  const { electionTypeId, candidateTypeId } = useParams();

  useEffect(() => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        updateNationalValidation(setValidationSchema);
        break;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        updateCityValidation(setValidationSchema, candidateTypeId);
        break;

      case ELECTION_INFO.UPAZILLA.ID:
        updateUpazillaValidation(setValidationSchema);
        break;

      case ELECTION_INFO.MUNICIPALITY.ID:
        updateMunicipalityValidation(setValidationSchema, candidateTypeId);
        break;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        updateUnionValidation(setValidationSchema);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeId, electionTypeId]);

  return { validationSchema };
};
