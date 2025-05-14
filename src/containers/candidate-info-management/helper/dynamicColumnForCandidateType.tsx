import { t } from 'i18next';
import { ELECTION_INFO } from '@constants/election-info';
import { TableData } from '@pentabd/ui';

export function dynamicColumnForCandidateType({
  params,
  isAdmin,
  hide = false,
}: {
  params: any;
  isAdmin: boolean;
  hide?: boolean;
}) {
  // election wise switch case
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin
        ? [
            {
              id: 40,
              name: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_TYPE_NAME'),
              key: 'candidateType',
              hide: hide,
            },
          ]
        : [];

    default:
      return [
        {
          id: 40,
          name: t('CANDIDATE_APPLIED_ONLINE.CANDIDATE_TYPE_NAME'),
          key: 'candidateType',
          hide: hide,
        },
      ];
  }
}

export function dynamicSecondaryRowForCandidateType({ item, isAdmin }: any) {
  // election wise switch case
  switch (Number(item?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin ? <TableData>{item?.candidateType}</TableData> : <></>;

    default:
      return <TableData>{item?.candidateType}</TableData>;
  }
}
