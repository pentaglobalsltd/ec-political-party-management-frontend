export const CENTER_OFFICER_MANAGEMENT = {
  /*
   * Center Officer Management
   */

  // Officer List
  GET_OFFICERS: '/polling-personnels',
  CREATE_OFFICER: '/polling-personnels',
  GET_OFFICER: (id: string | number) => `/polling-personnels/${id}`,
  GET_PAY_SCALES: '/pay-scales',
  UPDATE_OFFICER: (id: string | number) => `/polling-personnels/${id}`,
  DELETE_OFFICER: (id: string | number) => `/polling-personnels/${id}`,

  CREATE_AGENCY: '/agencies',
  GET_AGENCY_LIST: '/agencies',
  GET_AGENCY_TYPE: '/agency-types',
  GET_AGENCY: (id: string | number) => `/agencies/${id}`,
  UPDATE_AGENCY_BY_ID: (id: string | number) => `/agencies/${id}`,
  DELETE_AGENCY_BY_ID: (id: string | number) => `/agencies/agencies/${id}`,

  // Political party
  GET_POLITICAL_PARTY_LIST: '/political-parties',
  GET_SINGLE_POLITICAL_PARTY: (id: string | number) =>
    `/political-parties/${id}`,
  CREATE_POLITICAL_PARTY: '/political-parties',
  UPDATE_POLITICAL_PARTY: (id: string | number) => `/political-parties/${id}`,
  GET_SYMBOLS_LIST: `/political-parties/available-symbols`,

  // symbol
  GET_SYMBOL_LIST: '/symbols',
  GET_SYMBOL: (id: number | string) => `/symbols/${id}`,
  CREATE_SYMBOL: '/symbols',
  UPDATE_SYMBOL: (id: number | string) => `/symbols/${id}`,

  CENTER_OFFICER_PARTICIPANT_COUNT: '/polling-personnels/count',
  CENTER_OFFICER_BULK_SMS: '/polling-personnels/bulk-sms',

  // ===================================

  CREATE_CENTER_WISE_POLLING_PERSONNEL_DETAILS: (
    electionScheduleId: string | number,
  ) =>
    `/election-schedule/${electionScheduleId}/center-wise-polling-personnel-details`,

  GET_POLLING_PERSONNEL_CENTER_SEND_CREDENTIAL: (id: number) =>
    `/polling-personnel-center/${id}/send-credential`,

  GET_POLLING_PERSONNEL_SUMMARY: '/polling-personnel-summary',

  CREATE_POLLING_PERSONNEL_ALLOCATE: '/polling-personnel-allocate',

  DELETE_POLLING_PERSONNEL_ALLOCATE: (id: string | number) =>
    `/polling-personnel-allocate/${id}`,

  // REPORT_USER_DETAILS_BY_ID: ({ userId }: CandidateInfoReportUrlType) =>
  //   `user-profile-details/${userId}`,

  GET_POLLING_PERSONNEL_SUMMARY_LETTERS: '/polling-personnels-letters',
  GET_CENTER_OFFICER_CONTACT_DETAILS: '/polling-centers-with-personnel',
};
