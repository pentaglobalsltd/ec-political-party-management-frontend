import {
  CandidateTypeUpdateValueType,
  NominationStatusUpdateValueType,
} from '@containers/candidate-info-management/controller-list/candidate-management/constants';
import { UrlIdTypes } from '@type/candidate-info-management/candidate-confirmation/url-id-types';
import { PresentCaseUrlType } from '@type/candidate-info-management/operator-view/affidavit-form/affidavit-step-one';
import {
  CommitmentAchievementChildPropsType,
  LiabilityChildPropsType,
} from '@type/candidate-info-management/operator-view/affidavit-form/liabilities';
import { CandidateChildUrlType } from '@type/candidate-info-management/operator-view/candidatePersonalInformation';
import {
  OtherFundingURLType,
  RelativeFundingURLType,
  SelfFundingURLType,
} from '@type/candidate-info-management/operator-view/income-source-details/income-source-details-first-part';
import { DownloadFileIdType } from '@type/documents/attach-file';
import { UrlType } from '@type/url-type';

export const CANDIDATE_INFO_MANAGEMENT = {
  /**
   * candidate info management
   */
  GET_CANDIDATE_PERSONAL_INFO: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/info`,

  // candidate confirmation marital statuses
  GET_MARITAL_STATUSES: () => `/marital-statuses`,

  // candidate confirmation attach file

  GET_CANDIDATE_ATTACH_FILE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/attachments`,

  DOWNLOAD_CANDIDATE_ATTACH_FILE: ({
    documentId,
    fileId,
  }: DownloadFileIdType) => `/document/${documentId}/file/${fileId}`,

  GET_IMAGE_BASE64: ({ documentId, fileId }: DownloadFileIdType) =>
    `/document/${documentId}/file/${fileId}/base64`,

  ALLOCATED_SYMBOL_LIST: (candidateTypeId: number | string) =>
    `candidate-types/${candidateTypeId}/individual-candidate-symbols`,

  GET_CANDIDATE_NOMINATION_FORM_FIRST_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-first-part`,
  GET_CANDIDATE_NOMINATION_FORM_SECOND_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-second-part`,
  GET_CANDIDATE_NOMINATION_FORM_THIRD_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-third-part`,
  GET_CANDIDATE_NOMINATION_FORM_FOURTH_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-fourth-part`,
  GET_AFFIDAVIT_MOVABLE_PROPERTY: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/movable-assets`,
  GET_AFFIDAVIT_IMMOVABLE_PROPERTY: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/immovable-assets`,
  GET_AFFIDAVIT_STEP_ONE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/halafnama`,
  GET_AFFIDAVIT_LIABILITIES: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/liabilities`,
  GET_CANDIDATE_ELECTIONS_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}`,

  // candidate confirmation election expenses
  GET_CANDIDATE_ELECTIONS_EXPENSES_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/fundings`,

  // candidate asset income expenditure
  GET_ASSET_INCOME_EXPENDITURE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/personal-asset-income-expenditure`,
  CREATE_ASSET_LIABILITY_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/personal-asset-income-expenditure`,
  GET_ASSET_LIABILITY_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/personal-asset-income-expenditure`,
  UPDATE_ASSETS: ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/personal-assets/${personalAssetId}`,
  UPDATE_YEARLY_INCOME: ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/yearly-incomes-expenditures/${yearlyIncomeExpenditureId}`,
  DELETE_ASSET: ({
    electionSettingsId,
    candidateElectionDetailId,
    personalAssetId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/personal-assets/${personalAssetId}`,
  DELETE_YEARLY_INCOME: ({
    electionSettingsId,
    candidateElectionDetailId,
    yearlyIncomeExpenditureId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/yearly-incomes-expenditures/${yearlyIncomeExpenditureId}`,

  GET_COLLATERAL_FORM: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/jamanats`,

  UPDATE_COLLATERAL_FORM: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/jamanats`,

  UPDATE_ELECTION_APPLICANT: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/election-applicant`,
  UPDATE_ELECTION_APPLICANT_ALLOCATED_SYMBOL: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/election-applicant/allocate-symbol`,

  GET_ALL_PRESENT_CASE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/cases`,

  GET_PRESENT_CASE: ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/cases/${caseId}`,

  UPDATE_PRESENT_CASE: ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/cases/${caseId}`,
  DELETE_PRESENT_CASE: ({
    electionSettingsId,
    candidateElectionDetailsId,
    caseId,
  }: PresentCaseUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/cases/${caseId}`,

  CREATE_AFFIDAVIT_STEP_ONE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/halafnama`,

  CREATE_AFFIDAVIT_IMMOVABLE_PROPERTY: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/immovable-assets`,

  UPDATE_AFFIDAVIT_IMMOVABLE_PROPERTY: 'update-affidavit-immovable-property',

  CREATE_AFFIDAVIT_LIABILITIES: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/liabilities`,

  UPDATE_AFFIDAVIT_LIABILITIES: 'update-affidavit-liabilities',

  GET_AFFIDAVIT_LIABILITY_CHILDREN: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/only-liabilities`,

  GET_AFFIDAVIT_LIABILITY_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/only-liabilities/${liabilityId}`,

  UPDATE_AFFIDAVIT_LIABILITY_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/only-liabilities/${liabilityId}`,
  DELETE_AFFIDAVIT_LIABILITY_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    liabilityId,
  }: LiabilityChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/only-liabilities/${liabilityId}`,

  GET_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILDREN: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/commitments-achievements`,

  GET_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/commitments-achievements/${commitmentAchievementId}`,

  UPDATE_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/commitments-achievements/${commitmentAchievementId}`,

  DELETE_AFFIDAVIT_COMMITMENT_ACHIEVEMENT_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    commitmentAchievementId,
  }: CommitmentAchievementChildPropsType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/commitments-achievements/${commitmentAchievementId}`,

  CREATE_AFFIDAVIT_MOVABLE_PROPERTY: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/movable-assets`,

  UPDATE_AFFIDAVIT_MOVABLE_PROPERTY: 'update-affidavit-movable-property',

  CREATE_CANDIDATE_NOMINATION_FORM_FIRST_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-first-part`,

  CREATE_CANDIDATE_NOMINATION_FORM_FOURTH_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-fourth-part`,

  CREATE_CANDIDATE_NOMINATION_FORM_SECOND_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-second-part`,

  CREATE_CANDIDATE_NOMINATION_FORM_THIRD_PART: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/nomination-third-part`,

  CREATE_ATTACH_FILE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/attachments`,

  GET_ATTACH_FILE: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/attachments`,
  UPDATE_ATTACH_FILE: 'update-attach-file',

  CREATE_CANDIDATE_PERSONAL_INFORMATION: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/info`,

  GET_CANDIDATE_PERSONAL_INFORMATION: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/info`,

  GET_CANDIDATE_CHILDREN: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/childrens`,

  GET_CANDIDATE_PERSONAL_INFORMATION_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/childrens/${childId}`,

  UPDATE_CANDIDATE_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/childrens/${childId}`,

  DELETE_CANDIDATE_CHILD: ({
    electionSettingsId,
    candidateElectionDetailsId,
    childId,
  }: CandidateChildUrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/childrens/${childId}`,

  GET_INCOME_SOURCE_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/fundings`,
  CREATE_INCOME_SOURCE_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/fundings`,

  UPDATE_SELF_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    selfFundingId,
  }: SelfFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/self-fundings/${selfFundingId}`,

  UPDATE_RELATIVE_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    relativeFundingId,
  }: RelativeFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/relative-fundings/${relativeFundingId}`,

  UPDATE_OTHER_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    otherFundingId,
  }: OtherFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/other-fundings/${otherFundingId}`,

  DELETE_SELF_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    selfFundingId,
  }: SelfFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/self-fundings/${selfFundingId}`,

  DELETE_RELATIVE_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    relativeFundingId,
  }: RelativeFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/relative-fundings/${relativeFundingId}`,

  DELETE_OTHER_FUNDING: ({
    electionSettingsId,
    candidateElectionDetailId,
    otherFundingId,
  }: OtherFundingURLType) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/other-fundings/${otherFundingId}`,

  GET_CANDIDATE_NOMINATION_STATUS_UPDATE: (
    data: NominationStatusUpdateValueType,
  ) =>
    `/election-settings/${data?.electionSettingsId}/candidate-election-details/${data?.candidateElectionDetailsId}/election-applicant/reset-status/${data?.statusId}`,

  UPDATE_CANDIDATE_TYPE_CHANGE: ({
    electionSettingsId,
    candidateElectionDetailsId,
    candidateTypeId,
  }: CandidateTypeUpdateValueType) =>
    `/election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailsId}/change-candidate-type/${candidateTypeId}`,

  GET_CANDIDATE_ELECTION_FULL_DETAILS_LIST: '/candidate-election-full-details',
  GET_CANDIDATE_INFORMATION: '/candidate-information',

  GET_INDIVIDUAL_CANDIDATE_ELECTION_FULL_DETAILS: ({
    electionSettingsId,
    candidateElectionDetailsId,
  }: UrlIdTypes) =>
    `/election-settings/${electionSettingsId}/candidate-election-full-details/${candidateElectionDetailsId}`,

  GET_SEND_CREDENTIALS: ({ candidateElectionDetailsId }: UrlIdTypes) =>
    `/candidate-election-details/${candidateElectionDetailsId}/send-credential`,

  CREATE_INCOME_SOURCE_DETAILS_SECOND_PART: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/election-expense`,

  GET_INCOME_SOURCE_DETAILS_SECOND_PART: ({
    electionSettingsId,
    candidateElectionDetailId,
  }: UrlIdTypes) =>
    `election-settings/${electionSettingsId}/candidate-election-details/${candidateElectionDetailId}/election-expense`,

  // Dynamic Report
  GET_DYNAMIC_REPORT_LISTING: '/divergent-report',
  CREATE_DYNAMIC_REPORT: '/divergent-report',
  GET_DYNAMIC_REPORT_BY_ID: (reportId: string) =>
    `/divergent-report/${reportId}`,
  UPDATE_DYNAMIC_REPORT: (reportId: string) => `/divergent-report/${reportId}`,
  DELETE_DYNAMIC_REPORT_BY_ID: (reportId: number) =>
    `/divergent-report/${reportId}`,
  GENERATE_DYNAMIC_REPORT: ({
    reportId,
    reportType,
  }: {
    reportId: string;
    reportType: string;
  }) => `/divergent-reports/${reportId}/${reportType}`,
};
