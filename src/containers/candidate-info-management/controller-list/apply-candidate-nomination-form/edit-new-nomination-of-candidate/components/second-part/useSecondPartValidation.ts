import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ELECTION_INFO } from '@constants/election-info';

import {
  secondPartValidationSchema,
  supporterBaseValidation,
} from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part';
import { nationalSupporterValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part/election-specific-validations/national';
import { cityCorporationSupporterValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part/election-specific-validations/city-corporation';
import { upazillaSupporterValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part/election-specific-validations/upazilla';
import { municipalitySupporterValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part/election-specific-validations/municipality';
import { unionParishadSupporterValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/second-part/election-specific-validations/union-parishad';

export const useSecondPartValidation = () => {
  const [validationSchema, setValidationSchema] = useState<any>(
    secondPartValidationSchema,
  );

  const { electionTypeId } = useParams();

  const setSecondPartValidation = (additionalValidation: any) => {
    const updatedSchema = yup.object().shape({
      supporter: supporterBaseValidation.concat(additionalValidation),
    });

    setValidationSchema(updatedSchema);
  };

  useEffect(() => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        setSecondPartValidation(nationalSupporterValidation);
        break;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        setSecondPartValidation(cityCorporationSupporterValidation);
        break;

      case ELECTION_INFO.UPAZILLA.ID:
        setSecondPartValidation(upazillaSupporterValidation);
        break;

      case ELECTION_INFO.MUNICIPALITY.ID:
        setSecondPartValidation(municipalitySupporterValidation);
        break;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        setSecondPartValidation(unionParishadSupporterValidation);
        break;

      default:
        setSecondPartValidation(nationalSupporterValidation);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionTypeId]);

  return { validationSchema, setSecondPartValidation };
};
