import * as yup from 'yup';
import { candidateDetailsBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details';
import { upazillaCandidateDetailsProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/candidate-details/election-specific-validations/upazilla';
import { proposerBaseValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer';
import { upazillaProposerValidation } from '@validations/candidate-info-management/operator/nominationForm/edit-new-nomination-of-candidate/first-part/proposer/election-specific-validations/upazilla';

export const updateUpazillaValidation = (
  setValidationSchema: (x: any) => void,
) => {
  const updatedSchema = yup.object().shape({
    proposer: proposerBaseValidation.concat(upazillaProposerValidation),
    candidateElectionAndPersonalDetails: candidateDetailsBaseValidation.concat(
      upazillaCandidateDetailsProposerValidation,
    ),
  });

  setValidationSchema(updatedSchema);
};
