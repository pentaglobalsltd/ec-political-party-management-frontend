import { useEffect } from 'react';
import { useRegions } from '@hooks/miscellaneous/master-hook/region/useRegions';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useSubDistrictListSelect } from '@hooks/election-schedule-management/main-list/sub-district/useSubDistrictListSelect';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';
import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWardsSelect';
import { USER_TYPES } from '@constants/user-types';
import { UseFormWatch } from 'react-hook-form';
import { CREATE_POLLING_INSTITUTE } from '@validations/vote-center-management/center-management/polling-institute/createPollingInstituteValidation';
import { RMO } from '@constants/rmo';
import { SelectOptionArray } from '@type/selection-option-type';
import { useGetBuildingTypeList } from '@hooks/election-schedule-management/other/building-type/useGetBuildingTypeList';
import { useGetInstituteTypeList } from '@hooks/election-schedule-management/other/institute-type/useGetInstituteTypeList';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';

interface Props {
  watch: UseFormWatch<any>;
  userType: string | undefined;
}

interface HookReturnType {
  regions: SelectOptionArray[];
  zillas: SelectOptionArray[];
  upazilas: SelectOptionArray[];
  rmos: SelectOptionArray[];
  municipalities: SelectOptionArray[];
  unionsOrWards: SelectOptionArray[];
  upWards: SelectOptionArray[];

  instituteTypesSelect: SelectOptionArray[];
  buildingTypeListSelect: SelectOptionArray[];

  showMunicipality: boolean;
  showUnionParishadWard: boolean;
}

const useFields = ({ watch, userType }: Props): HookReturnType => {
  const { regions } = useRegions();
  const { zillas, getZilla } = useZillas();
  const { upazilas, getSubDistrictListSelect } = useSubDistrictListSelect();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();
  const { unionsOrWards, getUnionsOrWardsData } = useUnionsOrWards();

  const { unionsWards: upWards, getUnionsWardsSelect: getUpWardsSelect } =
    useGetUnionsWardsSelect();

  const { instituteTypesSelect, getInstituteTypeList } =
    useGetInstituteTypeList();
  const { buildingTypeListSelect, getBuildingTypeList } =
    useGetBuildingTypeList();

  const regionChange = watch(CREATE_POLLING_INSTITUTE.DIVISION);
  const districtChange = watch(CREATE_POLLING_INSTITUTE.ZILA);
  const rmoChange = watch(CREATE_POLLING_INSTITUTE.RMO);
  const subDistrictChange = watch(CREATE_POLLING_INSTITUTE.UPAZILA);
  const municipalityChange = watch(
    CREATE_POLLING_INSTITUTE.MUNICIPALITY_CITY_CORPORATION,
  );
  const unionOrWardChange = watch(CREATE_POLLING_INSTITUTE.UNION_WARD);

  const showMunicipality =
    rmoChange === RMO.MUNICIPALITY || rmoChange === RMO.CITY_CORPORATION;

  const showUnionParishadWard = rmoChange === RMO.RURAL;

  // Districts/Zillas
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) {
      if (regionChange) {
        getZilla(Number(regionChange));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, regionChange]);

  // Subdistricts/Upazillas && Municipalities
  useEffect(() => {
    if (userType === USER_TYPES.ADMIN) {
      if (districtChange) {
        getSubDistrictListSelect(Number(districtChange));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtChange]);

  // Municipality if applicable
  useEffect(() => {
    if (subDistrictChange) {
      getUpazillasMunicipalitiesList({ upazilasId: Number(subDistrictChange) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDistrictChange]);

  // Union / Ward
  useEffect(() => {
    if (rmoChange) {
      if (
        rmoChange === RMO.MUNICIPALITY ||
        rmoChange === RMO.CITY_CORPORATION
      ) {
        if (municipalityChange) {
          getUnionsOrWardsData({
            regionId: Number(regionChange),
            upazilaId: Number(subDistrictChange),
            rmoEn: rmoChange,
            municipalityId: Number(municipalityChange),
          });
        }
      } else {
        getUnionsOrWardsData({
          regionId: Number(regionChange),
          upazilaId: Number(subDistrictChange),
          rmoEn: rmoChange,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rmoChange, municipalityChange]);

  useEffect(() => {
    if (unionOrWardChange) {
      getUpWardsSelect({ unionId: Number(unionOrWardChange) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionOrWardChange]);

  // Get institute list options
  useEffect(() => {
    getInstituteTypeList({ page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get building list options
  useEffect(() => {
    getBuildingTypeList({ page: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    regions,
    zillas,
    upazilas,
    rmos,
    municipalities,
    unionsOrWards,
    upWards,

    instituteTypesSelect,
    buildingTypeListSelect,

    showMunicipality,
    showUnionParishadWard,
  };
};

export default useFields;
