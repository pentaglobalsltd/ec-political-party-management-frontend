import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';
import { TableData } from '@pentabd/ui';

enum COLUMN_KEY {
  CONSTITUENCY = 'constituency',
  ELECTION_MUNICIPALITY = 'electionMunicipality',
}

export function dynamicColumnForElectionConstituency({
  params,
  t,
  isAdmin,
}: any) {
  // election wise switch case
  switch (Number(params?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin
        ? [
            {
              id: 20,
              name: t('CANDIDATE_APPLIED_ONLINE.CONSTITUENCY_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ]
        : [];
    case ELECTION_INFO.CITY_CORPORATION.ID:
      // candidate type wise switch case
      switch (Number(params?.candidateTypeId)) {
        case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
          return [
            {
              id: 23,
              name: t('CANDIDATE_APPLIED_ONLINE.CITY_CORPORATION_NAME'),
              key: COLUMN_KEY.ELECTION_MUNICIPALITY,
            },
            {
              id: 24,
              name: t('CANDIDATE_APPLIED_ONLINE.WARD_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
        case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
          return [
            {
              id: 23,
              name: t('CANDIDATE_APPLIED_ONLINE.CITY_CORPORATION_NAME'),
              key: COLUMN_KEY.ELECTION_MUNICIPALITY,
            },
            {
              id: 24,
              name: t('CANDIDATE_APPLIED_ONLINE.WARD_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
        default:
          return [
            {
              id: 21,
              name: t('CANDIDATE_APPLIED_ONLINE.CITY_CORPORATION_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
      }
    case ELECTION_INFO.UPAZILLA.ID:
      return [
        {
          id: 26,
          name: t('CANDIDATE_APPLIED_ONLINE.UPAZILLA_NAME'),
          key: COLUMN_KEY.CONSTITUENCY,
        },
      ];
    case ELECTION_INFO.MUNICIPALITY.ID:
      // candidate type wise switch case
      switch (Number(params?.candidateTypeId)) {
        case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
          return [
            {
              id: 23,
              name: t('CANDIDATE_APPLIED_ONLINE.MUNICIPALITY_NAME'),
              key: COLUMN_KEY.ELECTION_MUNICIPALITY,
            },
            {
              id: 24,
              name: t('CANDIDATE_APPLIED_ONLINE.WARD_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
        case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
          return [
            {
              id: 23,
              name: t('CANDIDATE_APPLIED_ONLINE.MUNICIPALITY_NAME'),
              key: COLUMN_KEY.ELECTION_MUNICIPALITY,
            },
            {
              id: 24,
              name: t('CANDIDATE_APPLIED_ONLINE.WARD_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
        default:
          return [
            {
              id: 21,
              name: t('CANDIDATE_APPLIED_ONLINE.MUNICIPALITY_NAME'),
              key: COLUMN_KEY.CONSTITUENCY,
            },
          ];
      }
    default:
      return [
        {
          id: 25,
          name: t('CANDIDATE_APPLIED_ONLINE.CONSTITUENCY_NAME'),
          key: COLUMN_KEY.CONSTITUENCY,
        },
      ];
  }
}

export function dynamicSecondaryRowElection({ item, isAdmin }: any) {
  // election wise switch case
  switch (Number(item?.electionTypeId)) {
    case ELECTION_INFO.NATIONAL.ID:
      return isAdmin ? (
        <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>
      ) : (
        <></>
      );
    case ELECTION_INFO.CITY_CORPORATION.ID:
      // candidate type wise switch case
      switch (Number(item?.candidateTypeId)) {
        case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
          return <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>;
        default:
          return (
            <>
              <TableData>{item?.[COLUMN_KEY.ELECTION_MUNICIPALITY]}</TableData>
              <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>
            </>
          );
      }
    case ELECTION_INFO.UPAZILLA.ID:
      return <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>;
    case ELECTION_INFO.MUNICIPALITY.ID:
      // candidate type wise switch case
      switch (Number(item?.candidateTypeId)) {
        case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
          return <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>;
        default:
          return (
            <>
              <TableData>{item?.[COLUMN_KEY.ELECTION_MUNICIPALITY]}</TableData>
              <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>
            </>
          );
      }
    default:
      return <TableData>{item?.[COLUMN_KEY.CONSTITUENCY]}</TableData>;
  }
}
