import { ELECTION_INFO } from '@constants/election-info';
import { TFunction } from 'i18next';

export const submitResultModalColumn = ({
  t,
  electionTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: number;
}) => [
  {
    id: 1,
    name: t('SUBMIT_RESULTS.CANDIDATE_NAME'),
  },
  {
    id: 2,
    name: t('SUBMIT_RESULTS.CANDIDATE_SYMBOL'),
  },

  // "বৈধ ভোটের সংখ্যা"
  {
    id: 3,
    name: t('SUBMIT_RESULTS.VALID_VOTER_NO'),
  },

  ...electionSpecificColumns({ t, electionTypeId }),
];

const electionSpecificColumns = ({
  t,
  electionTypeId,
}: {
  t: TFunction<'translation', undefined>;
  electionTypeId: number;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      return nationalElectionColumns(t);

    case ELECTION_INFO.UPAZILLA.ID:
      return nationalElectionColumns(t);

    default:
      return [];
  }
};

const nationalElectionColumns = (t: TFunction<'translation', undefined>) => {
  return [
    // আপত্তিকর বৈধ ভোটের সংখ্যা
    {
      id: 4,
      name: t('SUBMIT_RESULTS.OBJECTIONABLE_VALID_VOTER_NO'),
    },

    // মোট বৈধ ভোটের সংখ্যা
    {
      id: 5,
      name: t('SUBMIT_RESULTS.ROW_TOTAL_VALID_VOTER_NO'),
    },
  ];
};
