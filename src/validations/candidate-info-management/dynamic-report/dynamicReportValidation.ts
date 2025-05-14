import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';

const DYNAMIC_REPORT = FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.DYNAMIC_REPORT;

export const dynamicReportValidationSchema = yup.object().shape({
  [DYNAMIC_REPORT.NAME_BN]: yup
    .string()
    .required('DYNAMIC_REPORT.NAME_BN_REQUIRED'),
  [DYNAMIC_REPORT.NAME_EN]: yup
    .string()
    .required('DYNAMIC_REPORT.NAME_EN_REQUIRED'),
  [DYNAMIC_REPORT.TAG]: yup.string().required('DYNAMIC_REPORT.TAG_REQUIRED'),
  [DYNAMIC_REPORT.QUERY_VALUE]: yup
    .string()
    .required('DYNAMIC_REPORT.QUERY_REQUIRED')
    .test('Required', 'DYNAMIC_REPORT.NOT_PERMITTED', function (value) {
      const disallowedQueries = [
        'insert',
        'delete',
        'update',
        'create',
        'alter',
        'drop',
        'while',
      ];

      const inputQuery = value.toLowerCase().split(/\s+/);

      for (const word of inputQuery) {
        if (disallowedQueries.includes(word)) {
          return false;
        }
      }

      return true;
    }),
});

export type DynamicReportValidationSchemaType = yup.InferType<
  typeof dynamicReportValidationSchema
>;
