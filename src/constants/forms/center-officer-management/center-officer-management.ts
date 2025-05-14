export const CENTER_OFFICER_MANAGEMENT = {
  CONTROLLER_LIST: {
    //Symbol
    SYMBOL: {
      CREATE_SYMBOL: {
        SYMBOL_NAME_BN: 'nameBn',
        SYMBOL_NAME_EN: 'nameEn',
        ELECTION_TYPE: 'electionType',
        CANDIDATE_TYPE: 'candidateTypeIds',
        SYMBOL_IMAGE: 'file',
      },
      SEARCH_SYMBOL: 'search-symbol-list',
    },

    ORGANIZATION_LIST: {
      CREATE_ORGANIZATION_LIST: {
        DIVISION: 'regionId',
        DISTRICT: 'zillaId',
        SUBDISTRICT: 'upazilaId',
        RMO: 'rmoEn',
        CITY_CORPORATION: 'municipalityId',
        UNION_OR_WARD: 'unionOrWardId',
        ORGANIZATION_TYPE: 'agencyTypeId',
        ORGANIZATION_NAME_BN: 'nameBn',
        ORGANIZATION_NAME_EN: 'nameEn',
        ORGANIZATION_ADDRESS_BN: 'addressBn',
        ORGANIZATION_ADDRESS_EN: 'addressEn',
        ORGANIZATION_EMAIL: 'email',
        CONTACT_NO: 'mobileNo',
        CONDITION: 'isActive',
      },
      FILE: 'file',
    },

    // Officer List
    OFFICER_LIST: {
      SEARCH_OFFICER: 'search-officer-list',
      FILE: 'file',
      CREATE_OFFICER_LIST: {
        REGION: 'regionId',
        DISTRICT: 'zillaId',
        SUB_DISTRICT: 'upazilaId',
        RMO: 'rmo',
        MUNICIPALITY: 'municipilityId',
        UNION_OR_WARD: 'unionOrWordId',
        AGENCY: 'agencyId',
        NID_NUMBER: 'nid',
        NAME_BN: 'nameBn',
        NAME_EN: 'nameEn',
        FATHER_NAME: 'fatherName',
        OWN_DISTRICT: 'personalZillaId',
        DATE_OF_BIRTH: 'dob',
        AGE: 'age',
        DESIGNATION_BN: 'designation',
        MOBILE_NUMBER: 'phone',
        BASIC_SALARY: 'basicSalary',
        PAY_SCALE: 'payScaleId',
        CURRENT_WORK_ADDRESS: 'currentWorkPlaceAddress',
        PERMANENT_ADDRESS: 'permanentAddress',
        PROBABLE_OFFICER_GROUP: 'userTypeCode',
        IS_IT_KNOWLEDGEABLE: 'isItKnowledge',
        IS_VOTED_EVM: 'isVotedInEvm',
        IS_ON_MATERNITY_LEAVE: 'isOnMaternityLeave',
        IS_ON_EDUCATION_LEAVE: 'isOnEducationLeave',
        IS_ON_PRN: 'isOnPrn',
      },
    },

    // Political Party
    POLITICAL_PARTY: {
      REGISTRATION_NO: 'regNo',
      PARTY_NAME_BN: 'nameBn',
      PARTY_NAME_EN: 'nameEn',
      ADDRESS: 'address',
      SYMBOL: 'symbolId',
      IS_ACTIVE: 'isActive',
    },

    // Center Based Officer Allocation
    CENTER_BASED_OFFICER_ALLOCATION: {
      DESIGNATION: 'userTypeCode',
      BOOTH: 'boothNo',
      IS_ACTIVE_PRESIDING_OFFICER: 'isIncharge',
    },
  },

  // Center Officer Send SMS
  SEND_SMS: {
    ELECTION_TYPE: 'electionTypeId',
    ELECTION_SCHEDULE: 'electionScheduleId',
    SMS_TEXT: 'textValue',
  },
};
