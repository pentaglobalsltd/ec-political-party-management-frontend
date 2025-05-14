import { FORM_FIELDS } from '@constants/forms';
import * as yup from 'yup';

const FOURTH_PART =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.FOURTH_PART;

export const fourthPartValidation = yup.object().shape({
  // 1
  [FOURTH_PART.IS_ELECTED_BEFORE]: yup
    .string()
    .required('FOURTH_PART_ERROR_MSG.CANDIDATE_IS_ELECTED_BEFORE'),

  // 2
  [FOURTH_PART.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_NAME]: yup
    .string()
    .nullable(),
  // .when([FOURTH_PART.IS_ELECTED_BEFORE], {
  //   is: 'yes',
  //   then: (schema) =>
  //     schema.required('FOURTH_PART_ERROR_MSG.CANDIDATE_ELECTION_NAME'),
  //   otherwise: (schema) => schema,
  // }),

  [FOURTH_PART.CANDIDATE_PAST_ELECTION_INFO.PAST_ELECTION_INFO]: yup
    .string()
    .nullable(),
  // .when([FOURTH_PART.IS_ELECTED_BEFORE], {
  //   is: 'yes',
  //   then: (schema) =>
  //     schema.required(
  //       'FOURTH_PART_ERROR_MSG.CANDIDATE_AREA_NO_ELECTION_NAME',
  //     ),
  //   otherwise: (schema) => schema,
  // }),
  [FOURTH_PART.CANDIDATE_PRESENT_ELECTION_INFO.CONSTITUENCY_ID]: yup.string(),
  // .when([FOURTH_PART.IS_ELECTED_BEFORE], {
  //   is: 'no',
  //   then: (schema) =>
  //     schema.required('FOURTH_PART_ERROR_MSG.CANDIDATE_ELECTION_AREA'),
  //   otherwise: (schema) => schema,
  // }),
});
