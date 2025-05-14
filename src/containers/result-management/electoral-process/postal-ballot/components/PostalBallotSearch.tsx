import { useCallback } from 'react';
import { SearchComponents } from '@components/application-search/SearchComponents';
import { BadgeElectionUserSearch } from '@components/badge-election-user-search';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { SEARCH_FIELD_REQUIRED } from '@constants/search-field-required';

interface Props {
  searchStructElectionUser: any;
  searchStructAdmin: any;
  allSelectedDataForSearch: any;
  onSubmitSearch: (data: any) => void;
  allSelectedDataElectionUser?: any;
}
export const PostalBallotSearch = ({
  allSelectedDataElectionUser,
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
      totalCol="grid-cols-lg-6"
      colSpan="col-span-2"
      struct={searchStructElectionUser}
      allSelectedData={allSelectedDataElectionUser}
      requiredField={[SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID]}
      onSubmitHandler={onSubmitSearch}
    />
  );
  return (
    <>
      {isAdmin ? (
        <SearchComponents
          totalCol="grid-cols-lg-6"
          colSpan="col-span-2"
          struct={searchStructAdmin}
          allSelectedData={allSelectedDataForSearch}
          requiredField={[SEARCH_FIELD_REQUIRED.ELECTION_SETTINGS_ID]}
          onSubmitHandler={onSubmitSearch}
          getElectionSettingsIdForAdmin={true}
        />
      ) : (
        renderElectionUserSearch
      )}
    </>
  );
};
