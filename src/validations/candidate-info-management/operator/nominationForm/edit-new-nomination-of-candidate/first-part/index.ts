import * as yup from 'yup';
import { proposerBaseValidation } from './proposer';
import { candidateDetailsBaseValidation } from './candidate-details';

export const firstPartValidationSchema = yup.object().shape({
  proposer: proposerBaseValidation,
  candidateElectionAndPersonalDetails: candidateDetailsBaseValidation,
});

export interface firstPartValidationSchemaType {
  proposer: yup.InferType<typeof proposerBaseValidation>;
  candidateElectionAndPersonalDetails: yup.InferType<
    typeof candidateDetailsBaseValidation
  >;
}
