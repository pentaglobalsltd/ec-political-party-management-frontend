export const ELECTION_SCHEDULE_MANAGEMENT_ROUTES = {
  ELECTION_DECLARATION_MANAGEMENT: '/election-declaration-management',

  // Declare Schedule
  DECLARE_SCHEDULE: 'declare-schedule',
  ADD_NEW_SCHEDULE_DECLARATION:
    '/election-declaration-management/declare-schedule/add-new-schedule-declaration',
  EDIT_SCHEDULE_DECLARATION: (id: string | number) =>
    `/election-declaration-management/declare-schedule/${id}`,

  // Election Settings
  ELECTION_SETTINGS: 'election-settings',
  CREATE_ELECTION_SETTINGS: 'create',
  EDIT_ELECTION_SETTINGS: (id: string | number) => `edit/${id}`,

  // Nomination Letter
  NOMINATION_LETTER: 'nomination-letter',
  CREATE_NOMINATION_LETTER: 'create-nomination',
  EDIT_NOMINATION_LETTER: (id: string | number) => `${id}`,

  // Election Calendar
  ELECTION_CALENDER: 'election-calender',
  // Possible Election
  POSSIBLE_ELECTION: 'possible-election',

  // Election Transfer
  ELECTION_TRANSFER: 'election-transfer',

  // Election Process নির্বাচন প্রক্রিয়া -> তফসিল তথ্য সংযোজন
  ADD_SCHEDULE_INFO: 'add-schedule-info',
  CREATE_ELECTION_SCHEDULE_INFO: (electionSettingsId?: string | number) =>
    `create/${electionSettingsId}`,
  EDIT_ELECTION_SCHEDULE_INFO: (electionSettingsDetailsId: string | number) =>
    `edit/${electionSettingsDetailsId}`,

  // নির্বাচন প্রক্রিয়া -> অ্যাপ্লিকেশনে তথ্য প্রকাশ
  DATA_PROVIDER_INFO: 'data-provider-info',

  // Division
  DIVISION: 'division',
  CREATE_DIVISION: 'create-division',
  EDIT_DIVISION: (id: string | number) => `${id}`,

  // District
  DISTRICT: 'district',
  CREATE_DISTRICT: 'create-district',
  EDIT_DISTRICT: (id: string | number) => `${id}`,

  // Sub district
  SUB_DISTRICT: 'sub-district',
  CREATE_SUB_DISTRICT: 'create',
  EDIT_SUB_DISTRICT: (id: string | number) => `${id}`,

  // Union
  UNION: 'union',
  CREATE_UNION: 'create-union',
  EDIT_UNION: (id: string | number) => `${id}`,

  // Municipality
  MUNICIPALITY: 'municipality',
  CREATE_MUNICIPALITY: 'create-municipality',
  EDIT_MUNICIPALITY: (id: string | number) => `${id}`,

  // Reserved Seat List
  RESERVED_SEAT_LIST: 'reserved-seat-list',
  CREATE_RESERVED_SEAT_LIST: 'create-reserved-seat-list',
  EDIT_RESERVED_SEAT_LIST: (id: string | number) => `${id}`,

  // Parliamentary Seat
  PARLIAMENTARY_SEAT: 'parliamentary-seat',
  CREATE_PARLIAMENTARY_SEAT: 'create-parliamentary-seat',
  EDIT_PARLIAMENTARY_SEAT: (id: string | number) => `${id}`,

  // Zilla Ward
  ZILLA_WARD: 'zilla-ward',
  CREATE_ZILLA_WARD: 'create',
  EDIT_ZILLA_WARD: (id: string | number) => `${id}`,

  // District Reserved Seats
  DISTRICT_RESERVED_SEATS: 'district-reserved-seats',
  CREATE_DISTRICT_RESERVED_SEATS: 'create-district-reserved-seats',
  EDIT_DISTRICT_RESERVED_SEATS: (id: string | number) => `${id}`,

  // Election Type
  ELECTION_TYPE: 'election-type',
  CREATE_ELECTION_TYPE: 'create-election-type',
  EDIT_ELECTION_TYPE: (id: string | number) => `${id}`,

  // Candidate Type
  CANDIDATE_TYPE: 'candidate-type',

  // Institution Building Type
  INSTITUTION_BUILDING_TYPE: 'institution-building-type',
  CREATE_INSTITUTION_BUILDING_TYPE: 'create-institution-building-type',
  EDIT_INSTITUTION_BUILDING_TYPE: (id: string | number) => `${id}`,
  // Institution Type
  INSTITUTE_TYPE: 'institute-type',
  CREATE_INSTITUTE_TYPE: 'add-institute-type',
  EDIT_INSTITUTE_TYPE: (id: string | number) => `${id}`,

  // Election Ceremony Information
  ELECTION_CEREMONY_INFORMATION: 'election-ceremony-information',

  // barta list
  MESSAGE_LIST: 'message-list',

  // Union Reserved Seat
  UNION_RESERVED_SEAT: 'union-reserved-seat',
  ADD_UNION_RESERVED_SEAT: 'add',
  EDIT_UNION_RESERVED_SEAT: (id: string | number) => `${id}`,

  // Details of Election Process
  DETAILS_OF_ELECTION_PROCESS: 'details-of-election-process',

  // Election Procedures Report
  ELECTION_PROCEDURES_REPORT: 'election-procedures-report',

  //helpline
  HELPLINE: 'helpline',
};
