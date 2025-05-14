import { useEffect, useState } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useUnion } from './hooks/useUnion';
import { getWardsForMembers } from '@helpers/get-wards-for-members';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  watch: any;
  setValue: any;
  getElectionSettingsIdForAdmin?: boolean;
}

export const UnionParishadWardAsConstituency = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
  watch,
  setValue,
  getElectionSettingsIdForAdmin,
}: Props) => {
  const { getUnion, union } = useUnion();

  const { isAdmin, electionSettings } = useFiltersRedux();
  const unionWardWatch = watch(APPLICATION_SEARCH.CONSTITUENCY);
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);
  const unionOrWardWatch = watch(APPLICATION_SEARCH.UNION_OR_WARD);

  const [electionSettingsFromRedux, setElectionSettingsFromRedux] =
    useState<any>([]);

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi &&
      isAdmin
    )
      getUnion({ params: pathWatchList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin) {
      if (unionOrWardWatch) {
        setElectionSettingsFromRedux(
          getWardsForMembers({
            electionSettings,
            candidateType: Number(candidateTypeWatch),
            unionOrWardId: Number(unionOrWardWatch),
            getConstituencyIdAsValue: true,
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, candidateTypeWatch, unionOrWardWatch]);

  useEffect(() => {
    if (!isAdmin) {
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
        title="SEARCH.UNION_PARISHAD_WARD"
        name={APPLICATION_SEARCH.CONSTITUENCY}
        options={isAdmin ? union : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.unionParishadWardAsConstituency}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionParishadWardAsConstituencyOptions}
      />
    </div>
  );
};
