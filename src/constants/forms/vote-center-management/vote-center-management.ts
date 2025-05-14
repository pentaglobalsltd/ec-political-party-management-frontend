export const VOTE_CENTER_MANAGEMENT = {
  // Main List
  MAIN_LIST: {
    UNION_WARD: {
      ADD_UNION_WARD: {
        DIVISION: 'regionId',
        DISTRICT: 'zillaId',
        SUB_DISTRICT: 'upazilaId',
        UNION_OR_WARD: 'unionId',
        WARD_NUMBER: 'unionWardCode',
        WARD_NAMEEN: 'nameEn',
        WARD_NAMEBN: 'nameBn',
      },
    },

    UNION_RESERVED_SEAT: {
      ADD_UNION_RESERVED_SEAT: {
        RMO: 'rmo',
        DIVISION: 'regionId',
        DISTRICT: 'zillaId',
        SUB_DISTRICT: 'upazilaId',
        UNION: 'unionId',
        UNION_WARD_MULTI: 'unionWardIds',
        RESERVED_WARD_CODE: 'code',
        RESERVED_WARD_NAME_EN: 'nameEn',
        RESERVED_WARD_NAME_BN: 'nameBn',
      },
    },

    VOTER_AREA: {
      SEARCH_VOTER_AREA: {
        DIVISION: 'region',
        DISTRICT: 'zila',
        SUB_DISTRICT: 'upazila',
        CITY_CORPORATION: 'municipality',
        UNION: 'unionOrWard',
        VOTER_AREA_CODE: 'areaCode',
        CENTER_TYPE: 'centerType',
      },
      CREATE_VOTER_AREA: {
        DISTRICT: 'zillaId',
        SUB_DISTRICT: 'upazilaId',
        CITY_CORPORATION: 'municipalityId',
        UNION_OR_WARD: 'unionOrWardId',
        UNION_PARISHAD_WARD: 'unionWardId',
        VOTER_AREA_CODE: 'areaCode',
        VOTER_AREA_NAME_IN_ENGLISH: 'nameEn',
        VOTER_AREA_NAME_IN_BANGLA: 'nameBn',
        MALE_VOTER: 'maleVoter',
        FEMALE_VOTER: 'femaleVoter',
        THIRD_GENDER_VOTER: 'thirdGenderVoter',
        TOTAL_VOTER: 'totalVoter',
      },
    },
  },

  // Center Management
  CENTER_MANAGEMENT: {
    VOTE_CENTER_ADDITION: {
      VOTE_CENTER_ADDITION_SEARCH: {
        ELECTION_TYPE: 'electionType',
        ELECTION_NAME: 'electionName',
        ELECTION_SETTINGS: 'electionSettings',
        DISTRICT_BY_ELECTION_SETTINGS: 'districtElectionSettings',
        DISTRICT_BY_ELECTION_SCHEDULE_CANDIDATE_TYPE:
          'districtElectionScheduleCandidateType',
        SUB_DISTRICT: 'subDistrict',
        UNION: 'union',
        CENTER_TYPE: 'centerType',
        CANDIDATE_TYPE: 'candidateType',
        TAB: 'tab',
        RESULT_FROM_EVM: 'resultFromEvm',
      },

      CANCEL_MODAL_COMMENT: 'statusComments',

      NEW_CENTER: {
        ADD_VOTE_CENTER: {
          ELECTION_TYPE: 'addCenterElectionType',
          ELECTION_NAME: 'addCenterElectionName',
          ELECTION_SETTINGS: 'addCenterElectionSettings',
          ELECTORAL_SEAT: 'addCenterElectoralSeat',
          DISTRICT: 'addCenterDistrict',
          UPAZILA: 'addCenterUpazilla',
          UNION: 'addCenterUnion',
          UP_WARD: 'addCenterWard',
        },
        SEARCH_VOTE_CENTER: 'search-vote-center',
        UPDATE_VOTE_CENTER: {
          IS_CHECKED: 'isSelected',
          SERIAL_NO: 'serial',

          CENTER_INSTITUTE_NAME_BN: 'centerInstituteNameBn',
          CENTER_INSTITUTE_NAME_EN: 'centerInstituteNameEn',

          CENTER_DESCRIPTION_BANGLA: 'descriptionBn',
          CENTER_DESCRIPTION_ENGLISH: 'descriptionEn',
          CENTER_TYPE: 'voterType',
          CENTER_ADDRESS_BANGLA: 'addressBn',
          CENTER_ADDRESS_ENGLISH: 'addressEn',
          TOTAL_BOOTH: 'numberOfBooth',
          NUMBER_OF_TEMPORARY_BOOTH: 'numberOfTemporaryBooth',
          TEMPORARY_CENTER: 'isTemporary',
          TAB_CENTER: 'isTabCenter',
          EVM_RESULT: 'isEvmCenter',
          STATUS: 'isActive',
        },

        ADD_VOTER_AREA_TABLE: {
          IS_CHECKED: 'isSelected',
          NUMBER_OF_VOTERS: {
            COL_MALE: 'maleVoter',
            COL_FEMALE: 'femaleVoter',
            COL_THIRD_GENDER: 'thirdGenderVoter',
          },
          SERIAL_OF_VOTERS_MALE: {
            COL_START: 'maleVoterSerialStart',
            COL_FINISH: 'maleVoterSerialEnd',
          },
          SERIAL_OF_VOTERS_FEMALE: {
            COL_START: 'femaleVoterSerialStart',
            COL_FINISH: 'femaleVoterSerialEnd',
          },

          SERIAL_OF_VOTERS_THIRD_GENDER: {
            COL_START: 'thirdGenderVoterSerialStart',
            COL_FINISH: 'thirdGenderVoterSerialEnd',
          },
        },
      },
    },

    POLLING_INSTITUTE: {
      SEARCH_POLLING_INSTITUTE: 'search-polling-institute',
      SEARCH_POLLING_CENTER: 'search-polling-center',
      CREATE_POLLING_INSTITUTE: {
        DIVISION: 'region',
        ZILA: 'zilla',
        UPAZILA: 'upazila',
        RMO: 'rmo',
        MUNICIPALITY_CITY_CORPORATION: 'municipality',
        UNION_WARD: 'unionOrWardId',
        UP_WARD: 'unionWardId',
        INSTITUTE_NAME_BANGLA: 'nameBn',
        INSTITUTE_NAME_ENGLISH: 'nameEn',
        INSTITUTE_ADDRESS_BANGLA: 'addressBn',
        INSTITUTE_ADDRESS_ENGLISH: 'addressEn',
        INSTITUTE_TYPE: 'instituteTypeId',
        HEAD_NAME_DESIGNATION: 'headName',
        HEAD_CONTACT_NO: 'headContactNo',
        INSTITUTE_EMPLOYEE_AMOUNT: 'noOfEmployee',
        BUILDING_TYPE: 'buildingTypeId',
        BUILDING_FLOORS: 'noOfFloor',
        TOTAL_ROOM_AMOUNT: 'noOfRoom',
        IS_INSTITUTE_ELECTRICITY_SUPPLY: 'hasElectricity',
        IS_INSTITUTE_DRINKING_WATER: 'hasWater',
        INSTITUTE_TOILET: 'hasToilet',
        IS_BOUNDARY_RAILED: 'hasBoundary',
        DESCRIPTION_OF_BLOCK: 'surroundings',
        INSTITUTE_DISTANCE: 'distanceFromCenter',
        INSTITUTE_REACHING_WAYS: 'waysToReach',
        IS_PAST_RISKY_IMPORTANT_INSTITUTE: 'isSensitive',
        IS_DAYLIGHT_ENOUGH: 'hasSufficientSunshine',
        IS_OPEN_SPACE: 'hasOpenSpace',
        IS_FLOOD_PRONE_AREA: 'isFloodAffectedArea',
        COMMENT: 'comments',
        LAT: 'lat',
        LON: 'lon',
      },
    },
  },
};
