import { useEffect } from 'react';
import { APPLICATION_SEARCH } from '@components/application-search/SearchComponents';
import { IconChevronDown } from '@pentabd/icons';
import Select from '@components/inputs/Select';
import { useCoreMunicipalities } from './hooks/useCoreMunicipalities';
import useFiltersRedux from '@hooks/miscellaneous/custom-hook/useFiltersRedux';
import { useMasterMunicipalities } from './hooks/useMasterMunicipalities';
import { API_SERVICE } from '@components/application-search/constants';
import { StructTypes } from '../types';

interface Props {
  struct: StructTypes;
  pathWatchList?: {
    [key: string]: string | number;
  };
  queryWatchList?: {
    [key: string]: string | number;
  };
  resetData: any;
  emptyBelowData?: (data: any) => void;
  callApi?: boolean;
  setValue?: any;
}

export const MunicipalitySearch = ({
  struct,
  pathWatchList,
  queryWatchList,
  resetData,
  emptyBelowData,
  callApi,
  setValue,
}: Props) => {
  const { coreMunicipalities, getCoreMunicipalities } = useCoreMunicipalities();
  const { masterMunicipalities, getMasterMunicipalities } =
    useMasterMunicipalities();
  const { isAdmin, municipalities: municipalitiesFromRedux } =
    useFiltersRedux();

  useEffect(() => {
    if (
      (isAdmin || struct?.electionUserDataUsingApi) &&
      queryWatchList &&
      Object.keys(queryWatchList).reduce(
        (prev: any, curr: any) => prev && queryWatchList[curr],
        true,
      ) &&
      pathWatchList &&
      Object.keys(pathWatchList).reduce(
        (prev: any, curr: any) => prev && pathWatchList[curr],
        true,
      ) &&
      callApi
    ) {
      if (struct?.apiService === API_SERVICE.MASTER) {
        getMasterMunicipalities({
          params: pathWatchList,
          filter: queryWatchList,
        });
      } else {
        getCoreMunicipalities({
          params: pathWatchList,
          filter: queryWatchList,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(pathWatchList), JSON.stringify(queryWatchList), callApi]);

  useEffect(() => {
    if (
      !isAdmin &&
      municipalitiesFromRedux?.length &&
      !struct?.electionUserDataUsingApi
    ) {
      setValue(
        APPLICATION_SEARCH.MUNICIPALITY,
        municipalitiesFromRedux?.[0]?.value,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, municipalitiesFromRedux]);

  const getOption = () => {
    if (isAdmin || struct?.electionUserDataUsingApi) {
      if (struct?.apiService === API_SERVICE.MASTER) {
        return masterMunicipalities;
      } else {
        return coreMunicipalities;
      }
    } else {
      return municipalitiesFromRedux;
    }
  };

  return (
    <div>
      <Select
        title="SEARCH.MUNICIPALITY_CITY_CORPORATION"
        name={APPLICATION_SEARCH.MUNICIPALITY}
        options={getOption() || []}
        suffix={<IconChevronDown size="20" fill="subtitle2" />}
        isSearchable
        clearValue={resetData?.municipality}
        resetData={() =>
          emptyBelowData &&
          emptyBelowData({
            ...struct?.refreshData,
            ...struct?.nonRefreshData,
          })
        }
        clearOptions={resetData?.municipalityOptions}
      />
    </div>
  );
};
