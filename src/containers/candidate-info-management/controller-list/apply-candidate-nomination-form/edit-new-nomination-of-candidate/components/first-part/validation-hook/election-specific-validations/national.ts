import * as yup from 'yup';
import { proposerBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer';
import { candidateDetailsBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details';
import { nationalProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer/election-specific-validations/national';
import { candidateDetailsNationalValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details/election-specific-validations/national';

export const updateNationalValidation = (
  setValidationSchema: (x: any) => void,
) => {
  const updatedSchema = yup.object().shape({
    proposer: proposerBaseValidation.concat(nationalProposerValidation),
    candidateElectionAndPersonalDetails: candidateDetailsBaseValidation.concat(
      candidateDetailsNationalValidation,
    ),
  });

  setValidationSchema(updatedSchema);
};
