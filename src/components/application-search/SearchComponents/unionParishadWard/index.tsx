import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useUnionWard } from './hooks/useUnionWard';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useFormContext } from 'react-hook-form';

interface Props {
  struct: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
}

export const UnionParishadWard = ({
  struct,
  pathWatchList,
  resetData,
  emptyBelowData,
  callApi,
}: Props) => {
  const { watch, setValue } = useFormContext();
  const { getUnionWard, unionWard } = useUnionWard();
  const { isAdmin } = useFiltersRedux();
  const unionWardWatch = watch(APPLICATION_SEARCH.UNION_WARD);

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi
    )
      getUnionWard({ params: pathWatchList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi]);

  useEffect(() => {
    if (!isAdmin) {
      if (unionWardWatch) {
        const findElectionSettingsId = unionWard?.find(
          (item: any) => item.value === unionWardWatch,
        )?.extra?.electionSettingsId;
        if (findElectionSettingsId)
          setValue(
            APPLICATION_SEARCH.ELECTION_SETTINGS_IDS,
            findElectionSettingsId,
          );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionWardWatch, isAdmin, callApi]);

  return (
    <div>
      <Select
        title="SEARCH.UNION_PARISHAD_WARD"
        name={APPLICATION_SEARCH.UNION_WARD}
        options={unionWard}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.unionParishadWard}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.unionParishadWardOptions}
      />
    </div>
  );
};
