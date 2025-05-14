import * as yup from 'yup';

import { candidateDetailsBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details';
import { proposerBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer';
import { cityCorporationProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer/election-specific-validations/city-corporation';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import {
  candidateDetailsCityAllCouncillorValidation,
  candidateDetailsCityMayorValidation,
} from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details/election-specific-validations/city-corporation';

const getCandidateDetailsValidation = (
  candidateType: number | string | undefined,
) => {
  return candidateType === CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID
    ? candidateDetailsCityMayorValidation
    : candidateDetailsCityAllCouncillorValidation;
};

export const updateCityValidation = (
  setValidationSchema: (x: any) => void,
  candidateTypeId: string | number | undefined,
) => {
  const updatedSchema = yup.object().shape({
    proposer: proposerBaseValidation.concat(cityCorporationProposerValidation),
    candidateElectionAndPersonalDetails: candidateDetailsBaseValidation.concat(
      getCandidateDetailsValidation(candidateTypeId),
    ),
  });

  setValidationSchema(updatedSchema);
};
