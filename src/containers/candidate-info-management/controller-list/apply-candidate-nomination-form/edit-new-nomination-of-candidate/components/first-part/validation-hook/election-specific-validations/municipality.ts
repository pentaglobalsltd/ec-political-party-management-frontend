import * as yup from 'yup';

import { candidateDetailsBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details';
import { proposerBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer';
import { municipalityProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer/election-specific-validations/municipality';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import {
  candidateDetailsMunicipalityAllCouncillorValidation,
  candidateDetailsMunicipalityMayorValidation,
} from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details/election-specific-validations/municipality';

const getCandidateDetailsValidation = (
  candidateType: number | string | undefined,
) => {
  return candidateType === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID
    ? candidateDetailsMunicipalityMayorValidation
    : candidateDetailsMunicipalityAllCouncillorValidation;
};

export const updateMunicipalityValidation = (
  setValidationSchema: (x: any) => void,
  candidateTypeId: string | number | undefined,
) => {
  const updatedSchema = yup.object().shape({
    proposer: proposerBaseValidation.concat(municipalityProposerValidation),
    candidateElectionAndPersonalDetails: candidateDetailsBaseValidation.concat(
      getCandidateDetailsValidation(candidateTypeId),
    ),
  });

  setValidationSchema(updatedSchema);
};
