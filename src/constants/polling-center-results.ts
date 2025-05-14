export enum POLLING_CENTER_COLORS {
  GRAY = 'gray',
  YELLOW = 'yellow',
  GREEN = 'green',
  RED = 'red',
}

export enum POLLING_CENTER_RESULT_STATUS {
  FORWARDED_BY_OP = 'FORWARDED_BY_OP',
  APPROVED_BY_ARO = 'APPROVED_BY_ARO',
  RETURNED_BY_ADMIN = 'RETURNED_BY_ADMIN',
  RETURNED_BY_ARO = 'RETURNED_BY_ARO',
  REQUESTED_BY_RO = 'REQUESTED_BY_RO',
  CREATED_BY_OP = 'CREATED_BY_OP',
  CLOSED = 'CLOSED',
}

export enum MESSAGE_SEND_STATUS {
  FORWARDED = 'FORWARDED',
  PUBLISHED = 'PUBLISHED',
  FINAL = 'FINAL',
}

export enum MESSAGE_SEND_STATUS_BN {
  FORWARDED = 'অপ্রকাশিত',
  PUBLISHED = 'প্রকাশিত',
  FINAL = 'চূড়ান্ত',
}

export const MESSAGE_SHEET = 'বার্তাশিট';

export const RESULT_POLLING_CENTER_OPTIONS_COLORS = {
  makeBgGray: ['CREATED_BY_OP', 'RETURNED_BY_ADMIN', 'RETURNED_BY_ARO'],
  makeBgGreen: ['FORWARDED_BY_OP', 'APPROVED_BY_ARO'],
  makeBgYellow: ['REQUESTED_BY_RO'],
  makeBgRed: ['CLOSED'],
};

export const RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS = {
  makeBgGreen: ['FORWARDED_BY_OP', 'APPROVED_BY_ARO'],
  makeBgGray: [
    'REQUESTED_BY_RO',
    'RETURNED_BY_ARO',
    'RETURNED_BY_ADMIN',
    'CREATED_BY_OP',
  ],
  makeBgRed: ['CLOSED'],
};

export const RESULT_POLLING_CENTER_DASHBOARD_OPTIONS_COLORS_FOR_ARO_DASHBOARD =
  {
    makeBgGreen: ['APPROVED_BY_ARO'],
    makeBgYellow: ['FORWARDED_BY_OP'],
    makeBgGray: ['RETURNED_BY_ARO', 'RETURNED_BY_ADMIN'],
    makeBgRed: ['CLOSED'],
  };
export enum DRAFT_RESULT_STATUS {
  RESOLVED = 'নিষ্পন্ন',
  UNRESOLVED = 'অনিষ্পন্ন',
  ALL = 'সকল ধরণের',
}

export enum SUBMISSION_NOTE_COLOR_CLASS {
  GREEN = 'success',
  RED = 'danger',
}

export enum VOTER_TYPE {
  MALE_EN = 'MALE',
  MALE_BN = 'পুরুষ',
  FEMALE_EN = 'FEMALE',
  FEMALE_BN = 'মহিলা',
  BOTH_EN = 'BOTH',
  BOTH_BN = 'উভয়',
}

export const bartaSheetStatusLabel = (status: string) => {
  if (status === MESSAGE_SEND_STATUS.FORWARDED)
    return MESSAGE_SEND_STATUS_BN.FORWARDED;
  else if (status === MESSAGE_SEND_STATUS.PUBLISHED)
    return MESSAGE_SEND_STATUS_BN.PUBLISHED;
  else if (status === MESSAGE_SEND_STATUS.FINAL)
    return MESSAGE_SEND_STATUS_BN.FINAL;
  else return '';
};

export const voterTypeLabel = (voterType?: string) => {
  if (voterType === VOTER_TYPE.MALE_EN) return VOTER_TYPE.MALE_BN;
  else if (voterType === VOTER_TYPE.FEMALE_EN) return VOTER_TYPE.FEMALE_BN;
  else if (voterType === VOTER_TYPE.BOTH_EN) return VOTER_TYPE.BOTH_BN;
  else return '';
};
