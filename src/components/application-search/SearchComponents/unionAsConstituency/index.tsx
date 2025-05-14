import { useEffect, useState } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useUnion } from './hooks/useUnion';
import { getUnionOrWardsForChairman } from '@helpers/get-union-or-wards-for-chairman';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  queryWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  watch: any;
  setValue: any;
  getElectionSettingsIdForAdmin?: boolean;
}

export const UnionAsConstituency = ({
  struct,
  pathWatchList,
  queryWatchList,
  resetData,
  emptyBelowData,
  callApi,
  watch,
  setValue,
  getElectionSettingsIdForAdmin,
}: Props) => {
  const { getUnion, union } = useUnion();
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] =
    useState<any>([]);

  const {
    isAdmin,
    unionOrWards: unionOrWardsRedux,
    electionSettings,
  } = useFiltersRedux();
  const unionWardWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi &&
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      isAdmin
    )
      getUnion({ params: pathWatchList, filter: queryWatchList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi, JSON.stringify(queryWatchList)]);

  useEffect(() => {
    if (!isAdmin && electionSettings?.length && callApi) {
      setElectionSettingsFromRedux(
        getUnionOrWardsForChairman({
          electionSettings,
          candidateType: Number(candidateTypeWatch),
          getUnionOrWardIdAsValue: true,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, unionOrWardsRedux, candidateTypeWatch, callApi]);

  useEffect(() => {
    if (!isAdmin && callApi) {
      if (unionWardWatch) {
        const findElectionSettingsId = electionSettingsFromRedux?.find(
          (item: any) => item.value === unionWardWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWardWatch, isAdmin, callApi, candidateTypeWatch]);

  useEffect(() => {
    if (getElectionSettingsIdForAdmin) {
      if (unionWardWatch) {
        const findElectionSettingsId = union?.find(
          (item) => item.value === unionWardWatch,
        )?.extra?.electionSettingsId;

        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_ID,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getElectionSettingsIdForAdmin, unionWardWatch]);

  useEffect(() => {
    if (!isAdmin && !unionWardWatch) {
      setValue(APPLICATION_SEARCH.ELECTION_SETTINGS_ID, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateTypeWatch, unionWardWatch]);

  return (
    <div>
      <Select
        title="SEARCH.UNION"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? union : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.unionAsConstituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionAsConstituencyOptions}
      />
    </div>
  );
};
