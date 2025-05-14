import { useEffect } from 'react';

import { useRegionListSelect } from '@hooks/election-schedule-management/main-list/region/useRegionListSelect';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasDivison';

import { useSubDistricts } from '@hooks/miscellaneous/master-hook/upazilas/useSubDistricts';
import { useRMOListSelect } from '@hooks/miscellaneous/master-hook/rmo/useRMOListSelect';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';

import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';
import { useInstituteListSelect } from '@hooks/center-officer-management/controller-list/organization-list/useInstituteListSelect';
import useUserTypesList from '@hooks/user-management/useUserTypesList';
import useGetPayScales from './useGetPayScales';

import { SelectOptionArray } from '@type/selection-option-type';

interface HookReturnType {
  regions: SelectOptionArray[];
  zillas: SelectOptionArray[];
  upazilas: SelectOptionArray[];
  rmos: SelectOptionArray[];
  municipalities: SelectOptionArray[];
  unionsOrWards: SelectOptionArray[];
  institutes: SelectOptionArray[];
  userTypes: SelectOptionArray[];
  payScales: SelectOptionArray[];
  allZillas: SelectOptionArray[];
}

interface Props {
  inputs?: {
    region?: boolean;
    district?: boolean;
    subDistrict?: boolean;
    rmo?: boolean;
    municipality?: boolean;
    unionOrWard?: boolean;
    instituteName?: boolean;
    designation?: boolean;
  };
  divisionWatch?: string | number;
  districtWatch?: string | number;
  rmoWatch?: string;
  municipalityWatch?: string | number;
  subdistrictWatch?: string | number;
  unionOrWardWatch?: string | number;
  userTypeCodes?: string;
  isActiveInstitute?: boolean;
}

export const useOfficerSelectOptionsHook = ({
  inputs,
  divisionWatch,
  districtWatch,
  rmoWatch,
  municipalityWatch,
  subdistrictWatch,
  unionOrWardWatch,
  userTypeCodes,
  isActiveInstitute,
}: Props): HookReturnType => {
  const { regions, getRegionListSelect } = useRegionListSelect();
  const { zillas, getZillasData } = useZillas({ notCallOnMount: true });
  const { zillas: allZillas, getZillasData: getAllZillas } = useZillas({
    notCallOnMount: true,
  });
  const { upazilas, getSubdistrictData } = useSubDistricts();
  const { rmos, getRMOListSelect } = useRMOListSelect();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();
  const { institutes, getInstituteListSelect } = useInstituteListSelect();
  const { userTypes, getUserTypesData } = useUserTypesList();
  const { payScales, getPayScales } = useGetPayScales();

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

  // নিজ জেলা
  useEffect(() => {
    getAllZillas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (
      districtWatch &&
      subdistrictWatch &&
      unionOrWardWatch &&
      inputs?.instituteName
    ) {
      getInstituteListSelect({
        zillaId: districtWatch,
        upazilaId: subdistrictWatch,
        unionOrWardId: unionOrWardWatch,
        isActive: isActiveInstitute,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtWatch, subdistrictWatch, unionOrWardWatch, isActiveInstitute]);

  useEffect(() => {
    if (userTypes && userTypes?.length === 0 && inputs?.designation) {
      getUserTypesData({
        userTypeCodes,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypes, userTypeCodes]);

  useEffect(() => {
    getPayScales();
    // eslint-disable-next-line
  }, []);

  return {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    institutes,
    userTypes,
    payScales,
    allZillas,
  };
};
