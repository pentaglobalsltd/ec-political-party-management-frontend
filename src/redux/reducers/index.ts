import { combineReducers } from 'redux';
import getNominationStepsReducer from './nomination-steps';

import createElectionScheduleReducer from './election-schedule-management/create-election-schedule';
import updateElectionScheduleReducer from './election-schedule-management/update-election-schedule';

import createAttachFileReducer from './candidate-info-management/operator-view/candidate-management/attachFile/create-attach-file-reducer';
import getAttachFileReducer from './candidate-info-management/operator-view/candidate-management/attachFile/get-attach-file-reducer';

import createCandidatePersonalInformationReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/create-candidate-personal-information-reducer';
import getCandidatePersonalInformationReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/get-candidate-personal-information-reducer';
import getCandidateChildrenReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/get-candidate-children-reducer';
import getCandidateChildReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/get-candidate-child-reducer';
import updateCandidateChildReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/update-candidate-child-reducer';
import deleteCandidateChildReducer from './candidate-info-management/operator-view/candidate-management/candidate-personal-information/delete-candidate-child-reducer';
import createAffidavitStepOneReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/create-affidavit-step-one-reducer';
import getAffidavitStepOneReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/get-affidavit-step-one-reducer';
import getAllPresentCaseReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/get-all-present-case-reducer';
import getPresentCaseReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/get-present-case-reducer';
import updatePresentCaseReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/update-present-case-reducer';
import deletePresentCaseReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/affidavit-step-one/delete-present-case-reducer';
import createMovablePropertyReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property/create-movable-property-reducer';
import getMovablePropertyReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/movable-property/get-movable-property-reducer';
import createImmovablePropertyReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property/create-immovable-property-reducer';
import getImmovablePropertyReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/immovable-property/get-immovable-property-reducer';
import createLiabilitiesReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/create-liabilities-reducer';
import getLiabilitiesReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/get-liabilities-reducer';
import updateLiabilitiesReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/update-liabilities-reducer';
import getLiabilityChildrenReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/get-liability-children-reducer';
import getLiabilityChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/get-liability-child-reducer';
import updateLiabilityChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/update-liability-child-reducer';
import deleteLiabilityChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/delete-liability-child-reducer';

import getCommitmentAchievementChildrenReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/get-commitment-achievement-children-reducer';
import getCommitmentAchievementChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/get-commitment-achievement-children-reducer';
import updateCommitmentAchievementChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/update-commitment-achievement-child-reducer';
import deleteCommitmentAchievementChildReducer from './candidate-info-management/operator-view/candidate-management/affidavit-form/liabilities/delete-commitment-achievement-child-reducer';
import createFirstPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/create-first-part-reducer';
import getFirstPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/first-part/get-first-part-reducer';
import createSecondPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/create-second-part-reducer';
import getSecondPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/second-part/get-second-part-reducer';
import createThirdPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/create-third-part-reducer';
import getThirdPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/third-part/get-third-part-reducer';
import createFourthPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/create-fourth-part-reducer';
import getFourthPartReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/edit-new-nomination-of-candidate/fourth-part/get-fourth-part-reducer';
import AddNominationReducer from './candidate-info-management/operator-view/candidate-management/candidate-nomination-form/add-new-nomination-of-candidate/add-nomination-reducer';
import getUserProfileForElectionSettingsId from './user-profile/user-profile-election-settings-id';
import getUserProfileForSelect from './user-profile/user-profile-for-select';
import getIncomeSourceDetailsReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/get-income-source-details-reducer';
import createIncomeSourceDetailsReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/create-income-source-details-reducer';
import getCollateralFormReducer from './candidate-info-management/operator-view/candidate-management/collateral-form/get-collateral-form-reducer';
import updateCollateralFormReducer from './candidate-info-management/operator-view/candidate-management/collateral-form/update-collateral-form-reducer';
import updateSelfFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/update-self-funding-reducer';
import updateRelativeFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/update-relative-fundings-reducer';
import updateOtherFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/update-other-fundings-reducer';
import deleteSelfFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/delete-self-funding-reducer';
import deleteRelativeFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/delete-relative-funding-reducer';
import deleteOtherFundingReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/first-part/delete-other-funding-reducer';

import createAssetLiabilityDetailsReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/create-asset-liability-reducer';
import getAssetLiabilityDetailsReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/get-asset-liability-reducer';
import updateAssetsReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/update-asset-reducer';
import updateYearlyIncomeReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/update-yearly-income-reducer';
import deleteAssetReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/delete-asset-reducer';
import deleteYearlyIncomeReducer from './candidate-info-management/operator-view/candidate-management/asset-liability-details/delete-yearly-income-reducer';
import SignInReducer from './auth/sign-in-reducer';
import SignOutReducer from './auth/sign-out-reducer';
import ResetPasswordReducer from './auth/reset-password-reducer';
import UserInfoReducer from './auth/user-info-reducer';
import UpdatePasswordReducer from './auth/update-password-reducer';
import FiltersReducer from './filters/filters-reducer';
import getIncomeSourceDetailsSecondPartReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/second-part/get-income-source-details-reducer';
import createIncomeSourceDetailsSecondPartReducer from './candidate-info-management/operator-view/candidate-management/income-source-details/second-part/create-income-source-details-second-part-reducer';

const rootReducer = combineReducers({
  auth: combineReducers({
    signIn: SignInReducer,
    signOut: SignOutReducer,
    resetPassword: ResetPasswordReducer,
    updatePassword: UpdatePasswordReducer,
    userInfo: UserInfoReducer,
  }),

  nominationSteps: getNominationStepsReducer.reducer,
  electionSchedule: combineReducers({
    createElectionSchedule: createElectionScheduleReducer.reducer,
    updateElectionSchedule: updateElectionScheduleReducer.reducer,
  }),

  candidateInfoManagement: combineReducers({
    operatorView: combineReducers({
      candidateManagement: combineReducers({
        // 1
        attachFile: combineReducers({
          createAttachFile: createAttachFileReducer,
          getAttachFile: getAttachFileReducer,
        }),

        // 2
        candidatePersonalInformation: combineReducers({
          createCandidatePersonalInformation:
            createCandidatePersonalInformationReducer,
          getCandidatePersonalInformation:
            getCandidatePersonalInformationReducer,
          getCandidateChildren: getCandidateChildrenReducer,
          getCandidateChild: getCandidateChildReducer,
          updateCandidateChild: updateCandidateChildReducer,
          deleteCandidateChild: deleteCandidateChildReducer,
        }),

        // 3
        affidavitForm: combineReducers({
          affidavitStepOne: combineReducers({
            createAffidavitStepOne: createAffidavitStepOneReducer,
            getAffidavitStepOne: getAffidavitStepOneReducer,
            getAllPresentCase: getAllPresentCaseReducer,
            getPresentCase: getPresentCaseReducer,
            updatePresentCase: updatePresentCaseReducer,
            deletePresentCase: deletePresentCaseReducer,
          }),
          movableProperty: combineReducers({
            createMovableProperty: createMovablePropertyReducer,
            getMovableProperty: getMovablePropertyReducer,
          }),
          immovableProperty: combineReducers({
            createImmovableProperty: createImmovablePropertyReducer,
            getImmovableProperty: getImmovablePropertyReducer,
          }),
          liabilities: combineReducers({
            createLiabilities: createLiabilitiesReducer,
            getLiabilities: getLiabilitiesReducer,
            updateLiabilities: updateLiabilitiesReducer,
            getLiabilityChildren: getLiabilityChildrenReducer,
            getLiabilityChild: getLiabilityChildReducer,
            updateLiabilityChild: updateLiabilityChildReducer,
            deleteLiabilityChild: deleteLiabilityChildReducer,
            getCommitmentAchievementChildren:
              getCommitmentAchievementChildrenReducer,
            getCommitmentAchievementChild: getCommitmentAchievementChildReducer,
            updateCommitmentAchievementChild:
              updateCommitmentAchievementChildReducer,
            deleteCommitmentAchievementChild:
              deleteCommitmentAchievementChildReducer,
          }),
        }),

        // 4
        candidateNominationForm: combineReducers({
          edit: combineReducers({
            firstPart: combineReducers({
              createFirstPart: createFirstPartReducer,
              getFirstPart: getFirstPartReducer,
            }),
            secondPart: combineReducers({
              createSecondPart: createSecondPartReducer,
              getSecondPart: getSecondPartReducer,
            }),
            thirdPart: combineReducers({
              createThirdPart: createThirdPartReducer,
              getThirdPart: getThirdPartReducer,
            }),
            fourthPart: combineReducers({
              createFourthPart: createFourthPartReducer,
              getFourthPart: getFourthPartReducer,
            }),
          }),

          add: AddNominationReducer,
        }),

        // 5
        assetLiabilityDetails: combineReducers({
          createAssetLiabilityDetail: createAssetLiabilityDetailsReducer,
          getAssetLiabilityDetail: getAssetLiabilityDetailsReducer,
          updateAssets: updateAssetsReducer,
          updateYearlyIncome: updateYearlyIncomeReducer,
          deleteAsset: deleteAssetReducer,
          deleteYearlyIncome: deleteYearlyIncomeReducer,
        }),

        // 6
        incomeSourceDetails: combineReducers({
          firstPart: combineReducers({
            getIncomeSourceDetails: getIncomeSourceDetailsReducer,
            createIncomeSourceDetails: createIncomeSourceDetailsReducer,
            updateSelfFunding: updateSelfFundingReducer,
            updateRelativeFunding: updateRelativeFundingReducer,
            updateOtherFunding: updateOtherFundingReducer,

            deleteSelfFunding: deleteSelfFundingReducer,
            deleteRelativeFunding: deleteRelativeFundingReducer,
            deleteOtherFunding: deleteOtherFundingReducer,
          }),
          secondPart: combineReducers({
            createIncomeSourceDetailsSecondPartDetails:
              createIncomeSourceDetailsSecondPartReducer,
            getIncomeSourceDetailsSecondPartDetails:
              getIncomeSourceDetailsSecondPartReducer,
          }),
        }),

        // 7
        collateralForm: combineReducers({
          getCollateralForm: getCollateralFormReducer,
          updateCollateralForm: updateCollateralFormReducer,
        }),
      }),
    }),
  }),
  userProfile: combineReducers({
    userProfileForElectionSettingsId:
      getUserProfileForElectionSettingsId.reducer,
    userProfileForSelect: getUserProfileForSelect.reducer,
  }),
  filters: FiltersReducer,
});

export default rootReducer;
