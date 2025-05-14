import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';

import Input from '@components/inputs/Input';
import { useEffect } from 'react';
import { useCoreUnionOrWardsSearch } from './hooks/useCoreUnionOrWardsSearch';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useFormContext } from 'react-hook-form';

interface Props {
  resetData: any;
  pathWatchList?: {
    [key: string]: string | number;
  };
  queryWatchList?: {
    [key: string]: string | number;
  };
  callApi?: boolean;
}

export const UnionNameWithElectionSettingsSearch = ({
  resetData,
  pathWatchList,
  queryWatchList,
  callApi,
}: Props) => {
  const { setValue } = useFormContext();
  const { isAdmin } = useFiltersRedux();

  const { getCoreUnionOrWardsData, coreUnionOrWards } =
    useCoreUnionOrWardsSearch();

  useEffect(() => {
    if (
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      callApi &&
      !isAdmin
    ) {
      getCoreUnionOrWardsData({
        params: pathWatchList,
        query: queryWatchList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), callApi, JSON.stringify(queryWatchList)]);

  useEffect(() => {
    if (!isAdmin) {
      if (coreUnionOrWards?.length > 0) {
        setValue(
          APPLICATION_SEARCH.UNION_BY_ELECTION_SETTINGS,
          coreUnionOrWards?.[0]?.label,
        );
        setValue(
          APPLICATION_SEARCH.UNION_OR_WARD,
          coreUnionOrWards?.[0]?.value,
        );
      }
    }
  }, [coreUnionOrWards]);

  return (
    <div>
      <Input
        title="SEARCH.UNION"
        registerName={APPLICATION_SEARCH.UNION_BY_ELECTION_SETTINGS}
        readOnly={true}
        clearValue={resetData?.electionSettingsVoteCenter}
      />
    </div>
  );
};
