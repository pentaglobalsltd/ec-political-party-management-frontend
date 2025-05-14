import { useEffect, useState } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useCoreUnionOrWardsSearch } from './hooks/useCoreUnionOrWardsSearch';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { getUnionOrWardsForMembers } from '@helpers/get-union-or-wards-for-members';

interface Props {
  struct: any;
  pathWatchList?: any;
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  watch: any;
}

export const UnionSearch = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
  watch,
}: Props) => {
  const [electionSettingsFromRedux, setElectionSettingsFromRedux] =
    useState<any>([]);
  const { getCoreUnionOrWardsData, coreUnionOrWards } =
    useCoreUnionOrWardsSearch();

  const {
    isAdmin,
    unionOrWards: unionOrWardsReduxFromRedux,
    electionSettings,
  } = useFiltersRedux();
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi &&
      isAdmin
    ) {
      getCoreUnionOrWardsData({
        params: pathWatchList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin && electionSettings?.length && callApi) {
      if (APPLICATION_SEARCH.CANDIDATE_TYPE in watch()) {
        setElectionSettingsFromRedux(
          getUnionOrWardsForMembers({
            electionSettings,
            candidateType: Number(candidateTypeWatch),
            unionOrWardsRedux: unionOrWardsReduxFromRedux,
          }),
        );
      } else {
        setElectionSettingsFromRedux(unionOrWardsReduxFromRedux);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, unionOrWardsReduxFromRedux, candidateTypeWatch, callApi]);

  return (
    <div>
      <Select
        title="SEARCH.UNION"
        name={APPLICATION_SEARCH.UNION_OR_WARD}
        options={isAdmin ? coreUnionOrWards : electionSettingsFromRedux}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.union}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionOptions}
      />
    </div>
  );
};
