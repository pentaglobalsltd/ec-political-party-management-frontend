import { ELECTION_INFO } from '@constants/election-info';

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
    unionWardId?: number;
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
          unionWardId: queryParams?.unionWardId,
        })}`,
      });
      break;

    default:
      break;
  }
};
