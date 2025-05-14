import { useEffect } from 'react';
import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';

import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useMunicipalityListSelect } from '@hooks/election-schedule-management/main-list/reserve-seat-list/useMunicipalityListSelect';
import { useRMOListSelect } from '@hooks/miscellaneous/master-hook/rmo/useRMOListSelect';
import { useInstituteListSelect } from '@hooks/center-officer-management/controller-list/organization-list/useInstituteListSelect';

import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';

import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';

import { RMO_RURAL } from '@components/application-search/constants';
import { useConstituencyListSelect } from '@hooks/miscellaneous/master-hook/constituency/useConstituencyListSelect';

interface UseMainListSearchProps {
  regionWatch?: string | number;
  districtWatch?: string | number;
  subDistrictWatch?: string | number;
  rmoWatch?: string;
  municipalityWatch?: string | number;
  unionOrWardWatch?: string | number;
  inputs?: {
    region?: boolean;
    district?: boolean;
    subDistrict?: boolean;
    rmo?: boolean;
    municipality?: boolean;
    unionOrWard?: boolean;
    instituteName?: boolean;
    constituency?: boolean;
  };
}

export const useMainListSearch = ({
  regionWatch,
  districtWatch,
  subDistrictWatch,
  rmoWatch,
  municipalityWatch,
  unionOrWardWatch,
  inputs,
}: UseMainListSearchProps) => {
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { rmos, getRMOListSelect } = useRMOListSelect();
  const { municipalities, getMunicipalityListSelect } =
    useMunicipalityListSelect();
  const {
    municipalities: upazilaMunicipalities,
    getUpazillasMunicipalitiesList,
  } = useUpazillaMunicipalities();

  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();
  const { institutes, getInstituteListSelect } = useInstituteListSelect();
  const { constituencies, getConstituencyListSelect } =
    useConstituencyListSelect();

  // Regions
  useEffect(() => {
    if (Object.keys(regions).length === 0 && inputs?.region) {
      getRegionListSelect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regions]);

  // Districts/Zillas
  useEffect(() => {
    if (regionWatch && inputs?.district) {
      getZillasData(regionWatch as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionWatch]);

  // Subdistricts/Upazillas
  useEffect(() => {
    if (districtWatch && inputs?.subDistrict) {
      getSubDistrictListSelect(districtWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  // RMO
  useEffect(() => {
    if (districtWatch && inputs?.rmo) {
      getRMOListSelect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  // Municipalities
  useEffect(() => {
    if (
      (districtWatch || rmoWatch) &&
      inputs?.municipality &&
      !inputs?.subDistrict
    ) {
      getMunicipalityListSelect({ districtId: districtWatch, rmoEn: rmoWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch, rmoWatch]);

  // Municipalities From upazila
  useEffect(() => {
    if (subDistrictWatch && inputs?.municipality && inputs?.subDistrict) {
      getUpazillasMunicipalitiesList({ upazilasId: subDistrictWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDistrictWatch]);

  // Union or Wards
  useEffect(() => {
    if ((municipalityWatch || subDistrictWatch) && inputs?.unionOrWard) {
      getUnionsOrWardsData({
        municipalityId: Number(municipalityWatch),
        upazilaId: Number(subDistrictWatch),
        rmoEn:
          !municipalityWatch && !inputs?.rmo && inputs?.municipality
            ? RMO_RURAL
            : rmoWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalityWatch, subDistrictWatch]);

  useEffect(() => {
    if (unionOrWardWatch && inputs?.instituteName) {
      getInstituteListSelect({ unionOrWardId: Number(unionOrWardWatch) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionOrWardWatch]);

  // Constituencies
  useEffect(() => {
    if (districtWatch && inputs?.constituency) {
      getConstituencyListSelect({ zillaId: districtWatch as number });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch]);

  return {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    upazilaMunicipalities,
    unionsOrWards,
    institutes,
    constituencies,
  };
};
