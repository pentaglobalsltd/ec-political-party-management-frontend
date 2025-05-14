import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

import { ELECTION_INFO } from '@constants/election-info';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import {
  // personalInfoValidation,
  // politicalInfoBaseValidation,
  // politicalPartyInfoDynamicValidation,
  // politicalPartyInfoNationalValidation,
  thirdPartValidation,
} from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part';
import { personalInfoValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part/personal-info';
import { politicalInfoBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part/political-info';
import { politicalPartyInfoNationalValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part/political-info/election-specific-validations/national';
import { politicalPartyInfoDynamicValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/third-part/political-info/election-specific-validations/rest-of-the-elections';

export const usePoliticalPartyDynamicValidation = () => {
  const [validationSchema, setValidationSchema] =
    useState<any>(thirdPartValidation);

  const { electionTypeId, candidateTypeId } = useParams();

  const setPoliticalPartyValidation = (additionalValidation: any) => {
    const updatedSchema = yup.object().shape({
      candidatePersonalInfo: personalInfoValidation,
      candidatePoliticalInfo:
        politicalInfoBaseValidation.concat(additionalValidation),
    });

    setValidationSchema(updatedSchema);
  };

  useEffect(() => {
    switch (Number(electionTypeId)) {
      case ELECTION_INFO.NATIONAL.ID:
        setPoliticalPartyValidation(politicalPartyInfoNationalValidation);
        break;

      case ELECTION_INFO.CITY_CORPORATION.ID:
        if (
          Number(candidateTypeId) === CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID
        ) {
          setPoliticalPartyValidation(politicalPartyInfoDynamicValidation);
        }
        break;

      case ELECTION_INFO.UPAZILLA.ID:
        setPoliticalPartyValidation(politicalPartyInfoDynamicValidation);
        break;

      case ELECTION_INFO.MUNICIPALITY.ID:
        if (Number(candidateTypeId) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID) {
          setPoliticalPartyValidation(politicalPartyInfoDynamicValidation);
        }
        break;

      case ELECTION_INFO.UNION_PARISHAD.ID:
        setPoliticalPartyValidation(politicalPartyInfoDynamicValidation);
        break;

      default:
        break;
    }
  }, [electionTypeId, candidateTypeId]);

  return { validationSchema, setPoliticalPartyValidation };
};
