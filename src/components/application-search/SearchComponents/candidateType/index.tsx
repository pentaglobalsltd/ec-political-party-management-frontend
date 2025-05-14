import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import useCandidateTypes from './hooks/useCandidateType';
import { StructTypes } from '../types';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

interface Props {
  struct?: StructTypes;
  watchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  setValue?: any;
  nonVisibleCandidateType?: number[];
}

export const CandidateTypeSearch = ({
  struct,
  watchList,
  resetData,
  emptyBelowData,
  setValue,
  nonVisibleCandidateType,
}: Props) => {
  const { watch } = useFormContext();

  const { electionCandidateTypes, getElectionCandidateTypesData } =
    useCandidateTypes();

  const { isAdmin, candidateTypes: candidateTypesRedux } = useFiltersRedux();
  const isReduxArrayLengthOne = candidateTypesRedux?.length === 1;

  useEffect(() => {
    if (
      watchList &&
      Object.keys(watchList).reduce(
        (prev: any, curr: any) => prev && watchList[curr],
        true,
      ) &&
      isAdmin
    )
      getElectionCandidateTypesData(watchList, nonVisibleCandidateType);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchList)]);

  useEffect(() => {
    if (struct?.dependentDefaultValue) {
      for (const item of struct?.dependentDefaultValue) {
        const data: any = watch(item.dependentOn);

        if (data === item.dependentOnValue) {
          setValue(APPLICATION_SEARCH.CANDIDATE_TYPE, item.ownDefaultValue);
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watch())]);

  useEffect(() => {
    if (!isAdmin && candidateTypesRedux?.length === 1) {
      setValue(
        APPLICATION_SEARCH.CANDIDATE_TYPE,
        candidateTypesRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, candidateTypesRedux]);

  return (
    <div>
      <Select
        title={'SEARCH.CANDIDATE_TYPE'}
        titleElement={struct?.titleElement}
        name={APPLICATION_SEARCH.CANDIDATE_TYPE}
        options={(isAdmin ? electionCandidateTypes : candidateTypesRedux) || []}
        disabled={!isAdmin && isReduxArrayLengthOne}
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
