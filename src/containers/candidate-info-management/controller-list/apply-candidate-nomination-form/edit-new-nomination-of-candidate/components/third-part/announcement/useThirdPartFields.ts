import { useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { SelectOptionArray } from '@type/selection-option-type';
import { FORM_FIELDS } from '@constants/forms';
import { RMO } from '@constants/rmo';
import { ThirdPartType } from '@type/candidate-info-management/operator-view/candidate-nomination-form/third-part';
import { useRMOs } from '@hooks/miscellaneous/master-hook/rmo/useRMOs';
import { useZillas } from '@hooks/miscellaneous/master-hook/zilla/useZillasRegion';
import { useRegions } from '@hooks/miscellaneous/master-hook/region/useRegions';
import { useUpazilas } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillas';
import { useVoterAreas } from '@hooks/candidate-info-management/controller-list/useVoterAreas';
import { useUnionsOrWards } from '@hooks/miscellaneous/master-hook/union-or-ward/useUnionsOrWards';
import { useUpazillaMunicipalities } from '@hooks/miscellaneous/master-hook/upazilas/useUpazillasMunicipalities';
import { useGetUnionsWardsSelect } from '@hooks/election-schedule-management/main-list/union-ward/useGetUnionsWardsSelect';

export type thirdPartWatchType = UseFormWatch<{
  candidatePersonalInfo: {
    [x: string]: any;
  };
  candidatePoliticalInfo: {
    [x: string]: any;
  };
}>;

const CANDIDATE_PERSONAL_INFO =
  FORM_FIELDS.CANDIDATE_INFO_MANAGEMENT.OPERATOR.NOMINATION_FORM.THIRD_PART
    .CANDIDATE_PERSONAL_INFO;

interface Props {
  watch: thirdPartWatchType;
  candidateNominationFormThirdPart: ThirdPartType;
}

interface HookReturnType {
  regions: SelectOptionArray[];
  zillas: SelectOptionArray[];
  upazilas: SelectOptionArray[];
  rmos: SelectOptionArray[];
  municipalities: SelectOptionArray[];
  unionsOrWards: SelectOptionArray[];
  voterArea: SelectOptionArray[];
  upWards: SelectOptionArray[];

  isRmoValueMunicipalOrCityCorp: boolean;

  disableFields: {
    isZillaDisable: boolean;
    isUpazillaDisable: boolean;
    isCityCorpDisable: boolean;
    isConstituencyAreaDisable: boolean;
    isUnionOrWardDisable: boolean;
    isUPWardDisable: boolean;
  };
}

const useThirdPartFields = ({
  watch,
  candidateNominationFormThirdPart,
}: Props): HookReturnType => {
  const rmoChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.RMO_EN}`,
  );
  const regionChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.REGION_ID}`,
  );
  const zillaChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.ZILLA_ID}`,
  );
  const upazilaChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.UPAZILA_ID}`,
  );
  const muniCityCorpChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.MUNICIPALITY}`,
  );
  const unionOrWardChange = watch(
    `candidatePersonalInfo.${CANDIDATE_PERSONAL_INFO.UNION_OR_WARD_ID}`,
  );

  const isRmoValueMunicipalOrCityCorp =
    rmoChange === RMO.MUNICIPALITY || rmoChange === RMO.CITY_CORPORATION;

  const funcIsUnionWardDisable = () => {
    if (isRmoValueMunicipalOrCityCorp) {
      return muniCityCorpChange ? false : true;
    }
    return upazilaChange && rmoChange ? false : true;
  };

  const disableFields = {
    isZillaDisable: regionChange ? false : true,
    isUpazillaDisable: zillaChange ? false : true,
    isCityCorpDisable: upazilaChange ? false : true,

    isUPWardDisable:
      zillaChange && upazilaChange && unionOrWardChange ? false : true,

    isConstituencyAreaDisable:
      zillaChange && upazilaChange && unionOrWardChange ? false : true,

    isUnionOrWardDisable: funcIsUnionWardDisable(),
  };

  const { regions } = useRegions();
  const { zillas, getZilla } = useZillas();
  const { upazilas, getUpazila } = useUpazilas();
  const { unionsOrWards, getUnionsOrWard } = useUnionsOrWards();
  const { unionsWards: upWards, getUnionsWardsSelect: getUPWardsSelect } =
    useGetUnionsWardsSelect();
  const { voterArea, getVoterArea } = useVoterAreas();
  const { rmos } = useRMOs();
  const { municipalities, getUpazillasMunicipalitiesList } =
    useUpazillaMunicipalities();

  useEffect(() => {
    if (regionChange) {
      getZilla(regionChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionChange]);

  useEffect(() => {
    if (zillaChange) {
      getUpazila({ zillaId: zillaChange });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaChange]);

  useEffect(() => {
    if (upazilaChange && rmoChange) {
      if (isRmoValueMunicipalOrCityCorp) {
        getUpazillasMunicipalitiesList({
          upazilasId: Number(upazilaChange),
          rmoEn: rmoChange,
        });
      } else {
        getUnionsOrWard({
          upazilaId: upazilaChange,
          rmoEn: rmoChange as string,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upazilaChange, rmoChange]);

  useEffect(() => {
    if (upazilaChange && rmoChange) {
      getUnionsOrWard({
        upazilaId: upazilaChange,
        rmoEn: rmoChange as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muniCityCorpChange]);

  // get ইউনিয়ন পরিষদ ওয়ার্ড
  useEffect(() => {
    if (unionOrWardChange) {
      getUPWardsSelect({
        unionId: Number(unionOrWardChange),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unionOrWardChange]);

  useEffect(() => {
    if (zillaChange && upazilaChange && unionOrWardChange) {
      getVoterArea(zillaChange, upazilaChange, unionOrWardChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zillaChange, upazilaChange, unionOrWardChange]);

  useEffect(() => {
    if (candidateNominationFormThirdPart?.candidatePersonalInfo) {
      const { regionId, zillaId, upazilaId, unionOrWardId, rmoEn } =
        candidateNominationFormThirdPart.candidatePersonalInfo;
      if (regionId) {
        getZilla(regionId);
      }
      if (zillaId) {
        getUpazila({ zillaId: zillaChange });
      }
      if (upazilaId && rmoEn) {
        getUnionsOrWard({ upazilaId, rmoEn });
      }

      if (unionOrWardChange) {
        getUPWardsSelect({
          unionId: Number(unionOrWardChange),
        });
      }

      if (zillaId && upazilaId && unionOrWardId) {
        getVoterArea(zillaId, upazilaId, unionOrWardId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    candidateNominationFormThirdPart?.candidatePersonalInfo,
    candidateNominationFormThirdPart?.candidatePersonalInfo?.regionId,
    candidateNominationFormThirdPart?.candidatePersonalInfo?.zillaId,
    candidateNominationFormThirdPart?.candidatePersonalInfo?.upazilaId,
    candidateNominationFormThirdPart?.candidatePersonalInfo?.unionOrWardId,
  ]);

  return {
    regions,
    zillas,
    upazilas,
    unionsOrWards,
    voterArea,
    rmos,
    municipalities,
    upWards,

    isRmoValueMunicipalOrCityCorp,
    disableFields,
  };
};

export default useThirdPartFields;
