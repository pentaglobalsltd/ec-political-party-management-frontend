import { useState } from 'react';
import * as yup from 'yup';

import {
  commitmentAchievements,
  liabilitiesFormValidationSchema,
} from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';

export const useLiabilitiesValidation = () => {
  const [validationSchema, setValidationSchema] = useState<any>(
    liabilitiesFormValidationSchema,
  );

  const getValidationSchema = (isNationalElection: boolean) => {
    const updatedSchema = isNationalElection
      ? validationSchema.concat(
          yup.object().shape({
            commitmentAchievements: commitmentAchievements,
          }),
        )
      : validationSchema;

    setValidationSchema(updatedSchema);
  };
  return { validationSchema, getValidationSchema };
};
