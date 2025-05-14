import { useEffect, useState } from 'react';

import { getRoReportFilters } from '@api/candidate-info-management/report/getRoReportFilters';
import {
  LANGUAGE,
  useLanguage,
} from '@hooks/miscellaneous/custom-hook/useLanguage';
import {
  ElectionSettingsType,
  GetRoReportFiltersType,
} from '@type/candidate-info-management/report/get-ro-report-filters-types';
import { SelectOptionArray } from '@type/selection-option-type';
import useAuthWrapper from '@hooks/miscellaneous/auth/useAuthWrapper';

export interface ReportRoSearchFiltersType {
  electionType: SelectOptionArray[];
  electionSchedule: SelectOptionArray[];
  candidateType: SelectOptionArray[];
  region: SelectOptionArray[];
  zilla: SelectOptionArray[];
  upazilla: SelectOptionArray[];
  unionOrWards: SelectOptionArray[];
  constituency: any[];
  // [name: string]: SelectOptionArray[];
  electionSettings?: ElectionSettingsType[];
}

interface HookReturnType {
  getRoReportFiltersData: (userId: string) => void;
  roReportFilters: ReportRoSearchFiltersType;
  subject?: string;
}

const mappedDataFn = (
  obj: GetRoReportFiltersType,
  language: string | null,
  getSettingsId: boolean,
) => {
  const electionType = obj?.electionTypes?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item?.nameBn : item?.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const electionSchedule = obj?.electionSchedules?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const candidateType = obj?.candidateTypes?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const region = obj?.regions?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const zilla = obj?.zillas?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const unionOrWards = obj?.unionOrWards?.map((item: any) => ({
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
    value: item.id,
  })) as SelectOptionArray[];

  const constituency = obj?.electionSettings?.map((item: any) => ({
    value: getSettingsId ? item.settingsId : item.constituencyId,
    label:
      language === LANGUAGE.BANGLA
        ? item.constituencyNameBn
        : item.constituencyNameEn,
    extra: {
      constituencyId: item?.constituencyId,
      settingsId: item?.settingsId,
    },
  })) as SelectOptionArray[];

  const upazilla = obj?.upazilas?.map((item: any) => ({
    value: item.id,
    label: language === LANGUAGE.BANGLA ? item.nameBn : item.nameEn,
  })) as SelectOptionArray[];

  const electionSettings = obj?.electionSettings;

  return {
    electionType,
    electionSchedule,
    candidateType,
    region,
    zilla,
    upazilla,
    unionOrWards,
    constituency,
    electionSettings,
  };
};

const useRoReportFilters = (
  getSettingsId = false,
  isOnMount = true,
): HookReturnType => {
  const { language } = useLanguage();
  const { keycloak } = useAuthWrapper();
  const subject = keycloak.subject;

  const [roReportFilters, setRoReportFilters] =
    useState<ReportRoSearchFiltersType>({
      electionType: [],
      electionSchedule: [],
      candidateType: [],
      region: [],
      zilla: [],
      upazilla: [],
      constituency: [],
      electionSettings: [],
      unionOrWards: [],
    });

  useEffect(() => {
    if (subject && isOnMount) getRoReportFiltersData(subject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, isOnMount]);

  const getRoReportFiltersData = async (userId: string) => {
    const response = await getRoReportFilters(userId);
    if (response?.data?.status === 200) {
      const resData = response?.data?.data as GetRoReportFiltersType;

      const {
        electionType,
        electionSchedule,
        candidateType,
        region,
        zilla,
        upazilla,
        unionOrWards,
        constituency,
        electionSettings,
      } = mappedDataFn(resData, language, getSettingsId);

      setRoReportFilters({
        electionType,
        electionSchedule,
        candidateType,
        region,
        zilla,
        upazilla,
        unionOrWards,
        constituency,
        electionSettings,
      });
    }
  };

  return { roReportFilters, getRoReportFiltersData, subject };
};

export default useRoReportFilters;
