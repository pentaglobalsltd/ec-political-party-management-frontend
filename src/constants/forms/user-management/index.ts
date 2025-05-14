export const USER_MANAGEMENT = {
  SYSTEM_USER_SEARCH: {
    ELECTION_TYPE: 'electionType',
    ELECTION_NAME: 'electionName',
    USER: 'user',
  },
  ELECTION_USER_SEARCH: {
    SEARCH_ELECTION_USER: 'search-election-user',
  },
  CREATE_ELECTION_USER: {
    USER_ROLE: 'userTypeCode',
    NAME: 'name',
    EMAIL: 'email',
    LOGIN_ID: 'loginId',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    AGENCY_ADMIN: {
      DEPARTMENT: 'department',
      DISTRICT: 'district',
      UPAZILA: 'upazila',
      RMO: 'rmo',
      MUNICIPALITY: 'municipality',
      UNION: 'union',
      AGENCY: 'agency',
    },
    REGIONAL_ELECTION_OFFICER: {
      DEPARTMENT: 'department',
    },
    UPAZILA_THANA_ELECTION_OFFICER: {
      DEPARTMENT: 'department',
      DISTRICT: 'district',
      UPAZILA: 'upazila',
    },
    DISTRICT_ELECTION_OFFICER: {
      DEPARTMENT: 'department',
      DISTRICT: 'district',
    },
    RETURNING_OFFICER: {
      TYPE_OF_ELECTION: 'electionTypeId',
      ELECTION_NAME: 'electionScheduleId',
      DISTRICT: 'zillaId',
      UPAZILA: 'upazilaIds',
      ELECTION_SETTINGS: 'electionSettingsIds',
      MUNICIPALITY: 'municipalityIds',
    },
    ASSISTANT_RETURNING_OFFICER: {
      TYPE_OF_ELECTION: 'electionTypeId',
      ELECTION_NAME: 'electionScheduleId',
      DISTRICT: 'zillaId',
      ELECTION_SETTINGS: 'electionSettingsIds',
      UPAZILA: 'upazilaIds',
      MUNICIPALITY: 'municipalityIds',
      UNION: 'unionOrWardIds',
      CENTER: 'pollingCenterIds',
    },
    DATA_ENTRY_OPERATOR: {
      TYPE_OF_ELECTION: 'electionTypeId',
      ELECTION_NAME: 'electionScheduleId',
      DISTRICT: 'zillaId',
      UPAZILA: 'upazilaIds',
      MUNICIPALITY: 'municipalityIds',
      ELECTION_SETTINGS_FOR_MUNICIPALITY:
        'electionSettingsForMunicipalityExists',
      UNION_WARD: 'reservedWardIds',
      ELECTION_SETTINGS: 'electionSettingsIds',
    },
    PRESIDING_OFFICER: {
      TYPE_OF_ELECTION: 'electionTypeId',
      ELECTION_NAME: 'electionScheduleId',
      DISTRICT: 'zillaId',
      ELECTION_SETTINGS: 'electionSettingsIds',
      UPAZILA: 'upazilaId',
      UNION: 'unionOrWardId',
      CENTER: 'pollingCenterIds',
    },
  },
  CREATE_SYSTEM_USER: {
    UPAZILA_THANA_ELECTION_OFFICER: {
      REGION: 'regionId',
      ZILLA: 'zillaId',
      UPAZILA: 'upazilaIds',
    },
    ZILLA_ELECTION_OFFICER: {
      REGION: 'regionId',
      ZILLA: 'zillaId',
    },
    REGIONAL_ELECTION_OFFICER: {
      REGION: 'regionId',
    },
  },
  AUTOMATIC_USER: {
    USER_TYPE_CODE: 'userTypeCode',
    ELECTION_SCHEDULE: 'electionScheduleId',
  },
};
