import * as yup from 'yup';
import { FORM_FIELDS } from '@constants/forms';
import { fileRequiredValidation, imageRequiredValidation } from '@utils/file';

export const ATTACH_FILE =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.ATTACH_FILE;

interface GetAttachFileValidation {
  isHalafnamaRequired: boolean;
}

export const getAttachFileValidation = (params: GetAttachFileValidation) => {
  const { isHalafnamaRequired } = params;

  return yup.object().shape({
    [ATTACH_FILE.CANDIDATE_IMAGE]: imageRequiredValidation(),
    [ATTACH_FILE.AFFIDAVIT]: isHalafnamaRequired
      ? fileRequiredValidation()
      : yup.mixed().nullable(),
    [ATTACH_FILE.POLITICAL_PARTY_NOMINATION]: yup.mixed().nullable(),
    [ATTACH_FILE.INCOME_TAX_RETURN_COPY]: fileRequiredValidation(),
    [ATTACH_FILE.VOTERS_SUPPORT_SIGNED_LIST]: yup.object().nullable(),
    [ATTACH_FILE.CANDIDATE_EXPENDITURE]: yup.mixed().nullable(),
    [ATTACH_FILE.BUY_CD]: fileRequiredValidation(),
    [ATTACH_FILE.HIGHEST_EDUCATIONAL_QUALIFICATION]: yup.mixed().nullable(),
    [ATTACH_FILE.UTILITY_BILL]: yup.mixed().nullable(),
    [ATTACH_FILE.OTHER_DOCUMENTS]: yup.mixed().nullable(),
  });
};

export type FormData = yup.InferType<
  ReturnType<typeof getAttachFileValidation>
>;
