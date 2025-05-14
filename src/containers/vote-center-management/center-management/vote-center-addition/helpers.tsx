import { ELECTION_INFO } from '@constants/election-info';
import {
  searchStructSettings,
  searchStructSettingsCityCorporationOp,
  searchStructSettingsUpazilaElectionOfficer,
} from './components/searchConstantsSettings';
import {
  searchStructVoteCenterAddition,
  searchStructVoteCenterAdditionOP,
  searchStructVoteCenterAdditionUpazilaElectionOfficer,
} from './new-vote-center/searchConstantVoteCenterAddition';

export const switchDynamicParamsInRoute = ({
  electionTypeId,
  navigateObj,
  queryParams,
  navigate,
  createSearchParams,
}: {
  electionTypeId: number;
  navigateObj: { pathname: string };
  queryParams: {
    constituencyId: any;
    municipalityId?: any;
    upazilaId?: any;
  };
  navigate: any;
  createSearchParams: any;
}) => {
  switch (electionTypeId) {
    case ELECTION_INFO.NATIONAL.ID:
      navigate({
        ...navigateObj,
        search: `?${createSearchParams({
          constituencyId: queryParams.constituencyId,
        })}`,
      });
      break;

    case ELECTION_INFO.CITY_CORPORATION.ID:
      navigate({
        ...navigateObj,
        search: `?${createSearchParams({
          municipalityId: queryParams.municipalityId,
        })}`,
      });
      break;
    case ELECTION_INFO.MUNICIPALITY.ID:
      navigate({
        ...navigateObj,
        search: `?${createSearchParams({
          municipalityId: queryParams.municipalityId,
        })}`,
      });
      break;

    case ELECTION_INFO.UPAZILLA.ID:
      navigate({
        ...navigateObj,
        search: `?${createSearchParams({
          upazilaId: queryParams.upazilaId,
        })}`,
      });
      break;
    case ELECTION_INFO.UNION_PARISHAD.ID:
      navigate({
        ...navigateObj,
        search: `?${createSearchParams({
          upazilaId: queryParams.upazilaId,
        })}`,
      });
      break;
    default:
      break;
  }
};

export function electionUserSearchForVoteCenter(data?: number | string) {
  switch (data) {
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return searchStructSettingsCityCorporationOp;
    case ELECTION_INFO.MUNICIPALITY.ID:
      return searchStructSettingsCityCorporationOp;
    case ELECTION_INFO.UPAZILLA.ID:
      return searchStructSettingsUpazilaElectionOfficer;
    default:
      return searchStructSettings;
  }
}

export function electionUserSearchForVoteCenterAddition(
  data?: number | string,
) {
  switch (data) {
    case ELECTION_INFO.CITY_CORPORATION.ID:
      return searchStructVoteCenterAdditionOP;
    case ELECTION_INFO.MUNICIPALITY.ID:
      return searchStructVoteCenterAdditionOP;
    case ELECTION_INFO.UPAZILLA.ID:
      return searchStructVoteCenterAdditionUpazilaElectionOfficer;

    default:
      return searchStructVoteCenterAddition;
  }
}

// export const switchDynamicParamsInRoute = ({
//   candidateTypeId,
//   navigateObj,
//   queryParams,
//   navigate,
//   createSearchParams,
// }: {
//   candidateTypeId: number;
//   navigateObj: { pathname: string };
//   queryParams: {
//     constituencyId: any;
//     municipalityId?: any;
//   };
//   navigate: any;
//   createSearchParams: any;
// }) => {
//   switch (candidateTypeId) {
//     case CANDIDATE_INFO.NATIONAL_MEMBER_OF_PARLIAMENT.ID:
//       navigate({
//         ...navigateObj,
//         search: `?${createSearchParams({
//           constituencyId: queryParams.constituencyId,
//         })}`,
//       });
//       break;

//     case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
//       navigate({
//         ...navigateObj,
//         search: `?${createSearchParams({
//           municipalityId: queryParams.municipalityId,
//         })}`,
//       });
//       break;

//     case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
//       navigate({
//         ...navigateObj,
//         search: `?${createSearchParams({
//           municipalityId: queryParams.municipalityId,
//         })}`,
//       });
//       break;

//     case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
//       navigate({
//         ...navigateObj,
//         search: `?${createSearchParams({
//           municipalityId: queryParams.municipalityId,
//         })}`,
//       });
//       break;

//     default:
//       break;
//   }
// };
