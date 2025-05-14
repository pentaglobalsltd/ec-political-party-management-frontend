import { useCallback } from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';

interface Props {
  setSearchParams: (data: URLSearchParamsInit) => void;
  searchStructElectionUser: any;
  searchStructAdmin: any;
  allSelectedDataForSearch: any;
  onSubmitSearch: (data: any) => void;
  conditionalRequiredField: any;
}
export const ResultAndSituationAnalysisSearch = ({
  setSearchParams,
  allSelectedDataForSearch,
  searchStructAdmin,
  searchStructElectionUser,
  onSubmitSearch,
  conditionalRequiredField,
}: Props) => {
  const {
    isAdmin,
    electionTypes,
    electionSchedules,
    candidateTypes,
    zillas,
    constituencies,
  } = useFiltersRedux();

  const electionUserNationalType =
    electionTypes?.[0]?.value === ELECTION_INFO.NATIONAL.ID;

  const electionUserSearchCallback = useCallback(() => {
    if (!electionTypes?.length) {
      return;
    }

    const filterObject = {
      searchItems: {
        electionTypeId: electionTypes?.[0]?.value,
        electionScheduleId: electionSchedules?.[0]?.value,
        candidateTypeId: candidateTypes?.[0]?.value,
        zillaId: zillas?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
      },
    };

    setSearchParams(filterObject.searchItems as URLSearchParamsInit);
    onSubmitSearch(filterObject.searchItems as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderElectionUserSearch = electionUserNationalType ? (
    <BadgeElectionUserSearch
      labels={{
        electionTypes: electionTypes?.[0]?.label,
        electionSchedules: electionSchedules?.[0]?.label,
        candidateTypes: candidateTypes?.[0]?.label,
        zillas: zillas?.[0]?.label,
        constituencies: constituencies?.[0]?.label,
      }}
      callback={electionUserSearchCallback}
    />
  ) : (
    <SearchComponents
      struct={searchStructElectionUser}
      onSubmitHandler={onSubmitSearch}
      conditionalRequiredField={conditionalRequiredField}
      allSelectedData={allSelectedDataForSearch}
    />
  );
  return (
    <>
      {isAdmin ? (
        <SearchComponents
          struct={searchStructAdmin}
          onSubmitHandler={onSubmitSearch}
          getElectionSettingsIdForAdmin={true}
          conditionalRequiredField={conditionalRequiredField}
        />
      ) : (
        renderElectionUserSearch
      )}
    </>
  );
};
