import { LANGUAGE } from '@hooks/miscellaneous/custom-hook/useLanguage';
import { SelectOptionArray } from '@type/selection-option-type';
import { UserProfiles } from '@type/user-management/user-profile-types';

interface FormMappedDataProps {
  data: UserProfiles;
  language: string | null;
  userId?: boolean;
  constituencyFromContext?: SelectOptionArray[];
  electionSettingsFromContext?: number;
}

// Returning Officer & Data Entry Operator
export function roAndOpMunicipalityFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    electionSettingsIds,
    password,
    electionTypeId,
    zillaId,
    municipalityIds,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    electionScheduleId,
    password,
    electionTypeId,
    zillaId,
    electionSettingsIds,
    municipalityIds,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}

// Assistant Returning Officer
export function aroMunicipalityFormMappedData({
  data,
  language,
}: FormMappedDataProps) {
  const {
    name,
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
    pollingCenterIds,
    municipalityIds,
  } = data;

  return {
    userTypeCode,
    email,
    loginId,
    password,
    electionTypeId,
    electionScheduleId,
    zillaId,
    upazilaId,
    pollingCenterIds,
    municipalityIds,
    isActive: true,
    ...(language === LANGUAGE.BANGLA ? { nameBn: name } : { nameEn: name }),
  };
}
