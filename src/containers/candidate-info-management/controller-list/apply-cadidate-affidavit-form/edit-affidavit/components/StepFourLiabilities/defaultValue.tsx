import {
  AFFIDAVIT_COMMITMENT_ACHIEVEMENTS,
  LIABILITIES,
} from '@validations/candidate-info-management/operator/affidavit/fourthStepLiabilitiesValidation';

export const liabilitiesFormDefaultValue = {
  [LIABILITIES.NATURE_LIABILITIES_DEBTS]: '',
  [LIABILITIES.AMOUNT]: '',
  [LIABILITIES.FILE]: '',
};

export const commitmentAchievementFormDefaultValue = {
  [AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.PROMISES]: '',
  [AFFIDAVIT_COMMITMENT_ACHIEVEMENTS.ACHIEVEMENTS]: '',
};
