import { useState } from 'react';
import { getRegionConstituencies } from '@api/miscellaneous/core-api/election-wise-location/election-wise-locations-by-elec-type-candidate';
// import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
// import {
//   LocationWiseConstituenciesListType,
//   LocationWiseConstituenciesRegionsType,
//   LocationWiseConstituenciesZillasType,
// } from '@type/election-declaration-management/election/election-settings';

// function mapDistricts(
//   data: LocationWiseConstituenciesZillasType,
//   lang: string | null,
// ) {
//   return {
//     ...data,
//     zillaName: lang === LANGUAGE.BANGLA ? data.nameBn : data.nameEn,
//     constituencyList: data?.constituencyList?.map(
//       (item: LocationWiseConstituenciesListType) => ({
//         constituencyName: lang === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
//         constituencyId: item.constituencyId,
//         settingsId: item.settingsId,
//       }),
//     ),
//   };
// }

const replaceListKeys = (obj: any) => {
  if (obj instanceof Array) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = replaceListKeys(obj[i]);
    }
  } else if (obj instanceof Object) {
    for (const key in obj) {
      if (key.endsWith('List') && obj[key] && obj[key].length) {
        obj['children'] = replaceListKeys(obj[key]);
        delete obj[key];
      } else {
        obj[key] = replaceListKeys(obj[key]);
      }
    }
  }
  return obj;
};

export const useRegionConstituencies = () => {
  const [regionConstituencies, setRegionConstituencies] = useState([]);
  const [totalSettings, setTotalSettings] = useState<number>(0);
  const [selectedSettings, setSelectedSettings] = useState<number>(0);
  const getRegionConstituenciesData = async ({
    regionId,
    electionTypeId,
    candidateTypeId,
    electionScheduleId,
  }: {
    regionId?: number;
    electionTypeId: number | string;
    candidateTypeId: number | string;
    electionScheduleId: number | string;
  }) => {
    try {
      const response = await getRegionConstituencies({
        electionTypeId,
        candidateTypeId,
        regionId,
        electionScheduleId,
      });
      if (response?.data?.status === 200) {
        const dataArray = response?.data?.data?.electionWiseLocations;

        setSelectedSettings(response?.data?.data.totalSelected);
        setTotalSettings(response?.data?.data.total);
        setRegionConstituencies(replaceListKeys(dataArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    regionConstituencies,
    getRegionConstituenciesData,
    totalSettings,
    selectedSettings,
  };
};
