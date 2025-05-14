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

import { SetContextData } from '@containers/vote-center-management/center-management/vote-center-addition/new-vote-center/create-edit/context/NewVoteCenterContext';
import { getPotentialPollingCenterByIdVoterAreaApi } from '@api/vote-center-management/center-management/polling-center-list/get-potential-polling-center-by-id-voter-area';
import {
  GetPotentialPollingCenterByIdApi,
  getPotentialPollingCenterByIdApi,
} from '@api/vote-center-management/center-management/polling-center-list/get-potential-polling-center-by-id';
import { ElectionSchedules } from '@type/election-schedule/election-schedules-types';

interface Props {
  setContextData: SetContextData;
}

export type typeGetPollingCentersByIdData = ({
  electionSettingsId,
  unionOrWardId,
  pollingCenterId,
}: GetPotentialPollingCenterByIdApi) => void;

interface HookReturnType {
  pollingInstitute?: PotentialPollingInstituteType;
  pollingCenter?: PotentialPollingCenterType;
  voterAreas?: PotentialVoterAreasType[];
  loading?: boolean;
  getPollingCentersByIdData: typeGetPollingCentersByIdData;
}

const mapPotentialPollingInstitutes = (
  data: PotentialPollingInstituteType,
  electionScheduleData: ElectionSchedules,
  lang: string | null,
) => {
  return {
    ...data,

    instituteName: lang === LANGUAGE.BANGLA ? data?.nameBn : data?.nameEn,

    electionScheduleName:
      lang === LANGUAGE.BANGLA
        ? electionScheduleData?.nameBn
        : electionScheduleData?.nameEn,

    zillaName:
      lang === LANGUAGE.BANGLA ? data?.zilla?.nameBn : data?.zilla?.nameEn,

    upazilaName:
      lang === LANGUAGE.BANGLA ? data?.upazila?.nameBn : data?.upazila?.nameEn,

    unionOrWardName:
      lang === LANGUAGE.BANGLA
        ? data?.unionOrWard?.nameBn
        : data?.unionOrWard?.nameEn,
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
    isTemporary: data.isTemporary ? 'active' : 'inactive',
    isTabCenter: data.isTabCenter ? 'active' : 'inactive',
    isEvmCenter: data.isEvmCenter ? 'active' : 'inactive',
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

const useGetPollingCenterByIdPollingCenterService = ({
  setContextData,
}: Props): HookReturnType => {
  const { language } = useLanguage();

  const [loading, setLoading] = useState(false);

  const getPollingCentersByIdData = async ({
    electionSettingsId,
    unionOrWardId,
    pollingCenterId,
    queryParams,
    getVoterAreOnly = false,
  }: GetPotentialPollingCenterByIdApi) => {
    try {
      setLoading(true);

      const response = await getPotentialPollingCenterByIdApi({
        electionSettingsId,
        unionOrWardId,
        pollingCenterId,
        queryParams,
      });

      const voterAreaData = await getPotentialPollingCenterByIdVoterAreaApi({
        electionSettingsId,
        pollingCenterId,
        unionOrWardId,
        queryParams,
      });
      if (response?.data?.status === 200) {
        const data = response?.data?.data;

        const dataInstitute = mapPotentialPollingInstitutes(
          data?.pollingInstitute as PotentialPollingInstituteType,
          data?.electionSchedule as ElectionSchedules,
          language,
        );

        const dataCenter = mapPotentialPollingCenters(
          data?.pollingCenter as PotentialPollingCenterType,
          language,
        );

        const dataVoterAreaArray = voterAreaData?.data?.data?.voterAreas?.map(
          (item) => mapPotentialPollingVoterAreas(item, language),
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
    getPollingCentersByIdData,
    loading,
  };
};

export default useGetPollingCenterByIdPollingCenterService;
