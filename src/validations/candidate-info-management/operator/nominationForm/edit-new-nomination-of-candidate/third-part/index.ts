import * as yup from 'yup';
import { personalInfoValidation } from './personal-info';
import { politicalInfoBaseValidation } from './political-info';

export const thirdPartValidation = yup.object().shape({
  candidatePersonalInfo: personalInfoValidation,
  candidatePoliticalInfo: politicalInfoBaseValidation,
});

export interface thirdPartValidationSchemaType {
  candidatePersonalInfo: yup.InferType<typeof personalInfoValidation>;
  candidatePoliticalInfo: yup.InferType<typeof politicalInfoBaseValidation>;
}
