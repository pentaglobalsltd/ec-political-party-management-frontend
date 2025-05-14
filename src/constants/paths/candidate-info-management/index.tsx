export const CANDIDATE_INFO_MANAGEMENT_PATH = {
  // Nomination Of Candidates
  NOMINATION_OF_CANDIDATES: 'nomination-of-candidates',
  CREATE_NEW_NOMINATION_OF_CANDIDATE: 'create',
  EDIT_NOMINATION_OF_CANDIDATE:
    ':electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId/:scheduleId/:isFromNominationPage',

  // Candidates Personal Info
  CANDIDATES_PERSONAL_INFO: 'candidates-personal-info',
  EDIT_CANDIDATES_PERSONAL_INFO:
    'edit/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId',

  // Nomination Attachment
  NOMINATION_ATTACHMENT: 'nomination-attachment',
  EDIT_NOMINATION_ATTACHMENT:
    'edit/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId/:electionScheduleId',

  // Affidavit
  AFFIDAVIT: 'affidavit',
  EDIT_AFFIDAVIT:
    'edit/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId/:electionScheduleId',

  // Asset Liabilities
  ASSET_LIABILITIES: 'asset-liabilities',
  EDIT_ASSET_LIABILITIES:
    'edit/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId',

  // Election Expense
  ELECTION_EXPENSE: 'election-expense',
  EDIT_ELECTION_EXPENSE:
    'edit/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId',

  CANDIDATE_INFO_MANAGEMENT: '/candidate-info-management',

  // Candidate Management
  CANDIDATE_MANAGEMENT: 'candidate-management',
  CREATE_CANDIDATE_MANAGEMENT: 'create-candidate-management',
  EDIT_CANDIDATE_MANAGEMENT: ':id',
  VIEW_CANDIDATE_MANAGEMENT:
    'view-candidate-management/:electionSettingsId/:candidateElectionDetailsId/:electionApplicantId/:electionTypeId/:candidateTypeId',

  VIEW_CANDIDATE_STATUS_HISTORY:
    'view-candidate-status-history/:electionSettingsId/:candidateElectionDetailsId/:electionTypeId/:candidateTypeId',

  //for admin
  CANDIDATE_NOMINATION_STATISTICS: 'candidate-nomination-statistics',

  // Candidates Applied Online
  CANDIDATES_APPLIED_ONLINE: 'candidates-applied-online',
  EDIT_CANDIDATES_APPLIED_ONLINE:
    ':electionSettingsId/:candidateElectionDetailsId/:electionApplicantId/:electionTypeId/:candidateTypeId',
  CANDIDATES_APPLIED_ONLINE_SUMMARY:
    'candidates-summary/:electionSettingsId/:candidateElectionDetailsId/:electionApplicantId/:electionTypeId/:scheduleId/:candidateTypeId',

  // Appeal
  APPEAL: 'appeal',

  // Symbol Allocation
  SYMBOL_ALLOCATION: 'symbol-allocation',

  // Candidate Confirmation
  CANDIDATE_CONFIRMATION: 'candidate-confirmation',
  VIEW_CANDIDATE_CONFIRMATION:
    ':electionSettingsId/:candidateElectionDetailsId/:candidateId/:electionTypeId/:candidateTypeId',

  // Withdrawal Of Candidature
  WITHDRAWAL_OF_CANDIDATURE: 'withdrawal-of-candidature',

  // বিনা প্রতিদ্বন্দ্বিতায় নির্বাচিত
  CANDIDATE_UNOPPOSED_ELECTED: 'unopposed-elected',

  // Selection
  SELECTION: 'selection',

  ACCEPT: 'accept',
  EDIT_ACCEPT:
    ':electionSettingsId/:candidateElectionDetailsId/:electionApplicantId/:electionTypeId/:candidateTypeId',

  // Manual Shipment Information
  MANUAL_SHIPMENT_INFO: 'manual-shipment-info',

  // Verify
  CANDIDATE_VERIFY: 'candidate-verify',
  VIEW_CANDIDATE_VERIFY:
    ':electionSettingsId/:candidateElectionDetailsId/:candidateId/:electionTypeId/:candidateTypeId',

  // Candidates Communication
  CANDIDATES_COMMUNICATION: 'candidates-communication',

  // Nomination Paper Information
  NOMINATION_PAPER_INFORMATION: 'nomination-paper-information',

  // Valid Nominated Candidate List
  VALID_NOMINATED_CANDIDATE_LIST: 'valid-nominated-candidate-list',

  // Elected Candidates List
  ELECTED_CANDIDATES_LIST: 'elected-candidates-list',

  // Contesting Candidates List
  CONTESTING_CANDIDATES_LIST: 'contesting-candidates-list',

  // Contending Candidates Number
  CONTENDING_CANDIDATES_NUMBER: 'contending-candidates-number',

  // Cib Report
  CIB_REPORT: 'cib-report',

  // Constituency Wise Nomination Status Count Report
  CWNSC_REPORT: 'constituency-wise-nomination-status-count-report',

  // Political Party Wise Nomination Status Count Report
  PPWNSC_REPORT: 'political-party-wise-nomination-status-count-report',

  // Bail Forfeited List
  BAIL_FORFEITED_LIST: 'bail-forfeited-list',

  // Numerical Reporting 1
  NUMERICAL_REPORTING_1: 'numerical-reporting-1',

  // Numerical Reporting 2
  NUMERICAL_REPORTING_2: 'numerical-reporting-2',

  // Dynamic Report
  DYNAMIC_REPORT: 'dynamic-report',
  CREATE_DYNAMIC_REPORT: 'create',
  CREATE_DYNAMIC_REPORT_FULL_PATH:
    '/candidate-info-management/dynamic-report/create',
  EDIT_DYNAMIC_REPORT: ':id',

  // Helpline
  HELPLINE: 'helpline',

  // home navigation menus
  RESULT_MANAGEMENT: '/result-management',
  USER_MANAGEMENT: '/user-management',
};
