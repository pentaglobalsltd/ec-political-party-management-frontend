/* initial landing pages for different user-types
      - Admin (গ্রাফিকাল পর্যবেক্ষণ) → <GraphicalObservation />
      - OP (ফলাফল দাখিল) → <SubmitResults />
      - ARO (ফলাফল) → <Results />
      - RO (বার্তা শীটের তালিকা) → <MessageSendList />
*/

export const RESULT_MANAGEMENT = {
  // নির্বাচন প্রক্রিয়া
  ELECTION_PROCESS_RESULT_SUBMIT_MENU: 'v_result_submit_menu',
  ELECTION_PROCESS_RESULT_SUBMIT_SUMMARY: 'c_view_folafol_dakhil_summary',
  ELECTION_PROCESS_RESULT_MENU: 'v_result_menu',
  ELECTION_PROCESS_RESULT_SUMMARY: 'c_view_folafol_summary',
  ELECTION_PROCESS_RESULT_SUBMIT: 'c_submit_result',
  ELECTION_PROCESS_RESULT_PUBLISH: 'c_publish_result',
  ELECTION_PROCESS_BARTA_SHEET_PREP: 'v_barta_sheet_menu',
  ELECTION_PROCESS_BARTA_SHEET_LIST: 'v_barta_sheet_list_menu',
  ELECTION_PROCESS_LATEST_APPROVED_RESULT: 'c_view_latest_approved_result',
  ELECTION_PROCESS_PUBLISH_TO_RMS_DASHBOARD:
    'c_publish_result_to_rms_dashboard',
  ELECTION_PROCESS_BARTA_SHEET_HISTORY: 'c_view_barta_sheet_history',
  ELECTION_PROCESS_BARTA_SHEET_PUBLISH_MENU: 'v_barta_sheet_publish_menu',
  ELECTION_PROCESS_PUBLISH_BARTA_SHEET: 'c_publish_barta_sheet',
  ELECTION_PROCESS_SUBMIT_FINAL_BARTA_SHEET: 'c_submit_final_barta_sheet',
  ELECTION_PROCESS_POLLING_CENTER_LIST: 'v_polling_center_list_menu',
  ELECTION_PROCESS_RESULT_SITUATION: 'v_result_and_situation_review_menu',
  ELECTION_PROCESS_POLLING_CENTER_SUSPEND: 'v_polling_center_suspend_menu',

  // ফলাফল পর্যবেক্ষণ
  RESULT_MONITORING_MENU_ITEM: 'v_result_monitor_menu',
  RESULT_MONITORING_CENTER_WISE_RESULT_MONITORING: 'v_center_wise_result_menu',
  RESULT_MONITORING_GRAPHICAL_OBSERVATION_DASHBOARD: 'c_view_graph_dashboard',
  RESULT_MONITORING_RESULT_OBSERVATION: 'v_result_observation_menu',
  RESULT_MONITORING_RESULTS_DRAFT: 'c_view_results_draft',

  // ফলাফল পর্যবেক্ষণ -> কেন্দ্র ভিত্তিক ফলাফল পর্যবেক্ষণ
  RESULT_MONITORING_TABLE_ACTION_ADMIN: 'c_return_result', // for admin -> পুনরায় পাঠান
  RESULT_MONITORING_TABLE_ACTION_RO: 'c_request_return_result', // for ro -> পুনরায় পাঠানর জন্য অনুরোধ
  RESULT_MONITORING_VIEW_RESULT_HISTORY: 'c_view_result_history', //for admin -> result history view
  RESULT_MONITORING_CANCEL_FINAL_BARTA_SHEET: 'c_cancel_final_barta_sheet',
  RESULT_MONITORING_PUBLISH_TO_APP: 'c_publish_result_to_user_app', // for publishing to app

  // রিপোর্ট
  REPORT_MENU_ITEM: 'v_report_menu',
  REPORT_CONSOLIDATED_REPORT: 'c_view_consolidated_report', // একীভূত বিবরণী (১৮ তম ফর্ম)
  REPORT_ELECTION_REPORT: 'c_view_election_report', // নির্বাচনের ফলাফল
  REPORT_TIME_BASED_REPORT: 'c_time_based_report', // সময়ভিত্তিক ফলাফল
  REPORT_PARTY_BASED_REPORT: 'c_party_based_report', // দলভিত্তিক প্রতিবেদন
  REPORT_NINETEENTH_FORM: 'c_result_return_report', // ১৯ তম ফর্ম
  REPORT_WINNING_CANDIDATES: 'c_view_report_winning_candidates', // নির্বাচিত ঘোষিত প্রার্থীগণের তালিকা

  // নির্বাচন পরিবর্তন
  ELECTION_CHANGE: 'v_result_management_ec_change_menu',

  // পোস্টাল ব্যালট
  POSTAL_BALLOT: 'c_submit_postal_vote',
};
