import * as yup from 'yup';
import { candidateDetailsBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details';
import { proposerBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer';
import { unionParishadProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer/election-specific-validations/union-parishad';
import { candidateDetailsUnionParishadValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details/election-specific-validations/union-parishad';

export const updateUnionValidation = (
  setValidationSchema: (x: any) => void,
) => {
  const updatedSchema = yup.object().shape({
    proposer: proposerBaseValidation.concat(unionParishadProposerValidation),
    candidateElectionAndPersonalDetails: candidateDetailsBaseValidation.concat(
      candidateDetailsUnionParishadValidation,
    ),
  });

  setValidationSchema(updatedSchema);
};
