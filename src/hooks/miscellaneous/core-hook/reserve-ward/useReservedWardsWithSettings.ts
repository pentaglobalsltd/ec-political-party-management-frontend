import { useState } from 'react';

import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import { getReservedWardsWithSettings } from '@api/miscellaneous/core-api/reserve-ward/reserved-wards-with-settings';
import {
  ReservedWardsSelectOptionsType,
  ReservedWardsWithSettingsType,
  SettingsSelectOptionsType,
  SettingsType,
} from '@type/reserved-wards-with-settings-type';

interface Props {
  electionScheduleId: string | number;
  electionSchedulesZillaId: string | number;
  municipalityId: string | number;
}

const useReservedWardsWithSettings = () => {
  const { language } = useLanguage();
  const [reservedWards, setReservedWards] = useState<
    ReservedWardsSelectOptionsType[]
  >([]);
  const [electionSettingsList, setElectionSettingsList] = useState<
    SettingsSelectOptionsType[]
  >([]);
  const [electionSettingsForMunicipality, setElectionSettingsForMunicipality] =
    useState<any>();
  const [
    hasElectionSettingsForMunicipality,
    setHasElectionSettingsForMunicipality,
  ] = useState<boolean>();

  const getReservedWardsWithSettingsData = async ({
    electionScheduleId,
    electionSchedulesZillaId,
    municipalityId,
  }: Props) => {
    try {
      const response = await getReservedWardsWithSettings(
        electionScheduleId,
        electionSchedulesZillaId,
        municipalityId,
      );
      if (response?.data?.status === 200) {
        const reservedWardsArray = (response?.data?.data?.reservedWards?.map(
          (item: ReservedWardsWithSettingsType) => ({
            label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
            value: item.id,
          }),
        ) || []) as ReservedWardsSelectOptionsType[];
        const settingsIdsArray =
          (response?.data?.data?.electionSettingsList?.map(
            (item: SettingsType) => ({
              ...item,
              label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
              value: item.id,
            }),
          ) || []) as SettingsSelectOptionsType[];
        const electionSettingsForMunicipalityObject = {
          label:
            language === LANGUAGE.BANGLA
              ? response?.data?.data?.electionSettingsForMunicipality?.nameBn
              : response?.data?.data?.electionSettingsForMunicipality?.nameEn,
          value: response?.data?.data?.electionSettingsForMunicipality?.id,
        };
        const hasElectionSettingsForMunicipality =
          response?.data?.data?.hasElectionSettingsForMunicipality;

        setReservedWards(reservedWardsArray);
        setElectionSettingsList(settingsIdsArray);
        setElectionSettingsForMunicipality(
          electionSettingsForMunicipalityObject,
        );
        setHasElectionSettingsForMunicipality(
          hasElectionSettingsForMunicipality,
        );
      } else {
        setReservedWards([]);
      }
    } catch (error) {
      console.log(error);
      setReservedWards([]);
    }
  };

  const resetReservedWards = () => setReservedWards([]);

  return {
    electionSettingsList,
    reservedWards,
    electionSettingsForMunicipality,
    hasElectionSettingsForMunicipality,
    resetReservedWards,
    getReservedWardsWithSettingsData,
  };
};

export default useReservedWardsWithSettings;
