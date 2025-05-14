import { LoansType } from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';

export interface GenericAffidavitFourthPartProps {
  openLiabilityEditModal: (liabilityId?: string | number) => void;
  handleButtonDisable: (value: boolean) => void;
  openCommitmentAchievementEditModal: (
    commitmentAchievementId?: string | number,
  ) => void;
  submitData: boolean;
  loans?: LoansType[];
}
