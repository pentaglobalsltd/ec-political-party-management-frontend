import { useCallback } from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { MessageSendStatusSearch } from '@components/badge-election-user-search/forms/result-management/MessageSendStatus';

interface Props {
  setSearchParams: (data: URLSearchParamsInit) => void;
  searchStructElectionUser: any;
  searchStructAdmin: any;
  allSelectedDataForSearch: any;
  onSubmitSearch: (data: any) => void;
}
export const MessageSendListSearch = ({
  setSearchParams,
  allSelectedDataForSearch,
  searchStructAdmin,
  searchStructElectionUser,
  onSubmitSearch,
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
        messageSendStatus: data?.messageSendStatus,
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
      children={
        <MessageSendStatusSearch callback={electionUserSearchCallback} />
      }
    />
  ) : (
    <SearchComponents
      struct={searchStructElectionUser}
      onSubmitHandler={onSubmitSearch}
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
      ]}
      allSelectedData={allSelectedDataForSearch}
    />
  );
  return (
    <>
      {isAdmin ? (
        <SearchComponents
          struct={searchStructAdmin}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
          ]}
          onSubmitHandler={onSubmitSearch}
          getElectionSettingsIdForAdmin={true}
          allSelectedData={allSelectedDataForSearch}
        ></SearchComponents>
      ) : (
        renderElectionUserSearch
      )}
    </>
  );
};
