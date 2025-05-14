import { useCallback } from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { NominationListProps } from '@hooks/candidate-info-management/nomination-list/useNominationList';

interface Props {
  setSearchParams: (data: URLSearchParamsInit) => void;
  searchStructElectionUser: any;
  searchStructAdmin: any;
  allSelectedData: any;
  nominationStatusCodes: string;
  onSubmitSearch: (data: NominationListProps) => void;
  stepId?: string;
  callback: (data: NominationListProps) => void;
  isSelfNomination?: boolean;
}
export const SelfNominationOnlineSearch = ({
  setSearchParams,
  allSelectedData,
  searchStructAdmin,
  searchStructElectionUser,
  nominationStatusCodes,
  onSubmitSearch,
  stepId,
  callback,
  isSelfNomination,
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
    if (!nominationStatusCodes || !electionTypes?.length) return;

    const filterObject = {
      searchItems: {
        electionTypeId: electionTypes?.[0]?.value,
        electionScheduleId: electionSchedules?.[0]?.value,
        candidateTypeId: candidateTypes?.[0]?.value,
        zillaId: zillas?.[0]?.value,
        constituencyId: constituencies?.[0]?.value,
        electionSettingsId: constituencies?.[0]?.extra?.electionSettingsId,
        nominationStatusCodes,
        isSelfNomination,
      },
    };

    setSearchParams({
      ...filterObject.searchItems,
      isSelfNomination: String(filterObject.searchItems.isSelfNomination),
    } as URLSearchParamsInit);
    callback(filterObject as NominationListProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nominationStatusCodes]);

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
      requiredField={[
        SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
        SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
        SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID,
      ]}
      allSelectedData={allSelectedData}
      nominationStatusCodes={nominationStatusCodes}
    />
  );

  return (
    <>
      {isAdmin ? (
        <SearchComponents
          struct={searchStructAdmin}
          onSubmitHandler={onSubmitSearch}
          requiredField={[
            SEARCH_FIELD_REQUIRED.ELECTION_TYPE,
            SEARCH_FIELD_REQUIRED.ELECTION_SCHEDULE,
            SEARCH_FIELD_REQUIRED.CANDIDATE_TYPE,
          ]}
          allSelectedData={allSelectedData}
          submitButtonDisabled={!stepId}
          nominationStatusCodes={nominationStatusCodes}
        />
      ) : (
        renderElectionUserSearch
      )}
    </>
  );
};
