import { FORM_FIELDS } from '@constants/forms';
import { CHECK_ONLY_NUMBER } from '@constants/validation-string';
import * as yup from 'yup';

const UNION =
  FORM_FIELDS.ELECTION_SCHEDULE_MANAGEMENT.MAIN_LIST.UNION.CREATE_UNION;

export const unionValidation = yup.object().shape({
  [UNION.ZILLA_ID]: yup.string().required('UNION_ERROR_MSG.ZILLA_ID'),
  [UNION.SUB_DISTRICT_ID]: yup
    .string()
    .required('UNION_ERROR_MSG.SUB_DISTRICT_ID'),
  [UNION.MUNICIPALITY_ID]: yup.string().nullable(),
  [UNION.NAME_BN]: yup.string().required('UNION_ERROR_MSG.NAME_BN'),
  [UNION.NAME_EN]: yup.string().required('UNION_ERROR_MSG.NAME_EN'),
  [UNION.GEO_CODE]: yup
    .string()
    .required('UNION_ERROR_MSG.GEO_CODE')
    .matches(CHECK_ONLY_NUMBER, 'UNION_ERROR_MSG.GEO_CODE_POSITIVE'),
});

export type UnionDataType = yup.InferType<typeof unionValidation>;
