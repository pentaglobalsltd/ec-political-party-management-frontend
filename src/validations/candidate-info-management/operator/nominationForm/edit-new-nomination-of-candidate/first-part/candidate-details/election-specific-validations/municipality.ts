import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const CANDIDATE_ELECTION_DETAILS =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FIRST_PART
    .CANDIDATE_ELECTION_DETAILS;

export const candidateDetailsMunicipalityMayorValidation = yup.object().shape({
  [CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_NAME]: yup
    .string()
    .required('FIRST_PART_ERROR_MSG.CANDIDATE_MUNICIPALITY'),
});

export const candidateDetailsMunicipalityAllCouncillorValidation = yup
  .object()
  .shape({
    [CANDIDATE_ELECTION_DETAILS.MUNICIPALITY_NAME]: yup
      .string()
      .required('FIRST_PART_ERROR_MSG.CANDIDATE_MUNICIPALITY'),

    [CANDIDATE_ELECTION_DETAILS.CONSTITUENCY_NAME]: yup
      .string()
      .required('FIRST_PART_ERROR_MSG.CANDIDATE_UNION_WARD'),
  });
