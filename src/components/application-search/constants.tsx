import { TFunction } from 'i18next';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';

export const logTypeOptions = (t: TFunction<'translation', undefined>) => [
  {
    label: t('SYSTEM_LOG.CANDIDTAE_PORTAL_LOGIN'),
    value: 'candidatePortalLogin',
  },
  {
    label: t('SYSTEM_LOG.LOGIN'),
    value: 'login',
  },
  {
    label: t('SYSTEM_LOG.ELECTION_SCHEDULE'),
    value: 'electionSchedule',
  },
  {
    label: t('SYSTEM_LOG.USER'),
    value: 'user',
  },
  {
    label: t('SYSTEM_LOG.NATALI_ELECTION_SETTING'),
    value: 'electionSetting',
  },
  {
    label: t('SYSTEM_LOG.AUTH_API_LOGIN'),
    value: 'authApiLogin',
  },
  {
    label: t('SYSTEM_LOG.CANDIDATE_REGISTRATION'),
    value: 'candidateRegistration',
  },
  {
    label: t('SYSTEM_LOG.ELECTION_RESULT'),
    value: 'electionResult',
  },
  {
    label: t('SYSTEM_LOG.CUMULATIVE_RESULT'),
    value: 'cumulativeResult',
  },
  {
    label: t('SYSTEM_LOG.API_EVENTS'),
    value: 'apiEvents',
  },
  {
    label: t('SYSTEM_LOG.API_CENTER_IMAGE'),
    value: 'apiCenterImage',
  },
  {
    label: t('SYSTEM_LOG.API_INCIDENT'),
    value: 'apiIncident',
  },
  {
    label: t('SYSTEM_LOG.API_VOTE_COUNTING'),
    value: 'apiVoteCounting',
  },
  {
    label: t('SYSTEM_LOG.API_BALLOT_BOX'),
    value: 'apiBallotBox',
  },
  {
    label: t('SYSTEM_LOG.API_POLING_AGENT'),
    value: 'apiPolingAgent',
  },
  {
    label: t('SYSTEM_LOG.AUTH_BALLOT_PAPER'),
    value: 'authBallotPaper',
  },
  {
    label: t('SYSTEM_LOG.CANDIDATE_NOMINATION_FORM'),
    value: 'candidateNominationForm',
  },
  {
    label: t('SYSTEM_LOG.CANDIDATE'),
    value: 'candidate',
  },
  {
    label: t('SYSTEM_LOG.NOMINATION_CANDIDATE'),
    value: 'nominationCandidate',
  },
  {
    label: t('SYSTEM_LOG.ELECTION_NOMINATION_PAPERS'),
    value: 'nominationPapers',
  },
];

export function AvailableCases() {
  const { language } = useLanguage();
  const options = [
    {
      label: language === LANGUAGE.BANGLA ? 'আছে' : 'Yes',
      value: 'yes',
    },
    {
      label: language === LANGUAGE.BANGLA ? 'নেই' : 'No',
      value: 'no',
    },
  ];
  return options;
}

export const CENTER_STATUS_CREATED = '1';
export const CENTER_STATUS_NOT_CREATED = '0';

export function CenterStatus() {
  const { language } = useLanguage();
  const options = [
    {
      label: language === LANGUAGE.BANGLA ? 'তৈরিকৃত' : 'Created',
      value: CENTER_STATUS_CREATED,
    },
    {
      label: language === LANGUAGE.BANGLA ? 'তৈরি করা হয়নি' : 'Not Created',
      value: CENTER_STATUS_NOT_CREATED,
    },
  ];
  return options;
}

export const RMO_MUNICIPALITY = 'MUNICIPALITY';
export const RMO_CITYCORPORATION = 'CITYCORPORATION';
export const RMO_RURAL = 'RURAL';

export const MUNICIPALITY_TYPE: any = {
  MUNICIPALITY: 'CENTER_OFFICER_MANAGEMENT_SEARCH.MUNICIPALITY',
  CITYCORPORATION: 'CENTER_OFFICER_MANAGEMENT_SEARCH.CITYCORPORATION',
  RURAL: 'CENTER_OFFICER_MANAGEMENT_SEARCH.RURAL',
  CITY: 'CENTER_OFFICER_MANAGEMENT_SEARCH.CITY',
  CANTONMENT: 'CENTER_OFFICER_MANAGEMENT_SEARCH.CANTONMENT',
  OTHER: 'CENTER_OFFICER_MANAGEMENT_SEARCH.OTHER',
};

export const USER_TYPE_CODE_ALL = 'all';
export const userTypesIncludingAll = [
  {
    label: 'সকল',
    value: USER_TYPE_CODE_ALL,
  },
  {
    label: 'প্রিজাইডিং অফিসার',
    value: '1011',
  },
  {
    label: 'সহকারি প্রিজাইডিং অফিসার',
    value: '1012',
  },
  {
    label: 'পোলিং অফিসার',
    value: '1013',
  },
];

export const userTypesCodeDesignation = [
  {
    label: 'প্রিজাইডিং অফিসার',
    value: '1011',
  },
  {
    label: 'সহকারি প্রিজাইডিং অফিসার',
    value: '1012',
  },
  {
    label: 'পোলিং অফিসার',
    value: '1013',
  },
];
export enum SORT_BY {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  LOGIN_ID = 'LOGIN_ID',
}
export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const ResultTypes = (t: TFunction<'translation', undefined>) => {
  const options = [
    {
      label: t('ELECTION_RESULT.PARTIALLY_PUBLISHED'),
      value: 'PARTIALLY_PUBLISHED',
    },
    {
      label: t('ELECTION_RESULT.FINALLY_PUBLISHED'),
      value: 'FINALLY_PUBLISHED',
    },
    {
      label: t('ELECTION_RESULT.INCOMPLETE'),
      value: 'INCOMPLETE',
    },
    {
      label: t('ELECTION_RESULT.ALL'),
      value: 'ALL',
    },
  ];
  return options;
};

export const API_SERVICE = {
  CORE: 'core',
  MASTER: 'master',
};

export const RMO = {
  RURAL: 'RURAL',
  CITY_CORPORATION: 'CITYCORPORATION',
  CITY: 'CITY',
  MUNICIPALITY: 'MUNICIPALITY',
  CANTONMENT: 'CANTONMENT',
  OTHER: 'OTHER',
};
export const isActiveOptions = [
  {
    label: 'সক্রিয়',
    value: 'true',
  },
  {
    label: 'নিষ্ক্রিয়',
    value: 'false',
  },
];

export const distributedOfficerOptions = [
  {
    label: 'আছে',
    value: 'true',
  },
  {
    label: 'নেই',
    value: 'false',
  },
];

export const ALL_MONTHS = [
  {
    label: 'January',
    value: 1,
  },
  {
    label: 'February',
    value: 2,
  },
  {
    label: 'March',
    value: 3,
  },
  {
    label: 'April',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'June',
    value: 6,
  },
  {
    label: 'July',
    value: 7,
  },
  {
    label: 'August',
    value: 8,
  },
  {
    label: 'September',
    value: 9,
  },
  {
    label: 'October',
    value: 10,
  },
  {
    label: 'November',
    value: 11,
  },
  {
    label: 'December',
    value: 12,
  },
];
