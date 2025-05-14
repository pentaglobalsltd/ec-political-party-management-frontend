import { useEffect } from 'react';

import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
// src/hooks/election-schedule-management/main-list/region/useRegionListSelect.ts
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';
import { useSubDistricts } from '@hooks/miscellaneous/master-hook/upazilas/useSubDistricts';
import { useRMOListSelect } from '@hooks/miscellaneous/master-hook/rmo/useRMOListSelect';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';
import { useAgencyType } from '@hooks/center-officer-management/controller-list/organization-list/useGetAgencyType';

import { SelectOptionArray } from '@type/selection-option-type';

interface HookReturnType {
  regions: SelectOptionArray[];
  zillas: SelectOptionArray[];
  upazilas: SelectOptionArray[];
  rmos: SelectOptionArray[];
  municipalities: SelectOptionArray[];
  unionsOrWards: SelectOptionArray[];
  agencyType: SelectOptionArray[];
}

interface Props {
  inputs?: {
    region?: boolean;
    district?: boolean;
    subDistrict?: boolean;
    rmo?: boolean;
    municipality?: boolean;
    unionOrWard?: boolean;
    settingSpecificSubDistrict?: boolean;
    settingSpecificMunicipalities?: boolean;
    settingSpecificUnionOrWards?: boolean;
    instituteName?: boolean;
    designation?: boolean;
  };
  divisionWatch?: string | number;
  districtWatch?: string | number;
  settingSpecificSubdistrictWatch?: string | number;
  rmoWatch?: string;
  municipalityWatch?: string | number;
  settingSpecificMunicipalityWatch?: string | number;
  subdistrictWatch?: string | number;
}

export const useOrganizationSelectOption = ({
  inputs,
  divisionWatch,
  districtWatch,
  rmoWatch,
  municipalityWatch,
  subdistrictWatch,
}: Props): HookReturnType => {
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { upazilas, getSubdistrictData } = useSubDistricts();
  const { rmos, getRMOListSelect } = useRMOListSelect();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();
  const { agencyType, getAgencyTypeData } = useAgencyType();

  //get regions
  useEffect(() => {
    if (regions?.length === 0 && inputs?.region) {
      getRegionListSelect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs?.region, regions?.length]);

  //get zillas
  useEffect(() => {
    if (divisionWatch && inputs?.district) {
      getZillasData(divisionWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisionWatch]);

  //get regions
  useEffect(() => {
    if (rmos && rmos?.length === 0 && inputs?.rmo) {
      getRMOListSelect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  //get upazila
  useEffect(() => {
    if (divisionWatch && districtWatch && inputs?.subDistrict) {
      getSubdistrictData({ zillaId: districtWatch, regionId: divisionWatch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisionWatch, districtWatch]);

  //get municipality
  useEffect(() => {
    if (subdistrictWatch && inputs?.municipality) {
      getUpazillasMunicipalitiesList({
        upazilasId: subdistrictWatch,
        rmoEn: rmoWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdistrictWatch, rmoWatch]);

  //get unionwards
  useEffect(() => {
    if (
      divisionWatch &&
      subdistrictWatch &&
      rmoWatch &&
      inputs?.unionOrWard &&
      municipalities &&
      municipalities.length === 0
    ) {
      getUnionsOrWardsData({
        regionId: divisionWatch,
        upazilaId: subdistrictWatch,
        rmoEn: rmoWatch,
      });
    }
    if (
      divisionWatch &&
      subdistrictWatch &&
      municipalityWatch &&
      rmoWatch &&
      inputs?.unionOrWard &&
      municipalities &&
      municipalities.length !== 0
    ) {
      getUnionsOrWardsData({
        regionId: divisionWatch,
        upazilaId: subdistrictWatch,
        municipalityId: municipalityWatch,
        rmoEn: rmoWatch,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    divisionWatch,
    municipalityWatch,
    subdistrictWatch,
    rmoWatch,
    municipalities,
    municipalities.length,
  ]);

  useEffect(() => {
    getAgencyTypeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    agencyType,
  };
};
