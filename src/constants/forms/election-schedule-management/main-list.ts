export const MAIN_LIST = {
  DIVISION: {
    CREATE_DIVISION: {
      NAME_EN: 'nameEn',
      NAME_BN: 'nameBn',
      DIVISION_GO_CODE: 'regionCode',
    },
  },

  DISTRICT: {
    CREATE_DISTRICT: {
      DIVISION: 'regionId',
      DISTRICT_BN: 'nameBn',
      DISTRICT_EN: 'nameEn',
      DISTRICT_GO_CODE: 'zillaCode',
      SERIAL_NO: 'serialNo',
    },
  },

  SUB_DISTRICT: {
    CREATE_SUB_DISTRICT: {
      DISTRICT: 'zillaId',
      SUB_DISTRICT_BN: 'nameBn',
      SUB_DISTRICT_EN: 'nameEn',
      GO_CODE: 'upazilaCode',
      IS_THANA: 'isThana',
    },
  },

  UNION: {
    UNION_SEARCH: {
      DIVISION: 'division',
      DISTRICT: 'district',
      SUB_DISTRICT: 'subDistrict',
      GO_CODE: 'goCode',
      UNION: 'union',
    },
    CREATE_UNION: {
      NAME_BN: 'nameBn',
      NAME_EN: 'nameEn',
      GEO_CODE: 'geoCode',
      MUNICIPALITY_NAME_BN: 'municipalityNameBn',
      MUNICIPALITY_NAME_EN: 'municipalityNameEn',
      SUB_DISTRICT_NAME_BN: 'upazilaNameBn',
      SUB_DISTRICT_NAME_EN: 'upazilaNameEn',
      ZILLA_NAME_BN: 'zillaNameBn',
      ZILLA_NAME_EN: 'zillaNameEn',
      ZILLA_ID: 'zillaId',
      SUB_DISTRICT_ID: 'upazilaId',
      MUNICIPALITY_ID: 'municipalityId',
    },
  },

  MUNICIPALITY: {
    MUNICIPALITY_SEARCH: {
      DIVISION: 'division',
      DISTRICT: 'district',
      MUNICIPALITY: 'municipality',
    },
    CREATE_MUNICIPALITY: {
      DISTRICT: 'zillaId',
      SUB_DISTRICT: 'upazilaIds',
      MUNICIPALITY_BN: 'nameBn',
      MUNICIPALITY_EN: 'nameEn',
      MUNICIPALITY_GO_CODE: 'municipalityCode',
      RMO: 'rmoEn',
    },
  },

  RESERVED_SEAT_LIST: {
    RESERVED_SEAT_LIST_SEARCH: {
      DIVISION: 'division',
      DISTRICT: 'district',
      MUNICIPALITY: 'municipality',
    },
    CREATE_RESERVED_SEAT_LIST: {
      RMO: 'rmo',
      DIVISION: 'regionId',
      DISTRICT: 'zillaId',
      MUNICIPALITY: 'municipalityId',
      MUNICIPALITY_BN: 'municipalityNameBn',
      SUB_DISTRICT: 'upazilaId',
      RESERVED_WARD_NO: 'code',
      RESERVED_WARD_BN: 'nameBn',
      RESERVED_WARD_EN: 'nameEn',
      INCLUSION: 'municipalityWardIds',
      INCLUSION_GET: 'unionOrWards',
      INCLUSION_1: 'inclusion1',
      INCLUSION_2: 'inclusion2',
      INCLUSION_3: 'inclusion3',
      INCLUSION_4: 'inclusion4',
      CONDITION: 'isActive',
    },
  },

  PARLIAMENTARY_SEAT: {
    PARLIAMENTARY_SEAT_SEARCH: {
      DIVISION: 'division',
      DISTRICT: 'district',
      PARLIAMENTARY_SEAT: 'parlamentarySeat',
    },
    CREATE_PARLIAMENTARY_SEAT: {
      DIVISION: 'regionId',
      DISTRICT: 'zillaId',
      PARLIAMENTARY_SEAT: 'constituencyId',
      SUB_DISTRICT: 'upazilaId',
      UNION: 'unionOrWardId',
    },
  },

  ZILLA_WARD: {
    CREATE_ZILLA_WARD: {
      DISTRICT: 'district',
      WARD_BN: 'wardBn',
      WARD_EN: 'wardEn',
      GO_CODE: 'goCode',
    },
  },

  DISTRICT_RESERVED_SEATS: {
    CREATE_DISTRICT_RESERVED_SEATS: {
      RMO: 'rmo',
      DIVISION: 'division',
      DISTRICT: 'district',
      RESERVED_WARD_NO: 'reservedWardNo',
      RESERVED_WARD_BN: 'reservedWardBn',
      RESERVED_WARD_EN: 'reservedWardEn',
      INCLUSION: 'inclusion',
      INCLUSION_1: 'inclusion1',
      INCLUSION_2: 'inclusion2',
      INCLUSION_3: 'inclusion3',
      INCLUSION_4: 'inclusion4',
      CONDITION: 'condition',
    },
  },
  MESSAGE_LIST: {
    EVENT_BN: 'nameBn',
    EVENT_EN: 'nameEn',
  },
};
