import { useCallback } from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { ResultStatusSearch } from '@components/badge-election-user-search/forms/result-management/ResultStatus';

interface Props {
  setSearchParams: (data: URLSearchParamsInit) => void;
  searchStructElectionUser: any;
  searchStructAdmin: any;
  allSelectedDataForSearch: any;
  onSubmitSearch: (data: any) => void;
  allSelectedDataElectionUser: any;
}
export const CenterBasedMonitoringResultSearch = ({
  setSearchParams,
  allSelectedDataForSearch,
  searchStructAdmin,
  searchStructElectionUser,
  onSubmitSearch,
  allSelectedDataElectionUser,
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

  const electionUserSearchCallback = useCallback((data: any) => {
    if (!electionTypes?.length) {
      return;
    }

    const filterObject = {
      searchItems: {
        electionScheduleId: electionSchedules?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
        status: data?.status,
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
      children={<ResultStatusSearch callback={electionUserSearchCallback} />}
    />
  ) : (
    <SearchComponents
      struct={searchStructElectionUser}
      onSubmitHandler={onSubmitSearch}
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
        SEARCH_FIELD_REQUIRED.STATUS,
      ]}
      allSelectedData={allSelectedDataElectionUser}
    />
  );
  return (
    <>
      {isAdmin ? (
        <SearchComponents
          struct={searchStructAdmin}
          onSubmitHandler={onSubmitSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
            SEARCH_FIELD_REQUIRED.STATUS,
          ]}
          allSelectedData={allSelectedDataForSearch}
          getElectionSettingsIdForAdmin={true}
        ></SearchComponents>
      ) : (
        renderElectionUserSearch
      )}
    </>
  );
};
