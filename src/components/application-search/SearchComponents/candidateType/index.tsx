import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import Select from '@components/inputs/Select';
import { IconChevronDown } from '@pentabd/icons';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { StructTypes } from '../types';
import useCandidateTypes from './hooks/useCandidateType';

interface Props {
  struct?: StructTypes;
  watchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  setValue?: any;
}

export const CandidateTypeSearch = ({
  struct,
  watchList,
  resetData,
  emptyBelowData,
  setValue,
}: Props) => {
  const { watch } = useFormContext();

  const { electionCandidateTypes, getElectionCandidateTypesData } =
    useCandidateTypes();

  useEffect(() => {
    if (
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      )
    )
      getElectionCandidateTypesData(watchList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList)]);

  useEffect(() => {
    if (struct?.dependentDefaultValue) {
      for (const item of struct?.dependentDefaultValue ?? []) {
        const data: any = watch(item.dependentOn);

        if (data === item.dependentOnValue) {
          setValue(APPLICATION_SEARCH.CANDIDATE_TYPE, item.ownDefaultValue);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watch())]);

  return (
    <div>
      <Select
        title={'SEARCH.CANDIDATE_TYPE'}
        titleElement={struct?.titleElement}
        name={APPLICATION_SEARCH.CANDIDATE_TYPE}
        options={electionCandidateTypes}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.candidateType}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.electionScheduleOptions}
      />
    </div>
  );
};
