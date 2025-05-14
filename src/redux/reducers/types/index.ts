import { AddNominationState } from '../candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-state';
import { AttachFileState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/attach-file-state';
import { CandidatePersonalInformationState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-personal-information-state';
import { AffidavitStepOneState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/affidavit-step-one-state';
import { MovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/movable-property-state';
import { ImmovablePropertyState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/immovable-property-state';
import { LiabilitiesState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/affidavit-form/liabilities-state';
import { FirstPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/first-part-state';
import { FourthPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part-state';
import { SecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/second-part-state';
import { ThirdPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/candidate-nomination-form/edit-new-nomination-of-candidate/third-part-state';
import { AssetLiabilityState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/asset-liability-details/asset-liability-details-state';
import { IncomeSourceDetailsState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-first-step-state';
import { CollateralFormState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/collateral-form-state';
import { AuthState } from './auth-state';
import { FiltersState } from './filters-state';
import { IncomeSourceDetailsSecondPartState } from '@reducers/candidate-info-management/operator-view/candidate-management/types/income-source-details/income-source-details-second-step-state';

export interface StoreType {
  auth: AuthState;
  nominationSteps: any;
  electionSchedule: any;
  candidateInfoManagement: {
    operatorView: {
      candidateManagement: {
        attachFile: AttachFileState;
        candidatePersonalInformation: CandidatePersonalInformationState;
        affidavitForm: {
          affidavitStepOne: AffidavitStepOneState;
          movableProperty: MovablePropertyState;
          immovableProperty: ImmovablePropertyState;
          liabilities: LiabilitiesState;
        };
        candidateNominationForm: {
          add: AddNominationState;
          edit: {
            firstPart: FirstPartState;
            secondPart: SecondPartState;
            thirdPart: ThirdPartState;
            fourthPart: FourthPartState;
          };
        };
        assetLiabilityDetails: AssetLiabilityState;
        incomeSourceDetails: {
          firstPart: IncomeSourceDetailsState;
          secondPart: IncomeSourceDetailsSecondPartState;
        };
        collateralForm: CollateralFormState;
      };
    };
  };
  userProfile: any;
  filters: FiltersState;
}
