import { ELECTION_INFO } from '@constants/election-info';

export function dynamicColumnForElectionScheduleName({
  params,
  t,
  isAdmin,
}: any) {
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin
        ? [
            {
              id: 4,
              name: t('CANDIDATE_APPLIED_ONLINE.ELECTION_NAME'),
              key: 'electionScheduleName',
            },
          ]
        : [];

    default:
      return [
        {
          id: 4,
          name: t('CANDIDATE_APPLIED_ONLINE.ELECTION_NAME'),
          key: 'electionScheduleName',
        },
      ];
  }
}
