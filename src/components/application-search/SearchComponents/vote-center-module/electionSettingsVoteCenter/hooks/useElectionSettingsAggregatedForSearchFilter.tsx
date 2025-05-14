import { useState } from 'react';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { apiGetElectionSettingsAggregated } from '../api/election-settings';
import { CANDIDATE_INFO } from '@constants/candidate-info';

interface GetElectionSettings {
  params: {
    [key: string]: string | number;
  };
  page?: number;
  size?: number;
}

interface HookReturnType {
  getElectionSettingsDataForSearchOptions: ({
    params,
    page,
    size,
  }: GetElectionSettings) => void;
  electionSettingsListForSearchOptions: any[];
}

const useGetElectionSettingsAggregatedForSearchFilter = (): HookReturnType => {
  const { language } = useLanguage();

  const [
    electionSettingsListForSearchOptions,
    setElectionSettingsListForSearchOptions,
  ] = useState<any[]>([]);

  const mapLabel = (data: any) => {
    switch (data?.candidateTypeId) {
      case CANDIDATE_INFO.NATIONAL_MEMBER_OF_PARLIAMENT.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.electionSettingsNameEn}`;

      case CANDIDATE_INFO.CITY_CORPORATION_MAYOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.CITY_CORPORATION_COUNCILLOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.municipalityNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.municipalityNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.CITY_CORPORATION_WOMAN_COUNCILLOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.municipalityNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.municipalityNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.MUNICIPALITY_MAYOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.MUNICIPALITY_COUNCILLOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.municipalityNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.municipalityNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.MUNICIPALITY_RESERVED_COUNCILLOR.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.municipalityNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.municipalityNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.UNION_PARISHAD_CHAIRMAN.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.upazilaNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.upazilaNameEn} -> ${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.UNION_PARISHAD_GENERAL_MEMBER.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.upazilaNameBn} ->${data?.unionOrWardNameBn} ->${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.upazilaNameEn} ->${data?.unionOrWardNameEn} ->${data?.electionSettingsNameEn}`;
      case CANDIDATE_INFO.UNION_PARISHAD_RESERVED_MEMBER.ID:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.upazilaNameBn} ->${data?.unionOrWardNameBn} ->${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.upazilaNameEn} ->${data?.unionOrWardNameEn} ->${data?.electionSettingsNameEn}`;
      default:
        return language === LANGUAGE.BANGLA
          ? `${data?.electionScheduleNameBn} -> ${data?.zillaNameBn} -> ${data?.electionSettingsNameBn}`
          : `${data?.electionScheduleNameEn} -> ${data?.zillaNameEn} -> ${data?.electionSettingsNameEn}`;
    }
  };

  const getElectionSettingsDataForSearchOptions = async ({
    params,
    page = 0,
    size = 10,
  }: GetElectionSettings) => {
    try {
      const response = await apiGetElectionSettingsAggregated({
        params,
        page,
        size,
      });
      if (response?.data?.status === 200) {
        const dataArray =
          response?.data?.data?.electionSettings?.map((item) => {
            const labelText = mapLabel(item);

            return {
              label: labelText,
              value: item?.id,
              extra: {
                constituencyId: item?.constituencyId,
                settingsId: item?.id,
                zillaId: item?.zillaId,
                municipalityId: item?.municipalityId,
                municipalityWardId: item?.municipalityWardId,
                reservedWardId: item?.reservedWardId,
                upazilaId: item?.upazilaId,
                unionOrWardId: item?.unionOrWardId,
              },
            };
          }) || [];

        setElectionSettingsListForSearchOptions(dataArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getElectionSettingsDataForSearchOptions,
    electionSettingsListForSearchOptions,
  };
};

export default useGetElectionSettingsAggregatedForSearchFilter;
