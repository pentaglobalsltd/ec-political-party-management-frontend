import { useEffect } from 'react';
import Select from '@components/inputs/Select';

import useGetElectionSettingsAggregatedForSearchFilter from './hooks/useElectionSettingsAggregatedForSearchFilter';
import { INT_MAX_VAL } from '@constants/table-download-btns';
import { CANDIDATE_INFO } from '@constants/candidate-info';
import { ELECTION_INFO } from '@constants/election-info';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { APPLICATION_SEARCH } from '../..';
import { RMO } from '@components/application-search/constants';

interface Props {
  struct?: any;
  queryWatchList?: {
    [key: string]: string | number;
  };
  resetData?: any;
  emptyBelowData?: (data: any) => void;
  watch?: any;
  setValue?: any;
  callApi?: boolean;
}

export const ElectionSettingsForVoteCenter = ({
  struct,
  queryWatchList,
  resetData,
  emptyBelowData,
  watch,
  setValue,
  callApi,
}: Props) => {
  const {
    electionSettingsListForSearchOptions,
    getElectionSettingsDataForSearchOptions,
  } = useGetElectionSettingsAggregatedForSearchFilter();
  const electionSettingsWatch = watch(APPLICATION_SEARCH.ELECTION_SETTINGS_IDS);
  const candidateTypeWatch = watch(APPLICATION_SEARCH.CANDIDATE_TYPE);
  const electionTypeWatch = watch(APPLICATION_SEARCH.ELECTION_TYPE);

  const {
    isAdmin,
    electionSettings: electionSettingsRedux,
    zillas: zillasRedux,
    municipalities: municipalitiesRedux,
    upazilas: upazillaRedux,
  } = useFiltersRedux();
  const isReduxArrayLengthOne = electionSettingsRedux?.length === 1;
  const shouldSetDefaultValue = !isAdmin && isReduxArrayLengthOne;

  const filterElectionSettingsByCandidateType = () => {
    const result = electionSettingsRedux?.filter(
      (item) => item?.extra?.candidateTypeId === candidateTypeWatch,
    );

    return result;
  };

  useEffect(() => {
    if (
      isAdmin &&
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      callApi
    )
      getElectionSettingsDataForSearchOptions({
        params: queryWatchList,
        size: INT_MAX_VAL,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    if (isAdmin && callApi) {
      const selectedElectionSettings =
        electionSettingsListForSearchOptions.find(
          (item) => item.value === electionSettingsWatch,
        );

      const zillaName: string = selectedElectionSettings?.label
        ?.split('->')[1]
        ?.trim();
      const settingsName: string = selectedElectionSettings?.label
        ?.split('->')[2]
        ?.trim();
      const settingsUnionName: string = selectedElectionSettings?.label // TODO
        ?.split('->')[3]
        ?.trim();

      if (zillaName) {
        setValue(APPLICATION_SEARCH.DISTRICT_BY_ELECTION_SETTINGS, zillaName);
      }

      if (
        settingsName &&
        (electionTypeWatch === ELECTION_INFO.CITY_CORPORATION.ID ||
          electionTypeWatch === ELECTION_INFO.MUNICIPALITY.ID)
      ) {
        setValue(
          APPLICATION_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS,
          settingsName,
        );
      }
      if (settingsName && electionTypeWatch === ELECTION_INFO.NATIONAL.ID) {
        setValue(
          APPLICATION_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS,
          settingsName,
        );
        setValue(
          APPLICATION_SEARCH.CONSTITUENCY,
          selectedElectionSettings?.extra?.constituencyId,
        );
      } else {
        setValue(APPLICATION_SEARCH.CONSTITUENCY, undefined);
      }
      if (
        Number(candidateTypeWatch) ===
          CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID ||
        Number(candidateTypeWatch) === CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID
      ) {
        setValue(
          APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
          selectedElectionSettings?.extra?.municipalityId,
        );
      }
      if (
        Number(candidateTypeWatch) ===
          CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID ||
        Number(candidateTypeWatch) === CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID
      ) {
        setValue(
          APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
          selectedElectionSettings?.extra?.municipalityWardId,
        );
      }
      if (
        Number(candidateTypeWatch) ===
          CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID ||
        Number(candidateTypeWatch) ===
          CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID
      ) {
        setValue(
          APPLICATION_SEARCH.MUNICIPALITY,
          selectedElectionSettings?.extra?.municipalityId,
        );
        setValue(
          APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
          selectedElectionSettings?.extra?.reservedWardId,
        );
      } else {
        setValue(APPLICATION_SEARCH.MUNICIPALITY, undefined);
      }
      if (Number(electionTypeWatch) === ELECTION_INFO.NATIONAL.ID) {
        setValue(
          APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
          selectedElectionSettings?.extra?.constituencyId,
        );
      }
      if (
        Number(electionTypeWatch) === ELECTION_INFO.UPAZILLA.ID &&
        electionSettingsWatch
      ) {
        setValue(APPLICATION_SEARCH.UPAZILA_BY_ELECTION_SETTINGS, settingsName);
        setValue(
          APPLICATION_SEARCH.SUB_DISTRICT,
          selectedElectionSettings?.extra?.upazilaId,
        );
      } else {
        setValue(APPLICATION_SEARCH.SUB_DISTRICT, undefined);
      }
      if (
        Number(electionTypeWatch) === ELECTION_INFO.UNION_PARISHAD.ID &&
        electionSettingsWatch
      ) {
        setValue(APPLICATION_SEARCH.UPAZILA_BY_ELECTION_SETTINGS, settingsName);
        setValue(
          APPLICATION_SEARCH.SUB_DISTRICT,
          selectedElectionSettings?.extra?.upazilaId,
        );
        setValue(APPLICATION_SEARCH.RMO, RMO.RURAL);
        setValue(
          APPLICATION_SEARCH.UNION_OR_WARD,
          selectedElectionSettings?.extra?.unionOrWardId,
        );
        setValue(
          APPLICATION_SEARCH.UNION_BY_ELECTION_SETTINGS,
          selectedElectionSettings?.label?.split('->')[3]?.trim(),
        );
      } else {
        setValue(APPLICATION_SEARCH.RMO, undefined);
        setValue(APPLICATION_SEARCH.UNION_OR_WARD, undefined);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsWatch]);

  useEffect(() => {
    if (!isAdmin && electionSettingsWatch) {
      // OP for national

      if (electionTypeWatch === ELECTION_INFO.NATIONAL.ID) {
        setValue(
          APPLICATION_SEARCH.ELECTION_SETTINGS_DEPENDENCY,
          electionSettingsRedux?.[0]?.extra?.constituencyId,
        );

        setValue(
          APPLICATION_SEARCH.ELECTION_CONSTITUENCY_BY_ELECTION_SETTINGS,
          electionSettingsRedux?.[0]?.label,
        );
      }

      if (zillasRedux?.length) {
        setValue(
          APPLICATION_SEARCH.DISTRICT_BY_ELECTION_SETTINGS,
          zillasRedux?.[0]?.label,
        );
        setValue(APPLICATION_SEARCH.DISTRICT, zillasRedux?.[0]?.value);
      }

      if (municipalitiesRedux?.length) {
        setValue(
          APPLICATION_SEARCH.MUNICIPALITY_BY_ELECTION_SETTINGS,
          municipalitiesRedux?.[0]?.label,
        );
      }

      if (upazillaRedux?.length) {
        setValue(
          APPLICATION_SEARCH.UPAZILA_BY_ELECTION_SETTINGS,
          upazillaRedux?.[0]?.label,
        );
      }
      if (electionTypeWatch === ELECTION_INFO.UNION_PARISHAD.ID) {
        setValue(APPLICATION_SEARCH.DISTRICT, zillasRedux?.[0]?.value);
        setValue(APPLICATION_SEARCH.SUB_DISTRICT, upazillaRedux?.[0]?.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionSettingsWatch, isAdmin, shouldSetDefaultValue]);

  useEffect(() => {
    if (shouldSetDefaultValue) {
      setValue(
        APPLICATION_SEARCH.ELECTION_SETTINGS_IDS,
        electionSettingsRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, electionSettingsRedux]);

  return (
    <div>
      <Select
        title="VOTE_CENTER_ADDITION.ELECTION_SETTINGS"
        name={APPLICATION_SEARCH.ELECTION_SETTINGS_IDS}
        options={
          (isAdmin
            ? electionSettingsListForSearchOptions
            : filterElectionSettingsByCandidateType()) || []
        }
        disabled={isReduxArrayLengthOne}
        defaultValue={
          shouldSetDefaultValue ? electionSettingsRedux?.[0]?.value : ''
        }
        isSearchable
        clearValue={resetData?.electionSettingsVoteCenter}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.electionSettingsVoteCenterOptions}
      />
    </div>
  );
};
