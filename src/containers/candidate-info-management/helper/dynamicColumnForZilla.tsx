import { t } from 'i18next';
import { ELECTION_INFO } from '@constants/election-info';
import { TableData } from '@pentabd/ui';

export function dynamicColumnForZilla({
  params,
  isAdmin,
}: {
  params: any;
  isAdmin: boolean;
}) {
  // election wise switch case
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin
        ? [
            {
              id: 40,
              name: t('CANDIDACY_WITHDRAWAL.DISTRICT'),
              key: 'electionZilla',
            },
          ]
        : [];

    default:
      return [
        {
          id: 40,
          name: t('CANDIDACY_WITHDRAWAL.DISTRICT'),
          key: 'electionZilla',
        },
      ];
  }
}

export function dynamicSecondaryRowForZilla({ item, isAdmin }: any) {
  // election wise switch case
  switch (Number(item?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin ? <TableData>{item?.electionZilla}</TableData> : <></>;

    default:
      return <TableData>{item?.electionZilla}</TableData>;
  }
}
