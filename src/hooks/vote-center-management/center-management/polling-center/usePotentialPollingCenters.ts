import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  PotentialPollingCenterType,
  PotentialPollingInstituteType,
  PotentialVoterAreasType,
} from '@type/vote-center-management/potential-polling-centers-types';

import { GetPollingPotentialPollingCentersApiNew } from '@api/vote-center-management/center-management/polling-center-list/potential-polling-center';
import { SetContextData } from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center/create-edit/context/NewVoteCenterContext';
import { getPotentialPollingInstitutionApi } from '@api/vote-center-management/center-management/polling-center-list/potential-polling-institute';
import { getPotentialVoterAreaApi } from '@api/vote-center-management/center-management/polling-center-list/potential-voter-area';
import { ElectionSchedules } from '@type/election-schedule/election-schedules-types';

export type typeGetPotentialPollingInstituteCenterAreasData = ({
  electionSettingsId,
  unionOrWardId,
  queryParams,
}: GetPollingPotentialPollingCentersApiNew) => void;

interface HookReturnType {
  loading: boolean;
  getPotentialPollingInstituteCenterAreasData: typeGetPotentialPollingInstituteCenterAreasData;
}

const mapPotentialPollingInstitutes = (
  pollingInstituteData: PotentialPollingInstituteType,
  electionScheduleData: ElectionSchedules,
  lang: string | null,
) => {
  return {
    ...pollingInstituteData,

    instituteName:
      lang === LANGUAGE.BANGLA
        ? pollingInstituteData?.nameBn
        : pollingInstituteData?.nameEn,

    electionScheduleName:
      lang === LANGUAGE.BANGLA
        ? electionScheduleData?.nameBn
        : electionScheduleData?.nameEn,

    zillaName:
      lang === LANGUAGE.BANGLA
        ? pollingInstituteData?.zilla?.nameBn
        : pollingInstituteData?.zilla?.nameEn,

    upazilaName:
      lang === LANGUAGE.BANGLA
        ? pollingInstituteData?.upazila?.nameBn
        : pollingInstituteData?.upazila?.nameEn,

    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? pollingInstituteData?.unionOrWard?.nameBn
        : pollingInstituteData?.unionOrWard?.nameEn,
  };
};

const mapPotentialPollingCenters = (
  data: PotentialPollingCenterType,
  lang: string | null,
) => {
  return {
    ...data,

    address: lang === LANGUAGE.BANGLA ? data?.addressBn : data?.addressEn,
    description:
      lang === LANGUAGE.BANGLA ? data?.descriptionBn : data?.descriptionEn,
  };
};

const mapPotentialPollingVoterAreas = (
  data: PotentialVoterAreasType,
  lang: string | null,
) => {
  return {
    ...data,

    name: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,

    maleVoterSerialStart: data?.maleVoterSerialStart
      ? data?.maleVoterSerialStart
      : 0,

    maleVoterSerialEnd: data?.maleVoterSerialEnd ? data?.maleVoterSerialEnd : 0,

    femaleVoterSerialStart: data?.femaleVoterSerialStart
      ? data?.femaleVoterSerialStart
      : 0,

    femaleVoterSerialEnd: data?.femaleVoterSerialEnd
      ? data?.femaleVoterSerialEnd
      : 0,

    thirdGenderVoterSerialStart: data?.thirdGenderVoterSerialStart
      ? data?.thirdGenderVoterSerialStart
      : 0,

    thirdGenderVoterSerialEnd: data?.thirdGenderVoterSerialEnd
      ? data?.thirdGenderVoterSerialEnd
      : 0,
  };
};

interface Props {
  setContextData: SetContextData;
}

const usePotentialPollingCenters = ({
  setContextData,
}: Props): HookReturnType => {
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);

  const getPotentialPollingInstituteCenterAreasData = async ({
    electionSettingsId,
    unionOrWardId,
    queryParams,
    getVoterAreOnly = false,
  }: GetPollingPotentialPollingCentersApiNew) => {
    try {
      setLoading(true);

      const polingInstituteResponse = await getPotentialPollingInstitutionApi({
        electionSettingsId,
        pollingInstituteId: queryParams.pollingInstituteId as string,
      });

      const voterAreaResponse = await getPotentialVoterAreaApi({
        electionSettingsId,
        unionOrWardId,
      });

      if (
        polingInstituteResponse?.data?.status === 200 &&
        voterAreaResponse?.data?.status === 200
      ) {
        const data = polingInstituteResponse?.data?.data;

        const dataInstitute = mapPotentialPollingInstitutes(
          data?.pollingInstitute as PotentialPollingInstituteType,
          data?.electionSchedule as ElectionSchedules,
          language,
        );

        const dataCenter = mapPotentialPollingCenters(
          data?.pollingInstitute as PotentialPollingCenterType,
          language,
        );

        const dataVoterAreaArray =
          voterAreaResponse?.data?.data?.voterAreas?.map((item) =>
            mapPotentialPollingVoterAreas(item, language),
          );

        // ==============================

        const instituteObj = getVoterAreOnly
          ? {}
          : { potentialPollingInstitute: dataInstitute };

        const centerObj = getVoterAreOnly
          ? {}
          : { potentialPollingCenter: dataCenter };

        setContextData((prev: any) => {
          return {
            ...prev,
            ...instituteObj,
            ...centerObj,

            potentialVoterAreas: dataVoterAreaArray || [],
          };
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    getPotentialPollingInstituteCenterAreasData,
    loading,
  };
};

export default usePotentialPollingCenters;
