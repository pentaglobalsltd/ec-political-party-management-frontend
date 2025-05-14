import * as yup from 'yup';

import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import {
  CHECK_ONLY_NUMBER,
  CHECK_ONLY_NUMBER_AND_EMPTY,
} from '@constants/validation-string';

// const { UPDATE_VOTE_CENTER, ADD_VOTER_AREA_TABLE } = FORM_FIELDS;
const { UPDATE_VOTE_CENTER, ADD_VOTER_AREA_TABLE } =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER;

export const INPUT_TYPE_TABLE_ROW = 'voterAreas';

const SEVEN_DIGIT_MAX = 10000000;
// const NINE_DIGIT_MAX = 1000000000;

const getYupValidation = (requiredText: string) => {
  return yup
    .number()
    .nullable()
    .typeError('সংখ্যা আবশ্যক')
    .integer('পূর্ণসংখ্যা আবশ্যক')
    .min(0, 'ঋণাত্মক সংখ্যা গ্রহণযোগ্য নয়')
    .max(SEVEN_DIGIT_MAX, 'সংখ্যাটি গ্রহণযোগ্য নয়')
    .when(ADD_VOTER_AREA_TABLE.IS_CHECKED, (isChecked, schema) => {
      return isChecked[0] ? schema.required(requiredText) : schema;
    });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSerialValidation = (
  requiredText: string,
  voters: string,
  serialFinish: string,
) => {
  return yup
    .number()
    .nullable()
    .typeError('সংখ্যা আবশ্যক')
    .integer('পূর্ণসংখ্যা আবশ্যক')
    .min(0, 'ঋণাত্মক সংখ্যা গ্রহণযোগ্য নয়')
    .max(SEVEN_DIGIT_MAX, 'সংখ্যাটি গ্রহণযোগ্য নয়')
    .when(
      [ADD_VOTER_AREA_TABLE.IS_CHECKED, voters, serialFinish],
      (values, schema, currentValue) => {
        if (values[0]) {
          const voters = values[1];
          const start = currentValue?.value;
          const finish = values[2];

          const validValue = finish - start + 1;

          if (voters !== validValue) {
            if (voters === 0) return schema;
            return schema.test(
              'serial error',
              voters
                ? `${requiredText} বৈধ ক্রম হবে ${voters} জন বিশিষ্ট।`
                : 'ভোটার ক্রম (শুরু) আবশ্যক।',
              () => false,
            );
          }
        }

        return schema;
      },
    );
};

const noSerialValidation = () => {
  return yup
    .number()
    .nullable()
    .typeError('সংখ্যা আবশ্যক')
    .integer('পূর্ণসংখ্যা আবশ্যক')
    .min(0, 'ঋণাত্মক সংখ্যা গ্রহণযোগ্য নয়')
    .max(SEVEN_DIGIT_MAX, 'সংখ্যাটি গ্রহণযোগ্য নয়');
};

export const inputTypeRowValidationSchema = yup.object().shape({
  // 1
  [ADD_VOTER_AREA_TABLE.NUMBER_OF_VOTERS.COL_MALE]: getYupValidation(
    'পুরুষ ভোটার সংখ্যা আবশ্যক',
  ),

  // 2
  [ADD_VOTER_AREA_TABLE.NUMBER_OF_VOTERS.COL_FEMALE]: getYupValidation(
    'মহিলা ভোটার সংখ্যা আবশ্যক',
  ),

  // 2.1
  [ADD_VOTER_AREA_TABLE.NUMBER_OF_VOTERS.COL_THIRD_GENDER]: getYupValidation(
    'হিজড়া ভোটার সংখ্যা আবশ্যক',
  ),

  // 3
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_MALE.COL_START]: noSerialValidation(),

  // 4
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_MALE.COL_FINISH]: getYupValidation(
    'ভোটার ক্রম (শেষ) আবশ্যক',
  ),

  // 5
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_FEMALE.COL_START]:
    noSerialValidation(),

  // 6
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_FEMALE.COL_FINISH]: getYupValidation(
    'ভোটার ক্রম (শেষ) আবশ্যক',
  ),

  // 7
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_THIRD_GENDER.COL_START]:
    noSerialValidation(),

  // 8
  [ADD_VOTER_AREA_TABLE.SERIAL_OF_VOTERS_THIRD_GENDER.COL_FINISH]:
    getYupValidation('ভোটার ক্রম (শেষ) আবশ্যক'),
});

export const voteCenterAdditionValidation = yup.object().shape({
  // ক্রমিক নং
  [UPDATE_VOTE_CENTER.SERIAL_NO]: yup.string().required('ক্রমিক নং আবশ্যক'),

  // প্রতিষ্ঠানের নাম (বাংলায়)
  [UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_BN]: yup
    .string()
    .required('প্রতিষ্ঠানের নাম (বাংলায়) আবশ্যক'),

  // প্রতিষ্ঠানের নাম (ইংরেজি)
  [UPDATE_VOTE_CENTER.CENTER_INSTITUTE_NAME_EN]: yup
    .string()
    .required('প্রতিষ্ঠানের নাম (ইংরেজি) আবশ্যক'),

  // কেন্দ্রের বিবরণী (বাংলায়)
  [UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_BANGLA]: yup
    .string()
    .required('কেন্দ্রের বিবরণী (বাংলায়) আবশ্যক'),

  // কেন্দ্রের বিবরণী (ইংরেজি)
  [UPDATE_VOTE_CENTER.CENTER_DESCRIPTION_ENGLISH]: yup
    .string()
    .required('কেন্দ্রের বিবরণী (ইংরেজি) আবশ্যক'),

  // কেন্দ্রের ধরণ
  [UPDATE_VOTE_CENTER.CENTER_TYPE]: yup
    .string()
    .required('কেন্দ্রের ধরণ আবশ্যক'),

  // কেন্দ্রের ঠিকানা (বাংলায়)
  [UPDATE_VOTE_CENTER.CENTER_ADDRESS_BANGLA]: yup
    .string()
    .required('কেন্দ্রের ঠিকানা (বাংলায়) আবশ্যক'),

  // কেন্দ্রের ঠিকানা (ইংরেজি)
  [UPDATE_VOTE_CENTER.CENTER_ADDRESS_ENGLISH]: yup
    .string()
    .required('কেন্দ্রের ঠিকানা (ইংরেজি) আবশ্যক'),

  // মোট বুথ
  [UPDATE_VOTE_CENTER.TOTAL_BOOTH]: yup
    .string()
    .required('মোট বুথ আবশ্যক')
    .matches(
      CHECK_ONLY_NUMBER,
      'অনুগ্রহ করে শুধুমাত্র ইংরেজি সংখ্যা (0-9) প্রদান করুন।',
    ),

  // অস্থায়ী বুথের সংখ্যা
  [UPDATE_VOTE_CENTER.NUMBER_OF_TEMPORARY_BOOTH]: yup
    .string()
    .nullable()
    .matches(CHECK_ONLY_NUMBER_AND_EMPTY, 'অস্থায়ী বুথ সংখ্যা হতে হবে')
    .when(UPDATE_VOTE_CENTER.TOTAL_BOOTH, (totalBooth: any, schema: any) => {
      return schema.test({
        test: (tempBooth: any) => {
          if (!tempBooth) return true;
          return tempBooth <= parseInt(totalBooth[0], 10);
        },
        message: 'অস্থায়ী বুথ মোট বুথের সংখ্যা ছোট হতে হবে',
      });
    }),

  // অস্থায়ী কেন্দ্র
  [UPDATE_VOTE_CENTER.TEMPORARY_CENTER]: yup
    .string()
    .required('অস্থায়ী কেন্দ্র আবশ্যক'),

  // ট্যাব কেন্দ্র
  [UPDATE_VOTE_CENTER.TAB_CENTER]: yup
    .string()
    .required('ট্যাব কেন্দ্র আবশ্যক'),

  // ইভিএম ফলাফল
  [UPDATE_VOTE_CENTER.EVM_RESULT]: yup.string().required('ইভিএম ফলাফল আবশ্যক'),

  voterAreas: yup.array().of(inputTypeRowValidationSchema),
});

export type VoteCenterAdditionDataType = yup.InferType<
  typeof voteCenterAdditionValidation
>;
